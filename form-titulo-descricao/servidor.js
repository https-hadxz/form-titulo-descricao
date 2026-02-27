const express = require('express')
const app = express()
const fs = require('fs')
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
let vetreg = JSON.parse(fs.readFileSync('dados/titulo-descricao.json', 'utf8'))

app.get('/', (request, response) => {
    response.render('index', {lista: vetreg})
})

app.get('/index', (request, response) => {
    response.redirect('/')
})

app.get('/contato', (request, response) => {
    response.render('contato')
})
app.get('/detalhes', (request, response) => {
    response.render('detalhes')
})
app.get('/titulo-descricao', (request, response) => {
    response.render('form')
})


app.post('/titulo-descricao', (request, response) => {
    let registro = { titulo: request.body.titulo, descricao: request.body.descricao, imagem: request.body.imagem }
    vetreg.push(registro)
    fs.writeFileSync('dados/titulo-descricao.json', JSON.stringify(vetreg))
    response.render('form', {registro: `O título e a descrição foram registrados!`})
})

console.log("Rodando server...")
app.listen(3000);