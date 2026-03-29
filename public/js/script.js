// ==========================================
// ARSITEKTUR MVP: LOGIKA BISNIS & UI (Sesi 3)
// ==========================================

// 1. DATABASE SEMENTARA (Simulasi Array Data Produk)
// Nanti di UAS, data ini akan diambil dari MySQL via CodeIgniter.
const dataProduk = [
    { id: 1, nama: "Paket Vitamin Imunitas", harga: 150000, icon: "fa-pills" },
    { id: 2, nama: "Alat Cek Gula Darah Digital", harga: 850000, icon: "fa-vial" },
    { id: 3, nama: "Kursi Roda Elektrik Premium", harga: 5500000, icon: "fa-wheelchair" }
];

// STATE APLIKASI (Variabel untuk melacak status transaksi)
let totalKeranjang = 0;
let jumlahItem = 0;

// MENANGKAP ELEMEN HTML (DOM Selection)
// Ini adalah cara JavaScript mencari elemen di index.html
const btnTampilkan = document.getElementById('btn-tampilkan-produk');
const katalogContainer = document.getElementById('katalog-container');
const displayTotal = document.getElementById('display-total');
const badgeKeranjang = document.getElementById('cart-badge');
const btnCheckout = document.getElementById('btn-checkout');
const promoAlert = document.getElementById('promo-alert');


// ==========================================
// TUGAS 1: LOOPS (Otomatisasi Tampilan UI)
// ==========================================
btnTampilkan.addEventListener('click', function() {
    // Menghapus pesan kosong
    katalogContainer.innerHTML = ''; 

    // TODO MAHASISWA: Gunakan 'for loop' untuk menampilkan dataProduk ke layar.
    // Petunjuk: Loop dari 0 sampai dataProduk.length
    
    for (let i = 0; i < dataProduk.length; i++) {
        // Membuat elemen HTML untuk setiap produk
        let produkCard = `
            <div class="col-md-4">
                <div class="card product-card h-100 p-3 text-center border-success border-opacity-25">
                    <i class="fa-solid ${dataProduk[i].icon} fa-3x text-success mb-3 mt-2"></i>
                    <h5 class="card-title fw-bold">${dataProduk[i].nama}</h5>
                    <p class="card-text text-muted">Rp ${dataProduk[i].harga.toLocaleString('id-ID')}</p>
                    <button class="btn btn-success w-100" onclick="tambahKeKeranjang(${dataProduk[i].harga})">
                        + Tambah
                    </button>
                </div>
            </div>
        `;
        // Menyuntikkan HTML ke dalam container
        katalogContainer.innerHTML += produkCard;
    }

    // Ubah status tombol setelah diklik
    btnTampilkan.disabled = true;
    btnTampilkan.innerHTML = '<i class="fa-solid fa-check"></i> Data Dimuat';
});


// ==========================================
// TUGAS 2: LOGIKA TRANSAKSI (Fungsi Beli)
// ==========================================
function tambahKeKeranjang(hargaProduk) {
    // 1. Update State (Data)
    totalKeranjang += hargaProduk;
    jumlahItem += 1;

    // 2. Update UI (DOM Manipulation)
    badgeKeranjang.textContent = jumlahItem;
    displayTotal.textContent = 'Rp ' + totalKeranjang.toLocaleString('id-ID');
    
    // Aktifkan tombol checkout karena keranjang sudah tidak kosong
    btnCheckout.classList.remove('disabled');

    // Panggil fungsi pengecekan promo
    cekPromoOtomatis();
}


// ==========================================
// TUGAS 3: CONDITIONALS (Logika Promo Bisnis)
// ==========================================
function cekPromoOtomatis() {
    const teksPromo = document.getElementById('promo-text');
    

   let diskon = 0;
if (totalKeranjang > 5000000) {
    diskon = totalKeranjang * 0.1; // Diskon 10%
    console.log("Selamat! Anda mendapatkan promo spesial PHARM.IO");
} else {
    diskon = 0;
    console.log("Belanja lebih dari 5 Juta untuk dapat diskon!");
}

let totalAkhir = totalKeranjang - diskon;
}


// ==========================================
// TUGAS 4: EVENT LISTENER (Titik Konversi Akhir)
// ==========================================
// Fungsi Checkout
btnCheckout.addEventListener('click', () => {
    if (totalKeranjang === 0) {
        alert("Keranjang masih kosong, Fifi!");
        return;
    }

    let diskon = 0;
    let keteranganDiskon = "";

    if (totalKeranjang > 5000000) {
        diskon = totalKeranjang * 0.1; // Diskon 10%
        keteranganDiskon = "\nSelamat! Anda dapat Diskon PHARM.IO: Rp " + diskon.toLocaleString();
    }

    let totalAkhir = totalKeranjang - diskon;

    alert(
        "Transaksi Berhasil!\n" +
        "Total Belanja: Rp " + totalKeranjang.toLocaleString() +
        keteranganDiskon +
        "\nTotal Pembayaran: Rp " + totalAkhir.toLocaleString() +
        "\nTerima kasih telah berbelanja di PHARM.IO"
    );

    totalKeranjang = 0;
    displayTotal.innerText = "Rp 0";
});