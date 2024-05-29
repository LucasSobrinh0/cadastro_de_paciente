async function carregarEstados() {
    const response = await fetch('http://127.0.0.1:8000/api/estados/');
    const estados = await response.json();
    return estados;
}
async function carregarPacientes() {
    const response = await fetch('http://127.0.0.1:8000/api/pacientes/');
    const pacientes = await response.json();

    const estados = await carregarEstados(); // Carrega os estados

    const pacientesTable = document.getElementById('pacientesTable').getElementsByTagName('tbody')[0];
    pacientesTable.innerHTML = ''; // Limpa a tabela antes de adicionar os dados

    pacientes.forEach(paciente => {
        const row = pacientesTable.insertRow();

        const cellId = row.insertCell(0);
        const cellNome = row.insertCell(1);
        const cellCpf = row.insertCell(2);
        const cellDataNascimento = row.insertCell(3);
        const cellEstado = row.insertCell(4);
        const cellTelefones = row.insertCell(5);
        const cellAcoes = row.insertCell(6); // Adicionar célula para ações

        cellId.textContent = paciente.id;
        cellNome.textContent = paciente.nome;
        cellCpf.textContent = paciente.cpf;
        cellDataNascimento.textContent = paciente.data_nascimento;
        cellEstado.textContent = estados.find(estado => estado.id === paciente.estado).sigla; // Busca a sigla do estado

        const telefonesText = paciente.telefones.map(telefone =>
            `Primário: ${telefone.telefone_primario}, Secundário: ${telefone.telefone_secundario}`
        ).join('; ');
        cellTelefones.textContent = telefonesText;

        const editarButton = document.createElement('button');
        editarButton.textContent = 'Editar';
        editarButton.dataset.pacienteId = paciente.id;
        editarButton.classList.add('btn', 'btn-primary'); // Adiciona as classes Bootstrap
        editarButton.onclick = () => editarPaciente(paciente.id); // Adicionar evento de clique
        cellAcoes.appendChild(editarButton);

        const removerButton = document.createElement('button');
        removerButton.textContent = 'Remover';
        removerButton.dataset.pacienteId = paciente.id;
        removerButton.classList.add('btn', 'btn-danger', 'mx-1'); // Adiciona as classes Bootstrap
        removerButton.onclick = () => removerPaciente(paciente.id); // Adicionar evento de clique
        cellAcoes.appendChild(removerButton);
    });
}
function editarPaciente(pacienteId) {
    window.location.href = `editar_paciente.html?id=${pacienteId}`;
}

function removerPaciente(pacienteId) {
    fetch(`http://127.0.0.1:8000/api/pacientes/${pacienteId}/excluir/`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                const row = document.querySelector(`tr[data-paciente-id="${pacienteId}"]`);
                if (row) {
                    row.remove();
                }
                alert('Paciente removido com sucesso!');
            } else {
                console.error('Erro ao remover paciente:', response);
                alert('Falha ao remover paciente. Tente novamente.');
            }
        })
        .catch(error => console.error('Erro ao remover paciente:', error));
}

window.onload = function () {
    carregarPacientes();
    carregarEstados();
};
