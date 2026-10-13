# Krynex Labs — Company Marketing Website

> **"SOFTWARE BUILT FOR BUSINESS."**
> Krynex Labs develops practical software products that help businesses simplify operations, improve workflows, and move forward with technology.

This repository is **only** the Krynex Labs company marketing website. It intentionally contains no product catalog, pricing tables, checkout, customer login, or dashboards.

- **Canonical site:** https://www.krynexlabs.in
- **Apex domain:** https://krynexlabs.in → permanently redirects to the `www` site (configured in Vercel, not in code)
- **Hosting:** Vercel · **Framework:** Next.js 16 (App Router) · **Language:** TypeScript

---

## Routes

| Route | Purpose |
| :--- | :--- |
| `/` | Homepage: 3D hero, introduction, focus areas, approach, philosophy, call to action |
| `/about` | Company profile, focus, approach, principles |
| `/what-we-do` | Company capabilities |
| `/contact` | Inquiry form (`POST /api/contact`) |
| `/privacy`, `/terms` | Legal pages |
| `/sitemap.xml`, `/robots.txt` | Generated; always use the canonical `www` host |

## Tech stack

Next.js 16 · React 19 · TypeScript 5 · CSS Modules (design tokens in `src/app/globals.css`) · Three.js / React Three Fiber / Drei (3D hero, with reduced-motion fallback) · React Hook Form + Zod (validation) · Lucide icons.

---

## Local development

Requires Node.js 20+ and npm.

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # ESLint
npm run build    # production build
npm run start    # serve the production build
```

## Canonical URL

The canonical origin is set **once** in `src/data/site-data.ts` (`siteConfig.url = https://www.krynexlabs.in`). It drives `metadataBase`, per-page canonical tags, `sitemap.xml`, `robots.txt` and structured data. No site-URL environment variable is used, so a misconfigured env var cannot split the site across two hostnames.

---

## Contact form — email delivery (required for production)

The form validates on the client and again on the server (`src/app/api/contact/route.ts`), with a honeypot field, per-IP rate limiting (best-effort on serverless), input sanitising, and header-injection protection.

Email is sent through [Resend](https://resend.com). Set these **server-side** variables (Vercel → Project → Settings → Environment Variables; never commit them):

| Variable | Description |
| :--- | :--- |
| `RESEND_API_KEY` | Resend API key |
| `CONTACT_EMAIL_RECIPIENT` | Mailbox that receives inquiries (one you own and monitor) |
| `CONTACT_FROM_EMAIL` | Sender address on a domain **verified in Resend** |

Behaviour:
- **Production, variables missing:** the API returns `503` and the form shows an error. It never reports success when nothing can be delivered.
- **Provider rejects or is unreachable:** the API returns `502`; the visitor sees an error.
- **Local development, variables missing:** the inquiry is only logged to the terminal (no email is sent).

See `.env.example` for a template.

---

## Deployment (Vercel) and custom domain

### 1. Push to GitHub
The remote repository is `https://github.com/krynexlabs/krynex-labs-website` (default branch `main`).
```bash
git remote add origin https://github.com/krynexlabs/krynex-labs-website.git
git branch -M main
git push -u origin main     # normal push; do not force-push
```

### 2. Import into Vercel
1. Vercel → **Add New… → Project** → import `krynexlabs/krynex-labs-website`.
2. Framework preset: **Next.js** (auto-detected). Root directory: repository root. Production branch: `main`.
3. Add the three contact environment variables above for the **Production** environment (and Preview if you want to test the form there).
4. Deploy. Verify the generated `*.vercel.app` preview first.

### 3. Domains (Project → Settings → Domains)
1. Add **`www.krynexlabs.in`** and set it as the **primary** domain.
2. Add **`krynexlabs.in`** and set it to **redirect to `www.krynexlabs.in`** using a **308 (permanent)** redirect. Vercel preserves path and query string.

### 4. DNS (at the registrar / DNS host)
Use the **exact values Vercel displays for this project** on the Domains page. Do not copy example values from documentation, since Vercel may assign project-specific targets. Typically:

| Host | Type | Value |
| :--- | :--- | :--- |
| `www` | `CNAME` | value shown by Vercel |
| `@` (apex) | `A` | value shown by Vercel |

Notes:
- Do **not** delete existing `MX`, `TXT` (SPF/DKIM/verification) or other records. They may be needed for email and other services.
- Only replace an existing `A`/`AAAA`/`CNAME` record for the same host after confirming what it is used for.
- HTTPS certificates are issued automatically by Vercel after DNS resolves.

### 5. Verify (do not assume)
```bash
curl -I http://krynexlabs.in        # expect redirect to https
curl -I https://krynexlabs.in       # expect 308 → https://www.krynexlabs.in/
curl -I https://www.krynexlabs.in   # expect 200
```
Also confirm the canonical tag, `/sitemap.xml` and `/robots.txt` use `https://www.krynexlabs.in`, and submit a real test message through `/contact`.
