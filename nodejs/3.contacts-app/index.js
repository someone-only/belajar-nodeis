const { tulisPertanyaan, simpanContacts } = require("./contacts")

const main = async () => {
  const id = await tulisPertanyaan("Masukkan id kamu: ")
  const nama = await tulisPertanyaan("Masukkan nama kamu: ")
  const kelas = await tulisPertanyaan("Masukkan kelas kamu: ")

  simpanContacts(id, nama, kelas)
}

main()
