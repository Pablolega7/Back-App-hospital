const { Router } = require('express');
const { check } = require('express-validator');
const { getMedicos, actualizarMedicos, borrarMedicos, crearMedicos } = require('../controllers/medicos');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.get( '/', getMedicos );

router.post( '/',
    [
        validarJWT,
        check('nombre','El nombre del Medico es Necesario').not().isEmpty(),
        check('hospital','El Hospital id tiene que ser Valido').isMongoId(),
        validarCampos
    ], 
    crearMedicos
);

router.put( '/:id',
    [
        validarJWT,
        check('nombre','El nombre del Medico es Necesario').not().isEmpty(),
        check('hospital','El Hospital id tiene que ser Valido').isMongoId(),
        validarCampos
    ],   
    actualizarMedicos
);

router.delete( '/:id',

    borrarMedicos,
    validarJWT
);


module.exports=router;