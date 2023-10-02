const express = require("express");
const { body, header } = require("express-validator")
const app = express();
const expressLayouts = require("express-ejs-layouts");
const { loadSiswa, findSiswa, tambahSiswa } = require("./utils/contacts");

app.set("view engine", "ejs");

app.use(expressLayouts);

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}))

app.use("/", express.static("./node_modules/bootstrap/dist/"));

app.get("/", (req, res) => {
  const siswa = [
    {
      id: "1",
      nama: "nano",
      kelas: "11",
    },
    {
      id: "2",
      nama: "ore",
      kelas: "11",
    },
    {
      id: "3",
      nama: "pal",
      kelas: "11",
    },
  ];
  res.render("index", {
    title: "website ejs",
    siswa,
    layout: "layouts/main.ejs",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "halaman about",
    layout: "layouts/main.ejs",
  });
});

app.get("/contact", (req, res) => {
  dataSiswa = loadSiswa();
  res.render("contact", {
    title: "halaman data siswa",
    layout: "layouts/main.ejs",
    dataSiswa,
  });
});

app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    title: "Form tambah data siswa",
    layout: "layouts/main.ejs",
  });
});

app.post("/contact", (req, res) => {
  tambahSiswa(req.body);
  res.redirect("/contact");
});

app.get("/contact/:id", (req, res) => {
  dataSama = findSiswa(req.params.id);
  res.render("detail", {
    title: "halaman detail data siswa",
    layout: "layouts/main.ejs",
    dataSama,
  });
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("halaman tidak ada");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
