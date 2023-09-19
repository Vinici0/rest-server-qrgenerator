const { request, response } = require("express");
const userService = require("../services/userService");

const getUsers = async (req, res) => {
  const { limite = 5, desde = 0 } = req.query;
  try {
    const { total, usuarios } = await userService.getUsers();
    res.json({
      ok: true,
      total,
      usuarios: usuarios.slice(Number(desde), Number(desde) + Number(limite)),
    });
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ ok: false, data: { error: error?.message || error } });
  }
};

const createUser = async (req, res = response) => {
  try {
    const { nombre, correo, password, rol } = req.body;
    const usuario = await userService.createUser({
      nombre,
      correo,
      password,
      rol,
    });

    res.json({
      ok: true,
      usuario,
    });
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ ok: false, data: { error: error?.message || error } });
  }
};

const updateUser = async (req, res = response) => {
  try {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;
    const usuario = await userService.updateUser(id, resto);

    res.json({
      ok: true,
      usuario,
    });
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ ok: false, data: { error: error?.message || error } });
  }
};

const deleteUser = async (req, res = response) => {
  try {
    const { id } = req.params;
    const usuario = await userService.deleteUser(id);
    res.json({ ok: true, usuario });
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ ok: false, data: { error: error?.message || error } });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
