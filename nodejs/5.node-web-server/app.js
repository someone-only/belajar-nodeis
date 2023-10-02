const http = require('http')
const fs = require('fs')

const server = http.createServer((req,res) => {       
  res.writeHead(200, {    
    'Content-Type': 'text/html'
  })
  
  const renderHtml = (path, res) => { 
    fs.readFile(path, (err, data) => {
      if(err){
        res.writeHead(404)
        res.write('EROR: file not found')
      }else{
        res.write(data)
      }
      res.end()
     }) 
  }

  const url = req.url
  console.log(url) 

  if(url === '/about'){
    renderHtml("./about.html", res)
  }else if(url === '/product'){
    res.write(`<h1>Selamat datang di halaman product</h1>`)
    res.end()    
  }else {
    renderHtml('./index.html', res)
  }  

})

server.listen(3000, () => console.log('Server running on port 3000'))
