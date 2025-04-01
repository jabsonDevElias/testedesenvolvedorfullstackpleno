import axios from "axios";
import { useState } from "react";


function CadastraUsuario() {

  const [formData, setFormData] = useState({ nome: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/cadastrausuario", formData);
      alert("Usuário cadastrado com sucesso!");
    } catch (error: any) {
      console.error("Erro ao cadastrar usuário:", error.response?.data || error.message);
      alert("Erro ao cadastrar usuário!");
    }
  };

  return (
    <div className="d-flex justify-content-end col-12 p-3 ">
      <form onSubmit={handleSubmit} className="col-4">
        <h3>Cadastrar Novo Usuário</h3>
        <div className="col-12 mt-3">
          <input
            type="text"
            name="nome"
            className="form-control"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleChange}
          />
        </div>
        <div className="col-12 mt-3">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="col-12 mt-3">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="col-12 mt-3">
        <button className="btn btn-outline-secondary" type="submit">
          Cadastrar
        </button>
        </div>
      </form>
    </div>
  );
}

export default CadastraUsuario;
