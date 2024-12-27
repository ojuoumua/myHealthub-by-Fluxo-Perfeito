$(document).ready(function () {
    if (localStorage.isLogged != 'true') { window.location.replace('index.html') }
    $('#marcarConsultaForm').on('submit', function(e) {
        e.preventDefault();

        // Obter os valores do formulário
        const especialidade = $('#especialidade').val();
        const medico = $('#medico').val();
        const dataConsulta = $('#dataConsulta').val();
        const horarioConsulta = $('#horarioConsulta').val();

        // Verificação básica (campos obrigatórios)
        if (!especialidade || !medico || !dataConsulta || !horarioConsulta) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Simulação de confirmação
        $('#successMessage').removeClass('d-none');
        
        // Limpar o formulário após a confirmação
        $('#marcarConsultaForm')[0].reset();
    });
    
})