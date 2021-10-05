const {response}= require ('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarimagen } = require('../helpers/actualizar-imagen');
const path= require ('path');
const fs= require ('fs');


const fileUpload= (req,res=response)=>{

    const tipo=req.params.tipo;
    const id=req.params.id;
    
     //Validar Tipo
    const tiposPermitidos=['hospitales','medicos','usuarios'];

    if (!tiposPermitidos.includes(tipo)) {

        res.status(400).json({
            ok:false,
            msg:'NO es un medico,hospital,usuario'
        });
    };

      //Validar que Exista un Archivo
    if (!req.files || Object.keys(req.files).length === 0) {

        return res.status(400).json({
            ok:false,
            msg:'No hay ningun Archivo'
        });
    };

    //Procesar la Imagen
    const file=req.files.imagen;
    
    const nombreCortado=file.name.split('.');
    const extensionArchivo=nombreCortado[nombreCortado.length -1];

    //Validar Extension
    const extensionesValidas=['jpg','png','gif','jpeg'];

    if (!extensionesValidas.includes(extensionArchivo)) {

        return res.status(400).json({
            ok:false,
            msg:'No es una Extension Permitida'
        });
    };

    //Generar nombre del Archivo
    const nombreArchivo=`${uuidv4()}.${extensionArchivo}`;

    //Path para guardar la Imagen
    const path=`./uploads/${tipo}/${nombreArchivo}`;

    //Mover la Imagen
     file.mv(path,(err)=> {

        if (err){
            console.log(err);
            return res.status(500).json({
            ok:false,
            msg:'Error al mover la Imagen'
        });
    };

        //Actualizar Base de Datos
        actualizarimagen(tipo,id,nombreArchivo);

        res.json({
        ok:true,
        msg:'Archivo Subido',
        nombreArchivo
    });
  });  
};

const retornaImagen= async(req,res=response)=>{

    const tipo=req.params.tipo;
    const foto=req.params.foto;

    const pathImg=path.join(__dirname,`../uploads/${tipo}/${foto}`);

    //imagen por Defecto
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    }else{
        const pathImg=path.join(__dirname,`../uploads/imagen no encontrada.jpg`);
        res.sendFile(pathImg);
    };
};

module.exports={
    fileUpload,
    retornaImagen
};