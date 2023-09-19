const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const getUsers = async () => {
  try {
    const query = { estado: true };
    const [total, usuarios] = await Promise.all([
      User.countDocuments(query),
      User.find(query),
    ]);
    return { total, usuarios };
  } catch (error) {
    console.error(`Error al obtener los usuarios: ${error.message}`);
    throw { status: 400, msg: "Error al obtener los usuarios" };
  }
};

const createUser = async ({ nombre, correo, password, rol }) => {
  try {
    const salt = bcryptjs.genSaltSync();
    const hashedPassword = bcryptjs.hashSync(password, salt);
    const usuario = new User({ nombre, correo, password: hashedPassword, rol });
    await usuario.save();
    return usuario;
  } catch (error) {
    console.error(`Error al crear un usuario: ${error.message}`);
    throw { status: 400, msg: "Error al crear un usuario" };
  }
};

const updateUser = async (id, dataToUpdate) => {
  try {
    if (dataToUpdate.password) {
      const salt = bcryptjs.genSaltSync();
      dataToUpdate.password = bcryptjs.hashSync(dataToUpdate.password, salt);
    }

    const usuario = await User.findByIdAndUpdate(id, dataToUpdate);
    return usuario;
  } catch (error) {
    console.error(`Error al actualizar un usuario: ${error.message}`);
    throw { status: 400, msg: "Error al actualizar un usuario" };
  }
};

const deleteUser = async (id) => {
  try {
    const usuario = await User.findByIdAndUpdate(id, { estado: false });
    return usuario;
  } catch (error) {
    console.error(`Error al eliminar un usuario: ${error.message}`);
    throw { status: 400, msg: "Error al eliminar un usuario" };
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
