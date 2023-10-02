const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts');

app.set('view engine', 'ejs')

app.use(expressLayouts)

app.get('/', (req,res) => {
        const siswa = [
                {
                id: "1",     
                nama: "nano",
                kelas: "11"
                },
                {
                id: "2",     
                nama: "ore",
                kelas: "11"
                },
                {
                id: "3",     
                nama: "pal",
                kelas: "11"
                }, 
        ]
        res.render('index', { 
                title: "website ejs", 
                siswa,
                layout: "layouts/main.ejs"
        })
})

app.get('/about', (req,res) => {
        res.render('about', { 
                title: "halaman about",
                layout: "layouts/main.ejs"
        })
})

app.get('/contact', (req,res) => {
        res.render('contact', { 
                title: "halaman contact", 
                layout: "layouts/main.ejs"
        })

})

app.get('/product/:id', (req, res) => {
        res.send(`Product id: ${req.params.id} <br> Category id: ${req.query.category}`)
})

app.get('/json', (req,res) => {
        res.json({
                id: 1,      
                nama: 'uil',
                kelas: '11'
        })
})

app.use('/', (req,res) => {
        res.status(404)      
        res.send('halaman tidak ada')
})

app.listen(3000, () => {
        console.log('Server is running on port 3000')
})
