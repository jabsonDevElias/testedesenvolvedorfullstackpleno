import api from "../service/api";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function CadastraUsuario() {

  const [formData, setFormData] = useState({ nome: "", email: "", password: "" });
  const [showModalMensagem, setShowModalMensagem] = useState(false);
  const [mensagem,setMensagem] = useState("");

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/cadastrausuario", formData);
      setMensagem(response.data.message);
      setShowModalMensagem(true);
    } catch (error: any) {
      console.error("Erro ao cadastrar usuário:", error.response?.data || error.message);
      alert("Erro ao cadastrar usuário!");
    }
  };

  return (
    <div className="d-flex justify-content-end col-12 p-3 ">
      <form onSubmit={handleSubmit} className="col-12 col-md-6 m-auto border p-2 mt-5 rounded rounded-2">
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
        <button className="btn btn-primary" type="submit">
          Cadastrar
        </button>
        </div>
      </form>

      <Modal show={showModalMensagem} onHide={() => setShowModalMensagem(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Mensagem</Modal.Title>
                </Modal.Header>
                <Modal.Body>{mensagem}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => navigate("/")}>
                        OK
                    </Button>
                </Modal.Footer>
       </Modal>
    </div>
  );
}

export default CadastraUsuario;
