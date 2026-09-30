import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';

const env = {};
if (existsSync('.env')) {
  for (const line of readFileSync('.env', 'utf8').split('\n')) {
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (m) env[m[1]] = m[2].replace(/^"|"$/g, '');
  }
}
const version = 'v1';
const title = env.SITE_TITLE || 'no title';
mkdirSync('dist/assets', { recursive: true });
writeFileSync('dist/index.html', `<!doctype html><title>${title}</title><h1>static ${version}</h1><p id="title">${title}</p>\n`);
writeFileSync('dist/about.html', `<!doctype html><h1>about ${version}</h1>\n`);
writeFileSync('dist/404.html', `<!doctype html><h1>custom 404</h1>\n`);
writeFileSync('dist/assets/app.js', `console.log('${version}');\n`);
console.log(`built ${version} with title "${title}"`);
