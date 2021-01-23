const express= require('express')
const app=express()
app.use(express.json())

const auth='123456'
const dbUsuarios=[{user:'Cris',pass:'1234',username:'Cristian Moyano'}]
//  http://localhost:5000/saludo
app.post('/login',(req,res)=>{
//logica
    //header
    let cabeceras=req.headers
    let body=req.body
    console.log(`El body es : ${body}`);
    if (cabeceras.auth && cabeceras.auth==auth)
    {
        if  (body){
            let resultados=dbUsuarios.filter(item=>(item.user==body.user)&&(item.pass==body.pass))
            if  (resultados.length>0){
                res.status(200).json({data:resultados[0].username})
            }else{
                res.status(404).json({data:'Usted no esta en la base de datos'})
            }
        }else{
            res.status(400).json({data:'llene todos los datos'})
        }

    }else{
        res.status(401).json({data:'Amigo usted no esta Autorizado para usar este servicio'})
    }

})

//  http://localhost:5000/saludo
app.get('/saludo',(req,res)=>{
    //logica
        res.status(200).json({data:'Hi Criss soy un GET'})
    })


app.listen(5001,()=>{
    console.log('Servidor corriendo en el puerto 5001');
})