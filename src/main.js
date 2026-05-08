const meses = [
  "Janeiro", "Fevereiro", "Março", 
  "Abril",   "Maio",      "Junho", 
];

const diasDaSemana = ["D", "S", "T", "Q", "Q", "S", "S"];

const tdMeses = document.querySelectorAll(".mes");

tdMeses.forEach((td) => {
    td.addEventListener('click', () => {
        const dateMes = Number(td.getAttribute("data-mes"));

        criarCalendario(td, dateMes);
    });
});

function criarCalendario(elementoMes, numeroMes) 
{
    const calendario = document.querySelector(".div-table-mes");

    if (calendario)
    {
        calendario.remove();
        return;
    }

    const qtdDiasMes = new Date(2026, numeroMes + 1, 0).getDate();

    const divTable = document.createElement("div");
    divTable.classList.add("div-table-mes");

    const table = document.createElement("table");

    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    
    let tr = document.createElement("tr");

    diasDaSemana.forEach((dia) => {
        const th = document.createElement("th");
        th.textContent = dia;

        tr.appendChild(th);
    });

    thead.appendChild(tr);
    table.appendChild(thead);

    tr = document.createElement("tr");

    for (let i=1; i<=qtdDiasMes; i++)
    {
        if ((i-1) % 7 === 0 && i !== 1) 
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

    const trMes = elementoMes.parentElement;

    const trCalendario = document.createElement("tr");
    trCalendario.classList.add("linha-calendario");

    const tdCalendario = document.createElement("td");
    tdCalendario.colSpan = 1;

    tdCalendario.appendChild(divTable);
    trCalendario.appendChild(tdCalendario);

    trMes.insertAdjacentElement("afterend", trCalendario);
}

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