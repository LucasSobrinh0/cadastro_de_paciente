async function carregarEstados() {
    const response = await fetch('http://127.0.0.1:8000/api/estados/');
    const estados = await response.json();

    const selectEstado = document.getElementById('sigla_estado');
    estados.forEach(estado => {
        console.log('Estado:', estado.id, estado.sigla, estado.nome_estado);
        const option = document.createElement('option');
        option.value = estado.id;
        option.textContent = estado.sigla;
        selectEstado.appendChild(option);
    });
    
};

window.onload = async function () {
    await carregarEstados();

    const urlParams = new URLSearchParams(window.location.search);
    const pacienteId = urlParams.get('id');
    if (!pacienteId) {
        alert('ID do paciente não encontrado.');
        window.location.href = 'index.html';
        return;
    }

    fetch(`http://127.0.0.1:8000/api/pacientes/${pacienteId}/`)
    .then(response => response.json())
    .then(paciente => {
        document.getElementById('nome').value = paciente.nome;
        document.getElementById('cpf').value = paciente.cpf;
        document.getElementById('dataNascimento').value = paciente.data_nascimento;
        document.getElementById('sigla_estado').value = paciente.estado;

        const telefones = paciente.telefones;

        telefones.forEach((telefone, index) => {
            if (index === 0) {
                document.getElementById('telefone_primario').value = telefone.telefone_primario;
                document.getElementById('telefone_secundario').value = telefone.telefone_secundario;
            } else {
                const telefonePrimario = document.createElement('input');
                telefonePrimario.type = 'text';
                telefonePrimario.name = 'telefone_primario[]';
                telefonePrimario.value = telefone.telefone_primario;
                document.getElementById('editarPacienteForm').appendChild(telefonePrimario);

                const telefoneSecundario = document.createElement('input');
                telefoneSecundario.type = 'text';
                telefoneSecundario.name = 'telefone_secundario[]';
                telefoneSecundario.value = telefone.telefone_secundario;
                document.getElementById('editarPacienteForm').appendChild(telefoneSecundario);
            }
        });
    })
    .catch(error => console.error('Erro ao carregar paciente:', error));


    document.getElementById('editarPacienteForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(this);
        const pacienteData = {
            nome: formData.get('nome'),
            cpf: formData.get('cpf'),
            data_nascimento: formData.get('dataNascimento'),
            estado: formData.get('sigla_estado'), // Corrigido para pegar o ID do estado selecionado
            telefones: [
                {
                    telefone_primario: formData.get('telefone_primario'),
                    telefone_secundario: formData.get('telefone_secundario')
                }
            ]
        };

        fetch(`http://127.0.0.1:8000/api/pacientes/${pacienteId}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pacienteData)
        })
            .then(response => {
                console.log('Requisição:', JSON.stringify(pacienteData));
                if (response.ok) {
                    alert('Paciente atualizado com sucesso!');
                    window.location.href = 'index.html';
                } else {
                    console.error('Erro ao atualizar paciente:', response);
                    alert('Falha ao atualizar paciente. Tente novamente.');
                }
            })
            .catch(error => console.error('Erro ao atualizar paciente:', error));
    });
};

