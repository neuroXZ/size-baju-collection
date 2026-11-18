// ====== TETAPAN ======
const SHEET_ID = '1VCAeK3wfVn0-fEH68y7EtYSxVw4Tu0ZxcaJ7244tzrQ'; // Google Sheet "Data Size Baju Family Day 2026"
const IMAGE_ID = '1mPE4y_MtlVQ5YhW185gbP8CoDy2ru3W1';            // "gambar baju.png" dalam Drive (mesti share: Anyone with the link)

const SIZE_IKUT_JENIS = {
  'Lengan Pendek - Lelaki': ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'],
  'Muslimah - Wanita':      ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL', '6XL', '7XL'],
  'Kanak-kanak':            ['100', '110', '120', '130', '140', '150', '160']
};

// Papar landing page
function doGet() {
  const t = HtmlService.createTemplateFromFile('Index');
  // Gambar terus dari Google Drive (saiz dikecilkan oleh Drive supaya page laju)
  t.gambar  = 'https://drive.google.com/thumbnail?id=' + IMAGE_ID + '&sz=w1200';
  t.gambar2 = 'https://lh3.googleusercontent.com/d/' + IMAGE_ID + '=w1200'; // sandaran
  return t.evaluate()
    .setTitle('Size Baju Family Day 2026')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// Untuk landing page luar (contoh Vercel): terima POST JSON
function doPost(e) {
  let hasil;
  try {
    const senarai = JSON.parse(e.postData.contents);
    hasil = { ok: true, jumlah: hantarBorang(senarai) };
  } catch (err) {
    hasil = { ok: false, ralat: err.message };
  }
  return ContentService.createTextOutput(JSON.stringify(hasil)).setMimeType(ContentService.MimeType.JSON);
}

// Dipanggil dari form -> simpan semua nama ke Google Sheet sekali gus
function hantarBorang(senarai) {
  if (!Array.isArray(senarai) || senarai.length === 0) throw new Error('Sila isi sekurang-kurangnya satu nama.');
  if (senarai.length > 100) throw new Error('Maksimum 100 nama sekali hantar.');

  const masa = new Date();
  const baris = senarai.map(function (d, i) {
    const nama  = String(d.nama || '').trim();
    const jenis = String(d.jenis || '').trim();
    const size  = String(d.size || '').trim();
    const no = 'Baris ' + (i + 1) + ': ';
    if (!nama) throw new Error(no + 'sila isi nama.');
    if (!SIZE_IKUT_JENIS[jenis]) throw new Error(no + 'sila pilih jenis baju.');
    if (SIZE_IKUT_JENIS[jenis].indexOf(size) === -1) throw new Error(no + 'sila pilih size.');
    return [masa, nama, jenis, size];
  });

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Tarikh & Masa', 'Nama', 'Jenis Baju', 'Size Baju']);
    }
    sheet.getRange(sheet.getLastRow() + 1, 1, baris.length, 4).setValues(baris);
  } finally {
    lock.releaseLock();
  }
  return baris.length;
}
