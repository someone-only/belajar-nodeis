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

const simpanDataSiswa = (id, nama, kelas) => {
  const data = { id, nama, kelas }
  //const fileBuffer = fs.readFileSync("./data/dataSiswa.json", "utf-8")
  //const contacts = JSON.parse(fileBuffer)
  const dataSiswa = loadSiswa()

  const duplikatNama = dataSiswa.find((data) => data.nama === nama)
  if(duplikatNama){
    console.log("Nama sudah ada didalam data, Silahkan masukkan nama lain")
    return false
  }

  const duplikatId = dataSiswa.find((data) => data.id === id)
  if(duplikatId){
    console.log("Id sudah ada didalam data, Silahkan masukkan nama lain")
    return false
  }
  dataSiswa.push(data)

  fs.writeFileSync("./data/dataSiswa.json", JSON.stringify(dataSiswa))
  console.log("Terimakasih sudah memasukkan data")
}

const listDataSiswa = () => {
  const dataSiswa = loadSiswa()
  console.log("Daftar siswa:")
  dataSiswa.forEach((data) => {
    console.log(`id.${data.id} ${data.nama} - ${data.kelas} `)
  })
}

const detailDataSiswa = (nama) => {
  const dataSiswa = loadSiswa()
  const dataSama = dataSiswa.find((dataSama) => dataSama.nama.toLowerCase() === nama.toLowerCase())

  if(!dataSama){
    console.log(`${nama} tidak ditemukan!`)
    return false
  }

  console.log(dataSama.id)
  console.log(dataSama.nama)
  console.log(dataSama.kelas)
}

const deleteDataSiswa = (nama, id) => {
  const dataSiswa = loadSiswa()
  const dataBaru = dataSiswa.filter((dataSama) => dataSama.nama.toLowerCase() !== nama.toLowerCase() || dataSama.id !== id)
  
  if(dataSiswa.length === dataBaru.length){
    console.log(`${nama} tidak ditemukan!`)
    return false
  }

  fs.writeFileSync('./data/dataSiswa.json',JSON.stringify(dataBaru))
  console.log(`${nama} berhasil dihapus dari data`)
}

module.exports = { simpanDataSiswa, listDataSiswa, detailDataSiswa, deleteDataSiswa }
