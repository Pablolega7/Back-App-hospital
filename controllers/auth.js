const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleverify } = require('../helpers/google-verify');
const { findById } = require('../models/usuario');
const { getMenuFrontEnd } = require('../helpers/menu-frontend');

const login = async ( req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        // Verificar email
        const usuarioDB = await Usuario.findOne({ email });

        if ( !usuarioDB ) {
            return res.status( 404 ).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        };

        // Verificar contraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if ( !validPassword ) {
            return res.status( 400 ).json({
                ok: false,
                msg: 'Contraseña no válida'
            });
        };

        // Generar el TOKEN - JWT
        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok: true,
            token,
            menu:getMenuFrontEnd( usuarioDB.role )
        });

    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    };
};

const googleSignIn = async ( req, res = response ) => {

    const googleTOken = req.body.token;

    try {

        const { name, email, picture } = await googleverify( googleTOken );

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if ( !usuarioDB ) {
            //Si el Usuario no Existe
            usuario = new Usuario({
                nombre: name,
                email,
                password:'',
                img: picture,
                google: true,
                fb: false
            });
        } else{
            //Si existe el Usuario
            usuario = usuarioDB;
            usuario.google = true;
        };

        //Guardar en Base de datos
        await usuario.save();

        //Generar JWT
        const token = await generarJWT( usuario.id );


        res.json({
            ok: true,
            token,
            menu: getMenuFrontEnd( usuario.role )
        });
        
    } catch ( error ) {
        console.log( error );
        res.status( 401 ).json({
            ok: false,
            msg: 'Token no es Correcto'
        });
    };
};

const renewToken = async( req, res = response ) => {

    const uid = req.uid

     //Generar JWT
     const token = await generarJWT( uid );

     const usuario = await Usuario.findById( uid );

    res.json({
        ok: true,
        usuario,
        token,
        menu: getMenuFrontEnd( usuario.role )
    });
};

module.exports = {
    login,
    googleSignIn,
    renewToken
};
