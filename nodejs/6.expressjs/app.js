const express = require('express')
const app = express()

app.get('/', (req,res) => {
  res.sendFile('./index.html', { root: __dirname })
})

app.get('/about', (req,res) => {
  res.sendFile('./about.html', { root: __dirname })
})

app.get('/contact', (req,res) => {
  res.sendFile('./contact.html', { root: __dirname })
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
