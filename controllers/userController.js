const User = require("../models/user");

const getUsers = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, usuarios] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    ok: true,
    total,
    usuarios,
  });
};

const createUser = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new User({ nombre, correo, password, rol });

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // Guardar en BD
  await usuario.save();

  res.json({
    ok: true,
    usuario,
  });
};

const updateUser = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  if (password) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await User.findByIdAndUpdate(id, resto);

  res.json({
    ok: true,
    usuario,
  });
};

const deleteUser = async (req, res = response) => {
  const { id } = req.params;
  const usuario = await User.findByIdAndUpdate(id, { estado: false });

  res.json({ ok: true, usuario });
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
