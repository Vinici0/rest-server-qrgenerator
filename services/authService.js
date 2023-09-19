const bcryptjs = require("bcryptjs");
const Usuario = require("../models/user");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (correo, password) => {
  const usuario = await Usuario.findOne({ correo });

  if (!usuario) {
    throw new Error("Usuario / Password no son correctos - correo");
  }

  if (!usuario.estado) {
    throw new Error("Usuario / Password no son correctos - estado: false");
  }

  const validPassword = bcryptjs.compareSync(password, usuario.password);
  if (!validPassword) {
    throw new Error("Usuario / Password no son correctos - password");
  }

  const token = await generarJWT(usuario.id);
  
  return {
    usuario,
    token,
  };
};

module.exports = {
  login,
};
