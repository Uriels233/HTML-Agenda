const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

function criarMeses(meses) 
{
    const tbody = document.querySelector("#div-table table tbody");

    for (const mes of meses) 
    {
        const linha = document.createElement("tr");
        const dadoLinha = document.createElement("td");

        dadoLinha.textContent = mes;

        linha.appendChild(dadoLinha);
        tbody.appendChild(linha);
    }
}

function criarCalendario(numeroMes) {}

function abrirMes(linha, numeroMes) {}

criarMeses(meses);