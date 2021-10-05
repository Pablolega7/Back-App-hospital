const { response } = require("express");
const Hospital= require('../models/hospital');


const getHospitales=async (req,res=response)=>{

    const hospital= await Hospital.find().populate('usuario','nombre');

    res.json({
        ok:true,
        hospital
    });
};

const crearHospitales=async (req,res=response)=>{
    const uid=req.uid;

    const hospital=new Hospital({
        ...req.body,
        usuario:uid,
    });

    try {

     const hospitalDb= await hospital.save();

        res.json({
            ok:true,
            hospital:hospitalDb
        });
        
    } catch (error) {
        console.log(error),
        res.status(500).json({
            ok:false,
            msg:"Hable con el Administrador"
        });   
    };
};

const actualizarHospitales=async (req,res=response)=>{

    res.json({
        ok:true,
        msg:'actualizarHospitales'
    });
};

const borrarHospitales=async (req,res=response)=>{

    res.json({
        ok:true,
        msg:'borrarHospitales'
    });
};

module.exports={
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    borrarHospitales
};