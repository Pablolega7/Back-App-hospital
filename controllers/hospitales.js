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

    const id=req.params.id;
    const uid=req.uid;

    try {

        const hospital= await Hospital.findById(id);

        if (!hospital) {

            return res.status(404).json({
                ok:true,
                msg:'Hospital no Encontrado por id',
            }); 
        };

        const cambiosHospital={
            ...req.body,
            usuario:uid
        };

        const hospitalActualizado= await Hospital.findByIdAndUpdate(id,cambiosHospital,{new:true});

        res.json({
            ok:true,
            hospital:hospitalActualizado
        });

    } catch (error) {
        console.log(error),
        res.status(500).json({
            ok:false,
            msg:'Hable con el Administrador'
        });
    };
};

const borrarHospitales=async (req,res=response)=>{

    const id=req.params.id;

    try {

        const hospital= await Hospital.findById(id);

        if (!hospital) {

            return res.status(404).json({
                ok:true,
                msg:'Hospital no Encontrado por id',
            }); 
        };

        await Hospital.findByIdAndDelete(id);

        res.json({
            ok:true,
            msg:"Hospital Eliminado"
        });

    } catch (error) {
        console.log(error),
        res.status(500).json({
            ok:false,
            msg:'Hable con el Administrador'
        });
    };
};

module.exports={
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    borrarHospitales
};