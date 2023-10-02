const fs = require("fs")

const dirPath = "./data"
if(!fs.existsSync(dirPath)){
  fs.mkdirSync(dirPath)
}

const dataPath = "./data/dataSiswa.json"
if(!fs.existsSync(dataPath)){
  fs.writeFileSync(dataPath, "[]", "utf-8")
}

const loadSiswa = () => {
  const fileBuffer = fs.readFileSync(dataPath, "utf-8")
  const dataSiswa = JSON.parse(fileBuffer)
  return dataSiswa
}

const menyimpanData = (dataSiswa) => {
        fs.writeFileSync("data/dataSiswa.json", JSON.stringify(dataSiswa))
}

const tambahSiswa = (data) => {
        const dataSiswa = loadSiswa()
        dataSiswa.push(data)
        menyimpanData(dataSiswa)
        
}

const findSiswa = (id) => {
  const dataSiswa = loadSiswa()
  const dataSama = dataSiswa.find((dataSama) => dataSama.id === id)
  return dataSama
}

const cekDuplikat = (nama) => {
        const dataSiswa = loadSiswa()
        return dataSiswa.find((data) => data.nama === nama)
}

module.exports = { loadSiswa, findSiswa, tambahSiswa, cekDuplikat }
