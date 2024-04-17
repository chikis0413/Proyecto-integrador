import { check, validationResult } from 'express-validator'
import Usuario from '../models/Usuario.js'
import { generarId } from '../helpers/tokens.js'
import { emailRegistro } from '../helpers/emails.js'

const formulariologin = (req, res) => {
    res.render('auth/login', {
        
    })
}

const formularioregistro = (req, res) => {
    res.render('auth/registro', {
        pagina: 'Crear cuenta'
    })
}

const registrar = async (req, res) => {
    //validación
    await check('nombre').notEmpty().withMessage('El nombre no puede ir vacio').run(req)
    await check('apellido').notEmpty().withMessage('El apellido no puede ir vacío').run(req)
    await check('nacimiento').notEmpty().withMessage('La fecha de nacimiento no puede ir vacía').run(req)
    await check('telefono').notEmpty().withMessage('El número de teléfono no puede ir vacío').run(req)
    await check('genero').notEmpty().withMessage('El género no puede ir vacío').run(req)
    await check('email').isEmail().withMessage('El correo electrónico no es válido').run(req)
    await check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres').run(req)
    await check('repetir_password').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('La contraseña no es la misma');
        }
        return true;
    }).run(req);

    let resultado = validationResult(req)

    // Verificar que el resultado este vacio
    if(!resultado.isEmpty()) {
        //Errores
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            errores: resultado.array(),
            usuario: {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                nacimiento: req.body.nacimiento,
                telefono: req.body.telefono,
                genero: req.body.genero,
                email: req.body.email
            }
        })

    }

    //Extrae datos
    const { nombre, apellido, nacimiento, telefono, genero, email, password } = req.body

    // verificacion de usuarios dupliados
    const existeUsuario =await Usuario.findOne({where : { email }})
    if(existeUsuario) {
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            errores: [{msg: 'El usuario ya esta registrado'}],
            usuario: {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                nacimiento: req.body.nacimiento,
                telefono: req.body.telefono,
                genero: req.body.genero,
                email: req.body.email
            }
        })
    }
    
    //Almacenar un usuario
    const usuario = await Usuario.create({
        nombre,
        apellido,
        nacimiento,
        telefono,
        genero,
        email,
        password,
        token: generarId()
    })

    //Mostrar mensaje de confirmacion
    res.render('templates/mensaje')

}



const inicio = (req, res) => {
    res.render('auth/inicio', {
        
    })
}


const contrasena = (req, res) => {
    res.render('auth/contrasena', {
        
    })
}


export {
    formulariologin,
    formularioregistro,
    registrar,
    inicio,
    contrasena
}