// Menambah izin kamera ke AndroidManifest.xml
const fs = require('fs'), path = require('path');
const f = path.join(__dirname, '..', 'android/app/src/main/AndroidManifest.xml');
let x = fs.readFileSync(f, 'utf8');
if (!x.includes('android.permission.CAMERA')) {
  x = x.replace('</manifest>',
    '    <uses-permission android:name="android.permission.CAMERA" />\n' +
    '    <uses-feature android:name="android.hardware.camera" android:required="false" />\n</manifest>');
  fs.writeFileSync(f, x);
  console.log('Izin kamera ditambahkan');
}
