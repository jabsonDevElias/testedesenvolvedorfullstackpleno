const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//MODELS
const User = require("../models/User");
const Tarefas = require("../models/Tarefas");

const generateToken = (user) => {
  return jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// CADASTRO DE USUÁRIO

const cadastrausuario = async (req, res) => {
  const { email, password,nome } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const novoUsuario = await User.create({ nome,email,password: hashedPassword });
  res.json({ message: "Usuário registrado!" });
};

const listarTarefas = async (req, res) => {
  try {
    const tarefas = await Tarefas.findAll();
    res.json(tarefas);
  } catch (error) {
    console.error('Erro ao listar tarefas:', error);
    res.status(500).json({ message: 'Erro ao listar tarefas' });
  }
};

// const teste = async (req, res) => {
//    res.send("<h1>Teste de servidor</h1>");
// }

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    const token = generateToken(user);

    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports = { cadastrausuario, login,listarTarefas};
