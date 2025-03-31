import DataTable from 'datatables.net-react';
import DT from 'datatables.net-bs5';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
import axios from 'axios';
import { useEffect, useState } from 'react';

DataTable.use(DT);

function App() {
    const [data, setData] = useState([]);

    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        axios.post('http://localhost:5000/api/listartarefas')
            .then(response => {
                setData(response.data);

                const dadosFormatados = response.data.map((item: any) => [
                    item.nome,
                    item.descricao,
                    "<span class='badge text-bg-secondary'>"+item.status+"</span>"
                ]);

                setTableData(dadosFormatados);
            })
            .catch(error => {
                console.error('Erro ao buscar dados da API:', error);
            });
    }, []);

    console.log(data);

    const options = {
        language: {
            emptyTable: "Nenhum dado disponível na tabela",
            info: "Mostrando de _START_ até _END_ de _TOTAL_ registros",
            infoEmpty: "Mostrando 0 até 0 de 0 registros",
            infoFiltered: "(filtrado de _MAX_ registros no total)",
            lengthMenu: "Mostrar _MENU_ registros",
            loadingRecords: "Carregando...",
            processing: "Processando...",
            search: "Pesquisar:",
            zeroRecords: "Nenhum registro encontrado",
            paginate: {
                // first: "Primeiro",
                // previous: "Anterior",
                // next: "Próximo",
                // last: "Último",
            },
            aria: {
                sortAscending: ": ativar para ordenar a coluna de forma ascendente",
                sortDescending: ": ativar para ordenar a coluna de forma descendente",
            },
        },
        paging: true,
        searching: true,
        info: true,
        order: [[0, 'asc']],
    };

    return (
        <div className="col-12 d-flex justify-content-between p-2">
            <div className="col-10  rounded-3 m-auto">
                <DataTable
                    data={tableData}
                    columns={[
                        { title: 'Nome' },
                        { title: 'Descrição' },
                        { title: 'Status' }
                    ]}
                    options={options}
                    className="table table-striped table-hover dataTable"
                />
            </div>
        </div>
    );
}

export default App;