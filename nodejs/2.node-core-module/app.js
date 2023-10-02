const fs = require("node:fs")
const r = require("readline")

try{
  // menulis file secara syncronus
  //  fs.writeFileSync("sync.txt", "hello everyone text ini dibuat secara asyncronus")

  // menulis file secara asyncronus
  /* fs.writeFile("async.txt", "hello everyone text ini dibuat secara asyncronus", (error) => {
    console.log(error)
  })
  */
  
  // membaca file secara syncronus
  //const data = fs.readFileSync("sync.txt", "utf-8")

  // membava file secara asyncronus
  /*const data = fs.readFile("async.txt", "utf-8", (e, data) => {
    if (e) throw e
    console.log(data)
  })

  console.log(data)
  */

  const rl = r.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  rl.question("masukkan nama anda: ", (nama) => {
    rl.question("masukkan id anda: ", (id) => {
      const contact = { nama: nama, id: id }
      const file = fs.readFileSync("data/data.json", "utf-8")
      const contacts = JSON.parse(file)
      contacts.push(contact)

      fs.writeFileSync("data/data.json", JSON.stringify(contacts))
      
      console.log("Terimakasih sudah memasukkan data")
      rl.close()
    })
  })
}catch(e){
  console.log(e)
}
