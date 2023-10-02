const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const {
  loadSiswa,
  findSiswa,
  tambahSiswa,
  cekDuplikat,
  hapusData,
  updateSiswa,
} = require("./utils/contacts");
const { body, validationResult } = require("express-validator");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

app.set("view engine", "ejs");

app.use(expressLayouts);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static("./node_modules/bootstrap/dist/"));

app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

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
    msg: req.flash("msg"),
  });
});

app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    title: "Form tambah data siswa",
    layout: "layouts/main.ejs",
  });
});

app.post(
  "/contact",
  body("nama").custom((value) => {
    const duplikat = cekDuplikat(value);
    if (duplikat) {
      throw new Error("Nama sudah ada");
    }
    return true;
  }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("add-contact", {
        title: "Form tambah data siswa",
        layout: "layouts/main.ejs",
        errors: errors.array(),
      });
    } else {
      tambahSiswa(req.body);
      req.flash("msg", "Data Berhasil Ditambahkan");
      res.redirect("/contact");
    }
  }
);

// delete data siswa
app.get("/contact/delete/:nama", (req, res) => {
  const dataSama = findSiswa(req.params.nama);
  if (!dataSama) {
    res.status(404);
    res.send("<h1>404</h1>");
  } else {
    hapusData(req.params.nama);
    req.flash("msg", "Data Berhasil Dihapus");
    res.redirect("/contact");
  }
});

// halaman form ubah data
app.get("/contact/edit/:nama", (req, res) => {
  const dataSama = findSiswa(req.params.nama);

  res.render("edit-siswa", {
    title: "Form ubah data siswa",
    layout: "layouts/main.ejs",
    dataSama,
  });
});

// proses ubah data
app.post(
  "/contact/update",
  body("nama").custom((value, { req }) => {
    const duplikat = cekDuplikat(value);
    if (value !== req.body.oldNama && duplikat) {
      throw new Error("Nama sudah ada");
    }
    return true;
  }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("edit-siswa", {
        title: "Form tambah data siswa",
        layout: "layouts/main.ejs",
        errors: errors.array(),
        dataSama: req.body,
      });
    } else {
      updateSiswa(req.body);
      req.flash("msg", "Data Berhasil Diubah");
      res.redirect("/contact");
    }
  }
);

// halaman detail siswa
app.get("/contact/:nama", (req, res) => {
  const dataSama = findSiswa(req.params.nama);
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
