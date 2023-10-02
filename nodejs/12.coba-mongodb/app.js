const { MongoClient, Collection } = require("mongodb");

// Replace the uri string with your connection string.
const uri =
  "mongodb+srv://coba:RDr8M1NABQGTShOr@mydb.mmmpmks.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function connect() {
  try {
    await client.connect();
    // Lakukan operasi database di sini
    const db = client.db("mydb");
    const collection = db.collection("siswa");
 
collection.deleteMany({})

        console.log("Koneksi ke MongoDB berhasil!");
  } catch (error) {
    console.error("Koneksi MongoDB gagal:", error);
  }
}

connect();
