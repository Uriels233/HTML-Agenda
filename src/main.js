const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril", 
  "Maio", "Junho", "Julho"
];

const tdMeses = document.querySelectorAll(".mes");

function criarCalendario(numeroMes) 
{
    const qtdDiasMes = new Date(2026, numeroMes + 1, 0).getDate();

    const divTable = document.createElement("div");
    divTable.id = "div-table-mes";

    const table = document.createElement("table");

    const tbody = document.createElement("tbody");
    
    let tr = document.createElement("tr");

    for (let i=1; i<=qtdDiasMes; i++)
    {
        if (i==7) 
        {
            tr = document.createElement("tr");
            tbody.appendChild(tr);
        }      
        
        const td = document.createElement("td");
        td.textContent = i;
        tr.appendChild(td);
    }

    tbody.appendChild(tr);
    table.appendChild(tbody);
    divTable.appendChild(table);
    tdMes.appendChild(divTable);
}

function abrirMes(linha, numeroMes) 
{}

criarMeses(meses);

/*
const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho"
];

const tdMeses = document.querySelectorAll(".mes");

tdMeses.forEach((td) => {
    td.addEventListener("click", () => {
        const numeroMes = Number(td.dataset.mes);

        criarCalendario(td, numeroMes);
    });
});

function criarCalendario(elementoMes, numeroMes)
{
    const calendarioExistente = elementoMes.querySelector(".div-table-mes");

    if (calendarioExistente)
    {
        calendarioExistente.remove();
        return;
    }

    const qtdDiasMes = new Date(2026, numeroMes + 1, 0).getDate();

    const divTable = document.createElement("div");
    divTable.classList.add("div-table-mes");

    const table = document.createElement("table");
    const tbody = document.createElement("tbody");

    let tr = document.createElement("tr");

    for (let i = 1; i <= qtdDiasMes; i++)
    {
        if ((i - 1) % 7 === 0 && i !== 1)
        {
            tbody.appendChild(tr);
            tr = document.createElement("tr");
        }

        const td = document.createElement("td");
        td.textContent = i;

        tr.appendChild(td);
    }

    tbody.appendChild(tr);

    table.appendChild(tbody);
    divTable.appendChild(table);

    elementoMes.appendChild(divTable);
}
*/