const fs = require("fs");

// membuat folder data jika tidak ada
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// membuat file dataSiswa.json jika belum ada
const dataPath = "./data/dataSiswa.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

// mengubah data json menjadi object
const loadSiswa = () => {
  const fileBuffer = fs.readFileSync(dataPath, "utf-8");
  const dataSiswa = JSON.parse(fileBuffer);
  return dataSiswa;
};

// mengubah data object menjadi json
const menyimpanData = (dataSiswa) => {
  fs.writeFileSync("data/dataSiswa.json", JSON.stringify(dataSiswa));
};

// menambah data siswa ke dalam data json
const tambahSiswa = (data) => {
  const dataSiswa = loadSiswa();
  dataSiswa.push(data);
  menyimpanData(dataSiswa);
};

// mencari id dari data siswa apakah ada dalam json
const findSiswa = (nama) => {
  const dataSiswa = loadSiswa();
  const dataSama = dataSiswa.find((dataSama) => dataSama.nama === nama);
  return dataSama;
};

// mengecek apakah nama itu ada di dalam data json
const cekDuplikat = (nama) => {
  const dataSiswa = loadSiswa();
  return dataSiswa.find((data) => data.nama === nama);
};

// hapus data siswa
const hapusData = (nama) => {
  const dataSiswa = loadSiswa();
  const filteredSiswa = dataSiswa.filter((data) => data.nama !== nama);
  menyimpanData(filteredSiswa);
};

// update data siswa
const updateSiswa = (dataBaru) => {
  const dataSiswa = loadSiswa();
  const filteredSiswa = dataSiswa.filter(
    (dataSiswa) => dataSiswa.nama !== dataBaru.oldName
  );
  delete dataBaru.oldNama;
  filteredSiswa.push(dataBaru);
  menyimpanData(filteredSiswa);
};

module.exports = {
  loadSiswa,
  findSiswa,
  tambahSiswa,
  cekDuplikat,
  hapusData,
  updateSiswa,
};
