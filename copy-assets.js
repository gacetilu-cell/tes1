// Menyalin Tesseract (pembaca angka) ke www/ agar aplikasi jalan OFFLINE.
const fs = require('fs'), path = require('path');
const nm = path.join(__dirname, '..', 'node_modules');
const out = path.join(__dirname, '..', 'www', 'tesseract');
fs.mkdirSync(path.join(out, 'core'), { recursive: true });
fs.mkdirSync(path.join(out, 'lang'), { recursive: true });
fs.copyFileSync(path.join(nm, 'tesseract.js/dist/tesseract.min.js'), path.join(out, 'tesseract.min.js'));
fs.copyFileSync(path.join(nm, 'tesseract.js/dist/worker.min.js'), path.join(out, 'worker.min.js'));
const core = path.join(nm, 'tesseract.js-core');
fs.readdirSync(core).filter(f => /\.(js|wasm)$/.test(f) && f.startsWith('tesseract-core'))
  .forEach(f => fs.copyFileSync(path.join(core, f), path.join(out, 'core', f)));
const langRoot = path.join(nm, '@tesseract.js-data/eng');
let gz = null;
(function find(d) {
  fs.readdirSync(d, { withFileTypes: true }).forEach(e => {
    const p = path.join(d, e.name);
    if (e.isDirectory()) find(p);
    else if (e.name === 'eng.traineddata.gz' && p.includes('4.0.0_best_int')) gz = p;
  });
})(langRoot);
if (!gz) { console.error('eng.traineddata.gz tidak ditemukan'); process.exit(1); }
fs.copyFileSync(gz, path.join(out, 'lang', 'eng.traineddata.gz'));
console.log('Aset Tesseract tersalin ke www/tesseract');
