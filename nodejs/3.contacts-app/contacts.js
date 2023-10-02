const fs = require("fs")
const rl = require("readline")

const r = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const dirPath = "./data"
if(!fs.existsSync(dirPath)){
  fs.mkdirSync(dirPath)
}

const dataPath = "./data/siswa.json"
if(!fs.existsSync(dataPath)){
  fs.writeFileSync(dataPath, "[]", "utf-8")
}

const tulisPertanyaan = (pertanyaan) => {
  return new Promise((resolve,reject) => {
    r.question(pertanyaan, (p) => {
      resolve(p)
    })
  })
}

const simpanContacts = (id, nama, kelas) => {
  const contact = { id, nama, kelas }
  const fileBuffer = fs.readFileSync("./data/siswa.json", "utf-8")
  const contacts = JSON.parse(fileBuffer)
  contacts.push(contact)

  fs.writeFileSync("./data/siswa.json", JSON.stringify(contact))
  console.log("Terikakasih sudah memasukkan data")
  r.close()
}


module.exports = { tulisPertanyaan, simpanContacts}
