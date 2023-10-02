const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();

require("./utils/db");
const { Student } = require("./models/student");

const { body, validationResult } = require("express-validator");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const methodOverride = require("method-override");

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
app.use(methodOverride("_method"));

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

app.get("/contact", async (req, res) => {
  dataSiswa = await Student.find();
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
  body("nama").custom(async (value) => {
    const duplikat = await Student.findOne({ nama: value });
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
      Student.insertMany(req.body);
      req.flash("msg", "Data Berhasil Ditambahkan");
      res.redirect("/contact");
    }
  }
);

/*
app.get("/contact/delete/:nama", async (req, res) => {
  const dataSama = await Student.findOne({ nama: req.params.nama });
  if (!dataSama) {
    res.status(404);
    res.send("<h1>404</h1>");
  } else {
    Student.deleteOne({ _id: dataSama._id }).then((result) => {
      req.flash("msg", "Data Berhasil Dihapus");
      res.redirect("/contact");
    });
  }
});
*/
app.delete("/contact", (req, res) => {
  Student.deleteOne({ nama: req.body.nama }).then((result) => {
    req.flash("msg", "Data Berhasil Dihapus");
    res.redirect("/contact");
  });
});

app.get("/contact/edit/:nama", async (req, res) => {
  const dataSama = await Student.findOne({ nama: req.params.nama });
  res.render("edit-siswa", {
    title: "Form ubah data siswa",
    layout: "layouts/main.ejs",
    dataSama,
  });
});

app.put(
  "/contact",
  body("nama").custom(async (value, { req }) => {
    const duplikat = await Student.findOne({ nama: value });
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
     Student.updateOne(
        { _id: req.body._id },
        {
          $set: {
            id: req.body.id,
            nama: req.body.nama,
            kelas: req.body.kelas,
          },
        }
      ).then((result) => {
        req.flash("msg", "Data Berhasil Diubah");
        res.redirect("/contact");
      });
    }
  }
);

app.get("/contact/:nama", async (req, res) => {
  const dataSama = await Student.findOne({ nama: req.params.nama });
  res.render("detail", {
    title: "halaman detail data siswa",
    layout: "layouts/main.ejs",
    dataSama,
  });
});

app.listen(3000, () => {
  console.log("mongodb kartu siswa | running in http://localhost:3000/");
});
