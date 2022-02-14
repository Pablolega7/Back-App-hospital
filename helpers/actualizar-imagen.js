const Usuario= require ('../models/usuario');
const Hospital= require ('../models/hospital');
const Medicos= require ('../models/medicos');
const fs= require ('fs');

const borrarimagen = ( path ) => {

    if ( fs.existsSync( path ) ) {
      //Borrar la Imagen Anterior
     fs.unlinkSync( path );
     };
};

const actualizarimagen = async ( tipo, id, nombreArchivo ) => {

    let pathViejo = "";

    switch ( tipo ) {
        case 'medicos':
            const medico = await Medicos.findById( id );
            if ( !medico ) {
                return false;
            };
             pathViejo = `./uploads/medicos/${medico.img}`;
            borrarimagen( pathViejo );

             medico.img = nombreArchivo;
             await medico.save();
             return true;
            break;

        case 'hospitales':

            const hospital = await Hospital.findById( id );
            if ( !hospital ) {
                return false;
            };
             pathViejo = `./uploads/hospitales/${hospital.img}`;
            borrarimagen( pathViejo );

             hospital.img = nombreArchivo;
             await hospital.save();
             return true;
            break;

        case 'usuarios':

            const usuario = await Usuario.findById( id );
            if ( !usuario ) {
                return false;
            };
             pathViejo = `./uploads/usuarios/${usuario.img}`;
            borrarimagen( pathViejo );

             usuario.img = nombreArchivo;
             await usuario.save();
             return true;
            break;
    };
};

module.exports = {
    actualizarimagen
};