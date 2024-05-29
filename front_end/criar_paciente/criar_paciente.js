async function carregarEstados() {
    const response = await fetch('http://127.0.0.1:8000/api/estados/');
    const estados = await response.json();
    
    const selectEstado = document.getElementById('sigla_estado');
    estados.forEach(estado => {
        const option = document.createElement('option');
        option.value = estado.id;
        option.textContent = estado.sigla;
        selectEstado.appendChild(option);
    });
}

document.getElementById('pacienteForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const data_nascimento = document.getElementById('data_nascimento').value;
    const estado_id = document.getElementById('sigla_estado').value;
    const telefone_primario = document.getElementById('telefone_primario').value;
    const telefone_secundario = document.getElementById('telefone_secundario').value;

    const pacienteData = {
        nome: nome,
        cpf: cpf,
        data_nascimento: data_nascimento,
        estado: estado_id,
        telefones: [
            {
                telefone_primario: telefone_primario,
                telefone_secundario: telefone_secundario
            }
        ]
    };

    const response = await fetch('http://127.0.0.1:8000/api/pacientes/novo/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pacienteData)
    });

    if (response.ok) {
        alert('Paciente cadastrado com sucesso!');
        carregarPacientes(); // Atualiza a lista de pacientes após o cadastro
    } else {
        const errorData = await response.json();
        alert('Erro ao cadastrar paciente: ' + JSON.stringify(errorData));
    }
});

window.onload = function(){
    carregarEstados();
};
