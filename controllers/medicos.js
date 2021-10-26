const { response } = require("express");
const Medicos = require("../models/medicos");


const getMedicos=async (req,res=response)=>{

    const medicos= await Medicos.find().populate('usuario','nombre').populate('hospital','nombre');

    res.json({
        ok:true,
        medicos
    });
};

const getMedicoById=async (req,res=response)=>{

    const id=req.params.id;

    try {

         const medico= await Medicos.findById(id).populate('usuario','nombre').populate('hospital','nombre');

         res.json({
         ok:true,
         medico
    });
        
    } catch (error) {
        console.log(error)
        res.status().json({

           ok:false,
           msg:'Medico No Encontrado'
        })
    }

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

    const id=req.params.id;
    const uid=req.uid;

    try {

        const medico= await Medicos.findById(id);

        if (!medico) {

            return res.status(404).json({
                ok:true,
                msg:'Medico no Encontrado por id',
            }); 
        };

        const cambiosMedicos={
            ...req.body,
            usuario:uid
        };

        const medicoActualizado= await Medicos.findByIdAndUpdate(id,cambiosMedicos,{new:true});

        res.json({
            ok:true,
            medico:medicoActualizado
        });

    } catch (error) {
        console.log(error),
        res.status(500).json({
            ok:false,
            msg:'Hable con el Administrador'
        });
    };
};

const borrarMedicos=async (req,res=response)=>{

    const id=req.params.id;

    try {

        const medico= await Medicos.findById(id);

        if (!medico) {

            return res.status(404).json({
                ok:true,
                msg:'medico no Encontrado por id',
            }); 
        };

        await Medicos.findByIdAndDelete(id);

        res.json({
            ok:true,
            msg:"Medico Eliminado"
        });
    }
    
     catch (error) {
        console.log(error),
        res.status(500).json({
            ok:false,
            msg:'Hable con el Administrador'
        });
    };
};

module.exports={
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    borrarMedicos,
    getMedicoById
};

    