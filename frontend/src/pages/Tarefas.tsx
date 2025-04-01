import DataTable from 'datatables.net-react';
import DT from 'datatables.net-bs5';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';

import Carrossel from '../components/Carrossel';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

DataTable.use(DT);

function Tarefas() {

    const [data, setData] = useState<any[]>([]);
    const [tableData, setTableData] = useState<any[]>([]);
    const [statusFiltro, setStatusFiltro] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.post('http://localhost:5000/api/listartarefas')
            .then(response => {
                setData(response.data);
                atualizarTabela(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar dados da API:', error);
            });
            
    }, []);

    const atualizarTabela = (dados: any[]) => {
        const dadosFiltrados = statusFiltro ? dados.filter(tarefa => tarefa.status === statusFiltro) : dados;

        const dadosFormatados = dadosFiltrados.map((item: any) => [
            item.id,
            item.nome,
            `<span class='badge ${(item.status === 'concluída') ? "text-bg-success" : "text-bg-warning"}'>${item.status}</span>`,
            `<a href='/cadastratarefas/${item.id}' class='btn btn-primary btn-sm'>Editar</a>`
        ]);

        setTableData(dadosFormatados);
    };

    useEffect(() => {
        atualizarTabela(data);
    }, [statusFiltro]);

    const options = {
        language: {
            emptyTable: "Nenhum dado disponível na tabela",
            info: "Mostrando de _START_ até _END_ de _TOTAL_ registros",
            infoEmpty: "Mostrando 0 até 0 de 0 registros",
            infoFiltered: "(filtrado de _MAX_ registros no total)",
            lengthMenu: "",
            loadingRecords: "Carregando...",
            processing: "Processando...",
            search: "Pesquisar:",
            zeroRecords: "Nenhum registro encontrado",
            paginate: {},
            aria: {
                sortAscending: ": ativar para ordenar a coluna de forma ascendente",
                sortDescending: ": ativar para ordenar a coluna de forma descendente",
            },
        },
        paging: true,
        searching: true,
        info: true,
        order: [[0, 'asc']],
        responsive: true,
        columnDefs: [
            {
                targets: -1,
                className: 'dt-body-center'
            },
        ],
        rowCallback: function (row: Node, data: any) {
            row.addEventListener("click", function () {
                const id = data[0];
                navigate(`/cadastratarefas/${id}`);
            });
        },
        createdRow: function (row: Node) {
            (row as HTMLElement).style.cursor = "pointer";
        },
    };

    return (
        <div className="col-12 d-flex flex-wrap justify-content-between pt-2 pb-2">
            <div className="col-10 m-auto mt-2 mb-2 d-flex justify-content-end flex-wrap">
            <div className="col-12">
                <h1>Bem-Vindo, Jabson!</h1>
            </div>
            <Carrossel/>
                <div className="col-12 col-md-3 d-flex justify-content-between mt-5">
                <select
                    className="form-select d-inline w-auto"
                    value={statusFiltro}
                    onChange={(e) => setStatusFiltro(e.target.value)}
                >
                    <option value="">Todos</option>
                    <option value="pendente">Pendente</option>
                    <option value="concluída">Concluída</option>
                </select>
                <a href='/cadastratarefas' className='btn btn-primary'>Adicionar Tarefa</a>
                </div>
            </div>

            <div className="col-12 col-md-10 rounded-3 m-auto border border-1 p-3 p-md-0">
                <DataTable
                    data={tableData}
                    columns={[
                        { title: 'Id' },
                        { title: 'Nome' },
                        { title: 'Status' }
                    ]}
                    options={options}
                    className="table-responsive table table-hover col-12"
                />
            </div>
        </div>
    );
}

export default Tarefas;
