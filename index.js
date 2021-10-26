const express= require ('express');
const cors= require ('cors');
const { dbConnection }= require ('./database/config');
require ('dotenv').config();
const path= require ('path');

//Crear el Servidor de Express
const app= express();

//Configurar Cors
app.use(cors());

//Lectura del Body
app.use(express.json());

//Base de Datos
dbConnection();

//Directorio Publico
app.use(express.static('public'));

//Rutas
app.use ('/api/usuarios',require ('./routes/usuarios'));
app.use ('/api/login',require ('./routes/auth'));
app.use ('/api/hospitales',require('./routes/hospitales'));
app.use ('/api/medicos',require('./routes/medicos'));
app.use ('/api/todo',require('./routes/busquedas'));
app.use ('/api/upload',require('./routes/upload'));

app.get('*',(req,res)=>{

    res.sendFile(path.resolve (__dirname, 'public/index.html'));
});

app.listen(process.env.PORT,()=>{
    console.log('Servidor Corriendo en Puerto'+process.env.PORT);
});
