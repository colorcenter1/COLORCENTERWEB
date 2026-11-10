/**
 * Prerender de la landing: inserta en dist/index.html el HTML generado por React,
 * para que el contenido principal esté disponible sin ejecutar JavaScript.
 * Se ejecuta después de `vite build` y `vite build --ssr` (ver package.json).
 */
import { readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = path.join(root, 'dist', 'index.html');
const ssrDir = path.join(root, 'dist-ssr');
const PLACEHOLDER = '<!--app-html-->';

const template = await readFile(htmlPath, 'utf8');
if (!template.includes(PLACEHOLDER)) {
  throw new Error('dist/index.html no contiene el marcador <!--app-html-->');
}

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
const appHtml = render();
if (!appHtml.includes('<h1')) {
  throw new Error('El HTML prerenderizado no contiene el encabezado principal');
}

await writeFile(htmlPath, template.replace(PLACEHOLDER, appHtml), 'utf8');
await rm(ssrDir, { recursive: true, force: true });
process.stdout.write(`Prerender completado: ${(appHtml.length / 1024).toFixed(1)} KB de HTML\n`);
