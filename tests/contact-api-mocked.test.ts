import assert from "node:assert";
import { POST } from "../src/app/api/contact/route";

console.log("=== RUNNING CONTACT API MOCKED PROVIDER REGRESSION TEST SUITE ===");

const validPayload = {
  executiveName: "Rohan Dixit",
  corporateEmail: "rohan@enterprise-client.com",
  companySector: "Precision Aerospace Automation",
  operationalFriction: "Legacy telematics line latency exceeds 25ms, causing queue bottlenecks in assembly.",
  inquiryCategory: "Industrial Telematics",
  requestWalkthrough: true,
};

let originalFetch: typeof global.fetch;
let originalEnv: NodeJS.ProcessEnv;

function setup() {
  originalFetch = global.fetch;
  originalEnv = { ...process.env };
  // Ensure default clean test environment
  delete process.env.GMAIL_USER;
  delete process.env.GMAIL_APP_PASSWORD;
  delete process.env.SMTP_USER;
  delete process.env.SMTP_PASS;
  delete process.env.CONTACT_WEBHOOK_URL;
}

function teardown() {
  global.fetch = originalFetch;
  process.env = originalEnv;
}

async function runTests() {
  setup();

  try {
    // -------------------------------------------------------------
    // TEST 1: Invalid JSON Transmission Payload
    // -------------------------------------------------------------
    console.log("\n[MOCK TEST 1] Malformed JSON Transmission Payload");
    const badJsonReq = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "198.51.100.1",
      },
      body: "INVALID_MALFORMED_JSON{{{",
    });
    const res1 = await POST(badJsonReq);
    assert.strictEqual(res1.status, 400, "Must return HTTP 400 on malformed JSON");
    const json1 = await res1.json();
    assert.strictEqual(json1.ok, false);
    assert.strictEqual(json1.error, "Invalid JSON transmission payload.");
    console.log("✔ PASS: Malformed JSON rejected with HTTP 400.");

    // -------------------------------------------------------------
    // TEST 2: Missing Required Input Fields
    // -------------------------------------------------------------
    console.log("\n[MOCK TEST 2] Missing and Invalid Input Fields (Validation)");
    const invalidInputs = [
      { payload: { ...validPayload, executiveName: "A" }, field: "executiveName", ip: "198.51.100.2" },
      { payload: { ...validPayload, corporateEmail: "not-an-email" }, field: "corporateEmail", ip: "198.51.100.3" },
      { payload: { ...validPayload, companySector: "X" }, field: "companySector", ip: "198.51.100.4" },
      { payload: { ...validPayload, operationalFriction: "too short" }, field: "operationalFriction", ip: "198.51.100.5" },
    ];

    for (const testCase of invalidInputs) {
      const req = new Request("http://localhost/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-forwarded-for": testCase.ip,
        },
        body: JSON.stringify(testCase.payload),
      });
      const res = await POST(req);
      assert.strictEqual(res.status, 400, `Must return HTTP 400 for invalid ${testCase.field}`);
      const json = await res.json();
      assert.strictEqual(json.ok, false);
      assert.ok(json.errors[testCase.field], `Must highlight error for ${testCase.field}`);
    }
    console.log("✔ PASS: Strict field validation rejects missing/invalid input with HTTP 400.");

    // -------------------------------------------------------------
    // TEST 3: Bot Honeypot Submission
    // -------------------------------------------------------------
    console.log("\n[MOCK TEST 3] Honeypot Bot Submission Handling");
    let fetchCalled = false;
    global.fetch = async () => {
      fetchCalled = true;
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    };

    const honeypotReq = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "198.51.100.6",
      },
      body: JSON.stringify({
        ...validPayload,
        websiteHoneypot: "malicious_bot_token",
      }),
    });
    const resHoneypot = await POST(honeypotReq);
    assert.strictEqual(resHoneypot.status, 200, "Honeypot must return silent 200 OK");
    const jsonHoneypot = await resHoneypot.json();
    assert.ok(jsonHoneypot.referenceId.endsWith("-BOT"), "Reference ID must mark BOT submission");
    assert.strictEqual(fetchCalled, false, "Provider transport must NOT be invoked on bot submission!");
    console.log("✔ PASS: Honeypot trapped silently without dispatching to email provider.");

    // -------------------------------------------------------------
    // TEST 4: Successful Upstream Provider Response (Confirmed Delivery)
    // -------------------------------------------------------------
    console.log("\n[MOCK TEST 4] Successful Provider Response (Confirmed Delivery)");
    process.env.RESEND_API_KEY = "re_mock_test_key_12345";

    global.fetch = async (url: any, init: any) => {
      const urlStr = String(url);
      if (urlStr.includes("api.resend.com")) {
        return new Response(JSON.stringify({ id: "resend_msg_test_99" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      return new Response(null, { status: 404 });
    };

    const successReq = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "198.51.100.11",
      },
      body: JSON.stringify(validPayload),
    });
    const resSuccess = await POST(successReq);
    assert.strictEqual(resSuccess.status, 200, "Must return HTTP 200 on confirmed provider delivery");
    const jsonSuccess = await resSuccess.json();
    assert.strictEqual(jsonSuccess.ok, true);
    assert.strictEqual(jsonSuccess.success, true);
    assert.ok(jsonSuccess.referenceId.startsWith("KL-REQ-"));
    console.log("✔ PASS: Confirmed provider acceptance returns HTTP 200 with tracking Reference ID.");

    // -------------------------------------------------------------
    // TEST 5: Provider Rejection (HTTP 4xx - e.g. 403 Forbidden / Invalid API Key)
    // -------------------------------------------------------------
    console.log("\n[MOCK TEST 5] Provider Rejection (HTTP 403 Unauthorized)");
    process.env.RESEND_API_KEY = "re_mock_invalid_key";

    global.fetch = async (url: any) => {
      return new Response(
        JSON.stringify({ statusCode: 403, message: "API key restricted or revoked", name: "forbidden" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    };

    const rejectReq = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "198.51.100.12",
      },
      body: JSON.stringify(validPayload),
    });
    const resReject = await POST(rejectReq);
    assert.strictEqual(resReject.status, 503, "Must return HTTP 503 Service Unavailable on provider rejection");
    const jsonReject = await resReject.json();
    assert.strictEqual(jsonReject.ok, false);
    assert.strictEqual(jsonReject.success, false);
    assert.ok(jsonReject.fallbackMailto.includes("mailto:support@krynexlabs.in"));
    assert.ok(jsonReject.fallbackMailto.includes(jsonReject.referenceId));
    // Verify internal provider secrets are NOT exposed to visitor
    assert.strictEqual(JSON.stringify(jsonReject).includes("API key restricted"), false);
    console.log("✔ PASS: Provider 403 rejection returns HTTP 503 and safe prefilled mailto fallback without secret leakage.");

    // -------------------------------------------------------------
    // TEST 6: Provider Server Failure (HTTP 500 / 502)
    // -------------------------------------------------------------
    console.log("\n[MOCK TEST 6] Provider Internal Failure (HTTP 502 Bad Gateway)");
    global.fetch = async () => {
      return new Response("<html>502 Bad Gateway</html>", {
        status: 502,
        headers: { "Content-Type": "text/html" },
      });
    };

    const resend500Req = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "198.51.100.13",
      },
      body: JSON.stringify(validPayload),
    });
    const res500 = await POST(resend500Req);
    assert.strictEqual(res500.status, 503, "Must return HTTP 503 when provider returns 5xx");
    const json500 = await res500.json();
    assert.strictEqual(json500.ok, false);
    assert.ok(json500.fallbackMailto.startsWith("mailto:support@krynexlabs.in"));
    console.log("✔ PASS: Provider 502 upstream error returns HTTP 503 with fallback mailto.");

    // -------------------------------------------------------------
    // TEST 7: Network Error During Provider Dispatch
    // -------------------------------------------------------------
    console.log("\n[MOCK TEST 7] Network Error During Provider Dispatch");
    global.fetch = async () => {
      throw new TypeError("fetch failed: ECONNRESET");
    };

    const netErrReq = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "198.51.100.14",
      },
      body: JSON.stringify(validPayload),
    });
    const resNetErr = await POST(netErrReq);
    assert.strictEqual(resNetErr.status, 503, "Must return HTTP 503 on network transmission drop");
    const jsonNetErr = await resNetErr.json();
    assert.strictEqual(jsonNetErr.ok, false);
    assert.ok(jsonNetErr.fallbackMailto);
    console.log("✔ PASS: Network socket failure returns HTTP 503 with direct fallback.");

    // -------------------------------------------------------------
    // TEST 8: Timeout During Provider Dispatch
    // -------------------------------------------------------------
    console.log("\n[MOCK TEST 8] Upstream Provider Timeout");
    global.fetch = async () => {
      throw new DOMException("The operation was aborted due to timeout", "TimeoutError");
    };

    const timeoutReq = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "198.51.100.15",
      },
      body: JSON.stringify(validPayload),
    });
    const resTimeout = await POST(timeoutReq);
    assert.strictEqual(resTimeout.status, 503, "Must return HTTP 503 on provider timeout");
    const jsonTimeout = await resTimeout.json();
    assert.strictEqual(jsonTimeout.ok, false);
    assert.ok(jsonTimeout.fallbackMailto);
    console.log("✔ PASS: Upstream timeout returns HTTP 503 without hanging the application.");

    // -------------------------------------------------------------
    // TEST 9: Provider Unconfigured in Environment
    // -------------------------------------------------------------
    console.log("\n[MOCK TEST 9] Provider Unconfigured (Environment Missing Secrets)");
    delete process.env.RESEND_API_KEY;

    const unconfiguredReq = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "198.51.100.16",
      },
      body: JSON.stringify(validPayload),
    });
    const resUnconfig = await POST(unconfiguredReq);
    assert.strictEqual(resUnconfig.status, 503, "Must return HTTP 503 when transport is unconfigured");
    const jsonUnconfig = await resUnconfig.json();
    assert.strictEqual(jsonUnconfig.ok, false);
    assert.ok(jsonUnconfig.fallbackMailto);
    console.log("✔ PASS: Unconfigured transport safely returns HTTP 503 with prefilled mailto docket.");

    // -------------------------------------------------------------
    // TEST 10: Rate Limiting & Duplicate Submissions Defense
    // -------------------------------------------------------------
    console.log("\n[MOCK TEST 10] Rapid Duplicate Submissions Defense (Rate Limiter)");
    const duplicateIp = "198.51.100.77";

    // Re-enable mock provider success
    process.env.RESEND_API_KEY = "re_mock_test_key";
    global.fetch = async () => new Response(JSON.stringify({ id: "ok" }), { status: 200 });

    for (let i = 1; i <= 5; i++) {
      const req = new Request("http://localhost/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-forwarded-for": duplicateIp,
        },
        body: JSON.stringify(validPayload),
      });
      const res = await POST(req);
      assert.strictEqual(res.status, 200, `Request ${i} should succeed`);
    }

    // 6th duplicate request within sliding window
    const blockedReq = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": duplicateIp,
      },
      body: JSON.stringify(validPayload),
    });
    const blockedRes = await POST(blockedReq);
    assert.strictEqual(blockedRes.status, 429, "6th request within window must receive HTTP 429 Too Many Requests");
    assert.ok(blockedRes.headers.get("Retry-After"), "Must include Retry-After header");
    const blockedJson = await blockedRes.json();
    assert.strictEqual(blockedJson.ok, false);
    assert.ok(blockedJson.error.includes("Rate limit exceeded"));
    console.log("✔ PASS: 5 requests accepted; 6th duplicate request rate-limited with HTTP 429 and Retry-After.");

    console.log("\n=======================================================");
    console.log("ALL 10 MOCKED CONTACT API TESTS PASSED SUCCESSFULLY!");
    console.log("=======================================================\n");
  } finally {
    teardown();
  }
}

runTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
