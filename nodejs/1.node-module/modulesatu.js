const nama = "kavi"

function getNama(nama){
  return `halo nama saya ${nama}`
}

const arr = [1,2,3,4,5,6]

const siswa = {
  nama: "klee",
  kelas: 10
}

class Hewan{
  constructor(){
    console.log("object telah dibuat")
  }
}

module.exports = {nama, getNama, arr, siswa, Hewan}
