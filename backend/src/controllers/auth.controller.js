const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//MODELS
const User = require("../models/User");
const Tarefas = require("../models/Tarefas");
const { Op } = require("sequelize");

const generateToken = (user) => {
  return jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// CADASTRO DE USUÁRIO

const cadastrausuario = async (req, res) => {
  const { email, password,nome } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const novoUsuario = await User.create({ nome,email,password: hashedPassword });
  res.json({ message: "Usuário registrado com Sucesso!" });
};

// LISTAGEM DE TAREFAS

const listarTarefas = async (req, res) => {
  try {
    const { id,idUser } = req.body;

    if (id) {
      const tarefa = await Tarefas.findByPk(id);

      if (!tarefa) {
        return res.status(404).json({ message: "Tarefa não encontrada" });
      }

      return res.json(tarefa);
    }

    const tarefas = await Tarefas.findAll({
      where: { status: { [Op.ne]: "inativo" },idUser: idUser}
    });
    res.json(tarefas);

  } catch (error) {
    console.error("Erro ao listar tarefas:", error);
    res.status(500).json({ message: "Erro ao listar tarefas" });
  }
};

// CADASTRO DE TAREFAS

const cadastraTarefas = async (req, res) => {

  const {descricao,nome,id,idUser} = req.body;
  const status = "pendente";
  if(id){
    const tarefa = await Tarefas.findByPk(id);
    await tarefa.update({ nome,descricao,status });
    res.json({ message: "Tarefa Atualizada com Sucesso!" });
  }else{
    const novaTarefa= await Tarefas.create({ nome,descricao,idUser,status });
    res.json({ message: "Tarefa registrada com Sucesso!" });
  }  
};

// FINALIZAR DE TAREFAS

const finalizarTarefas = async (req, res) => {
  const {id} = req.body;
  const status = "concluída";

  if(id > 0){
    const tarefa = await Tarefas.findByPk(id);
    await tarefa.update({ status });
    res.json({ message: "Tarefa Finalizada com Sucesso!" });
  }else{
    res.json({ message: "Não foi encontrado ID!" });
  }  
};

// EXCLUIR TAREFAS

const excluirTarefas = async (req, res) => {
  const {id} = req.body;
  const status = "inativo";

  if(id > 0){
    const tarefa = await Tarefas.findByPk(id);
    await tarefa.update({ status });
    res.json({ message: "Tarefa Excluida!" });
  }else{
    res.json({ message: "Não foi encontrado ID!" });
  }  
};

// LOGIN
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

    res.json({ token, user: { id: user.id, email: user.email,nome: user.nome } });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports = { cadastrausuario, login, listarTarefas, cadastraTarefas,finalizarTarefas,excluirTarefas};
