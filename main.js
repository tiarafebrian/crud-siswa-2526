// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// GANTI DENGAN FIREBASE CONFIG ANDA
const firebaseConfig = {
    apiKey: "AIzaSyAoa6XVwvLudjkyHxzF2Q8Xp61BEaG8_Ho",
    authDomain: "insancemerlang-e829c.firebaseapp.com",
    projectId: "insancemerlang-e829c",
    storageBucket: "insancemerlang-e829c.firebasestorage.app",
    messagingSenderId: "544747474491",
    appId: "1:544747474491:web:be2b4a1553734a5c53961e"
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const siswaColletion = collection(db,"siswa")

// fungsi untuk menampilkan daftar siswa
export async function tampilkanDaftarSiswa() {
  // ambil snapshot data dari koleksi siswa
  const snapshot = await getDocs(siswaColletion)
  
  // ambil elemen tabel data
  const tabel = document.getElementById("tabelData")
  
  // kosongkan isi tabel
  tabel.innerHTML = ""
  
  // loop setiap dokumen dalam snapshot
  snapshot.forEach ((doc) => {
    // variabel untuk menyimpan data
    const data = doc.data()
    const id = doc.id
    
    // buat elemen baris baru
    const baris = document.createElement("tr")
    
    // buat elemen kolom untuk NIS
    const kolomNIS = document.createElement("td")
    kolomNIS.textContent = data.kolomNIS
    
   // buat elemen kolom untuk Nama
   const kolomNama = document.createElement("td")
   kolomNama.textContent = data.nama
   
   // buat elemen kolom untuk Kelas
   const kolomKelas = document.createElement("td")
   kolomKelas.textContent = data.kelas
   
   // buat elemen kolom untuk Aksi
   const kolomAksi = document.createElement("td")
   
   // buat tombol edit
   const tombolEdit = document.createElement("button")
   tombolEdit.textContent = "Edit"
   tombolEdit.href = "edit.html?id=" + id
   tombolEdit.className = "button edit"
   
   // buat tombol hapus
   const tombolHapus = document.createElement("button")
   tombolHapus.textContent = "Hapus"
   tombolHapus.className = "button delete"
   
   // tambahkan elemen ke dalam kolom Aksi
   kolomAksi.appendChild(tombolEdit)
   kolomAksi.appendChild(tombolHapus)
   
   // tambahkan kolom ke dalam baris
   baris.appendChild(kolomNIS)
   baris.appendChild(kolomNama)
   baris.appendChild(kolomKelas)
   baris.appendChild(kolomAksi)
   
   // tambahkan baris ke dalam tabel
   tabel.appendChild(baris)
   
  })
}

 // fungsi untuk menambahkan data siswa
export async function tambahDataSiswa() {
  //ambil nilai dari form
  const nis = document.getElementById('nis').value
  const nama = document.getElementById('nama').value
  const kelas = document.getElementById('kelas').value
  
  // tambahkan data ke firestore
  await addDoc(siswaCollection, {
    nis: nis,
    nama: nama,
    kelas: kelas
  })
  
  // alihkan ke halaman daftar siswa
  window.location.href = 'daftar.html'
}