const express = require("express");
const { cadastrausuario, login,listarTarefas,cadastraTarefas,finalizarTarefas,excluirTarefas} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/cadastrausuario", cadastrausuario);
router.post("/listarTarefas", listarTarefas);
router.post("/cadastratarefas", cadastraTarefas);
router.post("/finalizartarefas", finalizarTarefas);
router.post("/excluirtarefas", excluirTarefas);
router.post("/login", login);

module.exports = router;
