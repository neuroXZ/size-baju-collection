Landing page Size Baju Family Day 2026
Google Sheet: https://docs.google.com/spreadsheets/d/1VCAeK3wfVn0-fEH68y7EtYSxVw4Tu0ZxcaJ7244tzrQ/edit (kolum: Tarikh & Masa, Nama, Jenis Baju, Size Baju)
Gambar baju: diambil terus dari Google Drive fail "gambar baju.png" (ID 1mPE4y_MtlVQ5YhW185gbP8CoDy2ru3W1, share "Anyone with the link"). Page guna URL thumbnail Drive (sz=w1200), sandaran lh3.googleusercontent.com. Fail mesti kekal dikongsi "Anyone with the link".
Backend = Google Apps Script (Code.gs + Index.html) dalam Sheet > Extensions > Apps Script, deploy sebagai Web app (Execute as: Me, Who has access: Anyone).
doGet → papar landing page versi Apps Script (Index.html, guna google.script.run).
doPost → terima JSON array [{nama, jenis, size}] dari landing page luar, pulang {ok, jumlah} atau {ok:false, ralat}.
Versi Vercel: vercel/index.html (static). Tukar API_URL kepada Web app URL (/exec). Fetch POST tanpa header (text/plain) untuk elak CORS preflight.
Jenis baju: "Lengan Pendek - Lelaki" (XS–4XL), "Muslimah - Wanita" (XS–7XL), "Kanak-kanak" (100–160).
Jadual size dewasa (cm) — Lelaki: Bahu/Dada lilitan/Panjang; Muslimah: Dada ketiak-ketiak/Bahu/Panjang/Lengan.
Jadual size kanak-kanak (cm) — Panjang/Dada/Bahu/Tinggi anak/Umur, size 100 (4 thn) hingga 160 (13–14 thn).
Borang dalam bentuk table: 3 baris permulaan, "+ Tambah Nama", ✕ buang baris, baris kosong diabaikan, maks 100 nama sekali hantar, ditulis sekali gus dengan cap masa sama.
Selepas tukar Code.gs, perlu Deploy → Manage deployments → Edit → New version supaya URL /exec sama dapat versi baru.
