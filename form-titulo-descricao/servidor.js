const express = require('express')
const app = express()
const fs = require('fs')

app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

app.get('/index', (request, response) => {
    response.render('index')
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

let vetreg = []
app.post('/titulo-descricao', (request, response) => {
    let registro = { titulo: request.body.titulo, descricao: request.body.descricao }
    vetreg.push(registro)
    fs.writeFileSync('dados/titulo-descricao.json', JSON.stringify(registro))
    response.render('form', {registro: `O título e a descrição foram registrados!`})
})

console.log("Rodando server...")
app.listen(3000);