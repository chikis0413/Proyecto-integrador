import express from "express";
import { formulariologin, formularioregistro, registrar, inicio, contrasena } from '../controllers/usuarioController.js'

const router = express.Router();

router.get('/login', formulariologin);

router.get('/registro', formularioregistro);
router.post('/registro', registrar);


router.get('/inicio', inicio);


router.get('/contrasena', contrasena)



export default router