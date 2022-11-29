let worker;
let moeda = 'usd';
const ctx = document.getElementById('myChart');
const botao = document.getElementById('meuBotao');
let data = [];
let label = [];
let valores = []
let soma = 0;
let valor = 0;

const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Dólar',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    }
});

worker = new Worker("worker.js");
worker.postMessage(moeda);

worker.addEventListener("message", event => {
    let data = new Date(event.data.create_date);
    let horario = data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
    valor = event.data.ask;
    addData(chart, horario, valor);
})

botao.addEventListener("click", () => {
    valores.push(valor);

    soma += parseFloat(valor);
    console.log(soma);
    addInvestimentos();
})

function addData(chart, label, data) {

    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

function addInvestimentos() {
    const lista = document.getElementById('listaInvestimentos');
    const valorGasto = document.getElementById('valorGasto');
    const itemLista = document.createElement('li');

    valores.forEach(elemento => {
        itemLista.innerHTML = elemento;
        lista.appendChild(itemLista);
    })

    valorGasto.innerHTML = soma;
}