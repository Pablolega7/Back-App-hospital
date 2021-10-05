const { response } = require("express");
const Medicos = require("../models/medicos");


const getMedicos=async (req,res=response)=>{

    const medicos= await Medicos.find().populate('usuario','nombre').populate('hospital','nombre');

    res.json({
        ok:true,
        medicos
    });
};

const crearMedicos=async (req,res=response)=>{

    const uid=req.uid;
    const medico=new Medicos({
        ...req.body,
        usuario:uid,
    });

    try {

     const medicoDb= await medico.save();

        res.json({
            ok:true,
            medico:medicoDb
        });
        
    } catch (error) {
        console.log(error),
        res.status(500).json({
            ok:false,
            msg:"Hable con el Administrador"
        });   
    };
};

const actualizarMedicos=async (req,res=response)=>{

    res.json({
        ok:true,
        msg:'actualizarMedicos'
    });
};

const borrarMedicos=async (req,res=response)=>{

    res.json({
        ok:true,
        msg:'borrarMedicos'
    });
};

module.exports={
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    borrarMedicos
};

    