const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'; //Um endpoint de um web service é a URL onde seu serviço pode ser acessado por uma aplicação cliente. Uma API é um conjunto de rotinas, protocolos e ferramentas para construir aplicações.

const cities = [];
fetch(endpoint)
    .then(blob => blob.json()) //JSON Blob foi criado para ajudar a paralelizar o cliente
    .then(data => cities.push(...data));

function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        //aqui precisamos descobrir se a cidade ou estado corresponde ao que foi pesquisado
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex)
    });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi');
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
        return `
            <li>
                <span class='name'>${cityName}, ${stateName}</span>
                <span class='population'>${numberWithCommas(place.population)}</span>
            </li>`;
    }).join('');
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);