const express = require('express')
const {Router} = require ('express')
const app = express()
const api = Router()
api.use(express.json())
api.use(express.urlencoded({extended: true}))
app.use(express.static('public'));
app.use('/api',api)
/////////////////////////////////////////


let productos = []

api.get('/Productos',(req,res)=>{
   res.json(productos)
})

api.get('/Productos/:id',(req,res)=>{
    let id = req.params.id
    let buscado = productos.find(p => p.id == id)
    if (buscado != undefined){
        res.send(buscado)}
    else  {  
        res.send('error:producto no encontrado')
}

 })
 
api.post('/Productos',(req,res)=>{
    let id = productos.length + 1
    req.body.id = id
    productos.push(req.body)
    res.json(req.body)
})


api.put('/Productos/:id,:nuevoprecio',(req,res)=>{
   let id = req.params.id
   let update = productos.find(p => p.id == id)
   update.precio = req.params.nuevoprecio
   res.send(update)
 
})

api.delete('/Productos/:id',(req,res)=>{
    let id = req.params.id
    let indice = productos.indexOf(el =>el.id ==id )
    let borrado = productos.splice(indice,1)
    res.send(borrado)
  
 })



const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))
