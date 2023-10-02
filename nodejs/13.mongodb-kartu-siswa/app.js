const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const app = express()

require("./utils/db")
const { Student }  = require("./models/student")

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

app.get("/contact", async (req, res) => {
  dataSiswa = await Student.find();
  res.render("contact", {
    title: "halaman data siswa",
    layout: "layouts/main.ejs",
    dataSiswa,
    msg: req.flash("msg"),
  });
});

app.get("/contact/:nama", async (req, res) => {
  const dataSama = await Student.findOne({ nama: req.params.nama });
  res.render("detail", {
    title: "halaman detail data siswa",
    layout: "layouts/main.ejs",
    dataSama,
  });
});

app.listen(3000, () => {
        console.log("mongodb kartu siswa | running in http://localhost:3000/")
})

