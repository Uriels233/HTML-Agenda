const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"];

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

let mesAtual = null;
let diaAtual = null;

const telaMeses      = document.getElementById("tela-meses");
const telaDias       = document.getElementById("tela-dias");
const telaDia        = document.getElementById("tela-dia");
const telaFormulario = document.getElementById("tela-formulario");

const listaMeses     = document.getElementById("lista-meses");
const listaDias      = document.getElementById("lista-dias");
const horarios       = document.getElementById("horarios");

const tituloMes      = document.getElementById("titulo-mes");
const tituloDia      = document.getElementById("titulo-dia");

function mostrarTela(tela) 
{
    telaMeses.classList.add("escondido");
    telaDias.classList.add("escondido");
    telaDia.classList.add("escondido");
    telaFormulario.classList.add("escondido");

    tela.classList.remove("escondido");
}

function converterHorarioParaMinutos(horario)
{
    const partes = horario.split(":");

    const hora = parseInt(partes[0]);
    const minuto = parseInt(partes[1]);

    return (hora * 60) + minuto;
}

function existeSobreposicao(inicioNovo, fimNovo)
{
    return tarefas.some(function (tarefa)
    {
        if (
            tarefa.mes === mesAtual &&
            tarefa.dia === diaAtual
        )
        {
            return (
                inicioNovo < tarefa.fimMinutos &&
                fimNovo > tarefa.inicioMinutos
            );
        }

        return false;
    });
}

function carregarMeses() 
{
    listaMeses.innerHTML = "";

    meses.forEach((mes, indice) => {

        const botao = document.createElement("button");
        botao.textContent = mes;

        botao.addEventListener("click", function () {

            mesAtual = indice + 1;

            carregarDias();

            mostrarTela(telaDias);
        });

        listaMeses.appendChild(botao);
    });
}

function carregarDias() 
{
    listaDias.innerHTML = "";

    tituloMes.textContent = meses[mesAtual - 1];

    const quantidadeDias = new Date(2026, mesAtual, 0).getDate();

    for (let i = 1; i <= quantidadeDias; i++) 
    {
        const botao = document.createElement("button");

        botao.textContent = i;

        const temEvento = tarefas.some(function (tarefa) {

            return tarefa.mes === mesAtual && tarefa.dia === i;
        });

        if (temEvento)
            botao.classList.add("dia-com-evento");

        botao.addEventListener("click", function () {

            diaAtual = i;

            carregarHorarios();

            mostrarTela(telaDia);
        });

        listaDias.appendChild(botao);
    }
}

function carregarHorarios() 
{
    horarios.innerHTML = "";

    tituloDia.textContent = "Dia " + diaAtual;

    for (let i = 0; i < 24; i++) 
    {
        const bloco = document.createElement("div");

        bloco.classList.add("horario");

        let textoHora = i < 10 ? "0" + i : i;

        bloco.textContent = textoHora + ":00";

        tarefas.forEach(function (tarefa) {

            if (
                tarefa.mes === mesAtual &&
                tarefa.dia === diaAtual &&
                parseInt(tarefa.inicio.split(":")[0]) === i
            ) {
                const evento = document.createElement("div");

                evento.classList.add("evento");

                evento.innerHTML = `
                    ${tarefa.inicio} - ${tarefa.titulo}
                    <button class="btn-excluir">X</button>
                `;

                const botaoExcluir = evento.querySelector(".btn-excluir");

                botaoExcluir.addEventListener("click", function ()
                {
                    tarefas = tarefas.filter(function (t)
                    {
                        return t !== tarefa;
                    });

                    localStorage.setItem("tarefas", JSON.stringify(tarefas));

                    carregarDias();
                    carregarHorarios();
                });

                bloco.appendChild(evento);
            }
        });

        horarios.appendChild(bloco);
    }
}

document.getElementById("voltar-meses").addEventListener("click", function () {

    mostrarTela(telaMeses);
});

document.getElementById("voltar-dias").addEventListener("click", function () {

    mostrarTela(telaDias);
});

document.getElementById("voltar-dia").addEventListener("click", function () {

    mostrarTela(telaDia);
});

document.getElementById("abrir-formulario").addEventListener("click", function () {

    mostrarTela(telaFormulario);
});

document.getElementById("formulario").addEventListener("submit", function (e) {

    e.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const local  = document.getElementById("local").value;
    const inicio = document.getElementById("inicio").value;
    const fim    = document.getElementById("fim").value;
    const obs    = document.getElementById("obs").value;

    const inicioMinutos = converterHorarioParaMinutos(inicio);
    const fimMinutos = converterHorarioParaMinutos(fim);

    if (inicioMinutos >= fimMinutos)
    {
        alert("O horário final deve ser maior que o inicial.");
        return;
    }

    if (existeSobreposicao(inicioMinutos, fimMinutos))
    {
        alert("Já existe uma tarefa nesse horário.");
        return;
    }

    tarefas.push({
        mes: mesAtual,
        dia: diaAtual,
        titulo: titulo,
        local: local,
        inicio: inicio,
        fim: fim,
        inicioMinutos: inicioMinutos,
        fimMinutos: fimMinutos,
        obs: obs
    });

    tarefas.sort(function (a, b)
    {
        return a.inicioMinutos - b.inicioMinutos;
    });

    localStorage.setItem("tarefas", JSON.stringify(tarefas));

    document.getElementById("formulario").reset();

    carregarDias();

    carregarHorarios();

    mostrarTela(telaDia);
});

carregarMeses();