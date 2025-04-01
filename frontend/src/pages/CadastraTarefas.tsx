import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal, Button, Spinner } from "react-bootstrap";

function CadastraTarefas() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const [formData, setFormData] = useState({ nome: "", descricao: "", id: id || null });
    const [status, setStatus] = useState();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (id) {
            axios.post("http://localhost:5000/api/listartarefas", { id })
                .then(response => {
                    if (response.data) {
                        setFormData({
                            nome: response.data.nome || "",
                            descricao: response.data.descricao || "",
                            id: id
                        });
                        setStatus(response.data.status);
                    }
                })
                .catch(error => {
                    console.error("Erro ao buscar dados da API:", error);
                })
                .finally(() => {
                    setLoading(false); // Esconde o spinner após carregar os dados
                });
        } else {
            setLoading(false); // Se não for edição, esconde o spinner imediatamente
        }
    }, [id]);

    function retornarBotoes(status: any) {
        if (status === "concluída") {
            return <h3 className="mt-2 text-success fw-bold">Tarefa já foi Concluída</h3>;
        } else {
            return (
                <div className="col-3 mt-2 d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">{id ? 'Atualizar' : 'Cadastrar'}</button>
                    <button type="button" className="btn btn-success">Finalizar</button>
                    <button type="button" onClick={handleShow} className="btn btn-danger">Excluir</button>
                </div>
            );
        }
    }

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
                    <form onSubmit={(e) => e.preventDefault()}>
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
                        {retornarBotoes(status)}
                    </form>
                </>
            )}

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza que deseja excluir esta tarefa?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="danger">
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CadastraTarefas;
