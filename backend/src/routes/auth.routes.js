const express = require("express");
const { cadastrausuario, login,listarTarefas} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/cadastrausuario", cadastrausuario);
router.post("/listarTarefas", listarTarefas);
router.post("/login", login);

module.exports = router;
