import api from "../service/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal, Button, Spinner } from "react-bootstrap";

function CadastraTarefas() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [showModalMensagem, setShowModalMensagem] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState("");

    const [formData, setFormData] = useState({
        nome: "",
        descricao: "",
        id: id || null,
        idUser: localStorage.getItem("authId")
    });

    useEffect(() => {
        const token = localStorage.getItem("authToken");
    
        if (!token) {
            navigate("/login");
            return;
        }
    
        setLoading(true);
    
        if (id) {
            api.post("/listartarefas", { id,idUser:localStorage.getItem("authId")})
                .then(response => {
                    if (response.data) {
                        setFormData({
                            nome: response.data.nome || "",
                            descricao: response.data.descricao || "",
                            id: id,
                            idUser:""
                        });
                        setStatus(response.data.status || "");
                    }
                })
                .catch(error => {
                    console.error("Erro ao buscar dados da API:", error);
                    if (error.response) {
                        console.error("Resposta do servidor:", error.response.data);
                    }
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [id]);
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

       api.post("/cadastratarefas", formData)
            .then((response) => {
                setMensagem(response.data.message);
                setShowModalMensagem(true);
            })
            .catch(error => console.error("Erro ao salvar tarefa:", error));
    };

    const handleFinalizar = () => {
       api.post("/finalizartarefas", { id })
            .then((response) => {
                setStatus("concluída");
                setMensagem(response.data.message);
                setShowModalMensagem(true);
            })
            .catch(error => console.error("Erro ao finalizar tarefa:", error));
    };

    const handleExcluir = () => {
       api.post("/excluirtarefas", { id })
            .then(() => {
                setShowModal(false);
                navigate("/");
            })
            .catch(error => console.error("Erro ao excluir tarefa:", error));
    };

    return (
        <div className="container">
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Carregando...</span>
                    </Spinner>
                </div>
            ) : (
                <>
                    <h1>{id ? "Editar Tarefa" : "Cadastrar Nova Tarefa"}</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="col-12 mt-2">
                            <input type="text" placeholder="Nome da Tarefa" name="nome" className="form-control"
                                value={formData.nome}
                                onChange={handleChange}
                                disabled={status === "concluída"}
                            />
                        </div>
                        <div className="col-12 mt-2">
                            <textarea className="form-control" name="descricao" placeholder="Escreva uma breve descrição da Tarefa"
                                value={formData.descricao}
                                onChange={handleChange}
                                disabled={status === "concluída"}
                            ></textarea>
                        </div>

                        {status === "concluída" ? (
                            <h3 className="mt-2 text-success fw-bold">Tarefa já foi Concluída</h3>
                        ) : (
                            <div className={`${(id) ? "col-3" : "col-2"} mt-2 d-flex justify-content-between`}>
                                <button type="submit" className="btn btn-primary">{id ? 'Atualizar' : 'Cadastrar'}</button>
                                {(id) ? <button type="button" className="btn btn-success" onClick={handleFinalizar}>Finalizar</button>: ""}
                                {(id) ? <button type="button" onClick={() => setShowModal(true)} className="btn btn-danger">Excluir</button> : ""}
                            </div>
                        )}
                    </form>
                </>
            )}

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

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza que deseja excluir esta tarefa?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleExcluir}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CadastraTarefas;
