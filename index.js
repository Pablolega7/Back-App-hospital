const express= require ('express');
const cors= require ('cors');
const { dbConnection }= require ('./database/config');
require ('dotenv').config();


//Crear el Servidor de Express
const app= express();

//Configurar Cors
app.use(cors());

//Lectura del Body
app.use(express.json());

//Base de Datos
dbConnection();

//Rutas
app.use ('/api/usuarios',require ('./routes/usuarios'));
app.use ('/api/login',require ('./routes/auth'));


app.listen(process.env.PORT,()=>{
    console.log('Servidor Corriendo en Puerto'+process.env.PORT);
});
