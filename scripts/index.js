import imprimirCotacao from './imprimirCotacao.js'

let worker;
let workerIene;
const graficoDolar = document.getElementById('graficoDolar');
const graficoIene = document.getElementById('graficoIene');
let valor = 0;

//iniciando worker
worker = new Worker('worker.js');

//enviando mensagem pro worker do dólar
worker.postMessage('usd');

//cria um gráfico com a lib chart.js
const chart = new Chart(graficoDolar, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Dolar',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 198, 192)',
            tension: 0.1
        }]
    }
});

//captar horário da atualização do valor da moeda
function geraHorario() {
    let data = new Date();
    let horario = data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
    return horario;
}

//quando receber uma mensagem do worker
worker.addEventListener("message", event => {
    let tempo = geraHorario(event);
    valor = event.data.ask;
    imprimirCotacao("dolar", valor)
    addData(chart, tempo, valor);
})

//adiciona data pra atualizar o grafico
function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

/* -------------------------------------------------------------------------------------*/

//cria gráfico do iene
const chartIene = new Chart(graficoIene, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Iene',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 100, 192)',
            tension: 0.1
        }]
    }
});

//cria worker pro iene
workerIene = new Worker("workerIene.js");
workerIene.postMessage('iene');

//quando recebe mensagem do worker
workerIene.addEventListener("message", event => {
    let tempo = geraHorario();
    valor = event.data.ask;
    imprimirCotacao("iene", valor);
    addData(chartIene, tempo, valor);
})

