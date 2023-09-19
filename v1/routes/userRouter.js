const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../../middlewares/validar-campos");
const { getUsers, createUser, actualizarUsuario, borrarUsuario } = require('../../controllers/userController');

const {
  validarJWT,
  varlidarADMIN_ROLE,
  varlidarADMIN_ROLE_o_MismoUsuario,
} = require("../../middlewares/validar-jwt");

const router = Router();

router.get("/", validarJWT, getUsuarios);

module.exports = router;
