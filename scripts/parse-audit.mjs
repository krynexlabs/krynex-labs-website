import { execSync } from 'child_process';
import fs from 'fs';

let stdout = '';
try {
  stdout = execSync('npm audit --json', { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
} catch (err) {
  // npm audit exits with code 1 when vulnerabilities are found
  stdout = err.stdout;
}

const audit = JSON.parse(stdout);
fs.writeFileSync('C:/Users/dixit/.gemini/antigravity/brain/b32feb97-f77a-408a-a21f-051b9b3806bf/complete-audit/npm-audit.json', JSON.stringify(audit, null, 2), 'utf8');

console.log('=== VULNERABILITY SUMMARY ===');
console.log(JSON.stringify(audit.metadata.vulnerabilities, null, 2));

console.log('\n=== VULNERABLE PACKAGES BREAKDOWN ===');
for (const [pkgName, vuln] of Object.entries(audit.vulnerabilities || {})) {
  console.log(`Package: ${pkgName}`);
  console.log(`  Severity: ${vuln.severity}`);
  console.log(`  isDirect: ${vuln.isDirect}`);
  console.log(`  Effects: ${JSON.stringify(vuln.effects)}`);
  console.log(`  Range: ${vuln.range}`);
  console.log(`  Fix available: ${JSON.stringify(vuln.fixAvailable)}`);
  const viaList = vuln.via.map(v => typeof v === 'string' ? v : `${v.title || v.name} (${v.url || ''})`);
  console.log(`  Via: ${JSON.stringify(viaList)}`);
  console.log('----------------------------------------------------');
}
