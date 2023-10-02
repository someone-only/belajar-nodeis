const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://coba:RDr8M1NABQGTShOr@mydb.mmmpmks.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("koneksi berhasil"))
  .catch((err) => console.log("kesalahan koneksi:", err));


// Student.find()
// .then((student) => console.log('Dokumen pengguna:', student))
// .catch((err) => console.error('Kesalahan saat membaca dokumen:', err));


