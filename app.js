const API_KEY = '925ea8d7e2104c3a975e5de3b7c29bcd';

const sourceUrl = `https://newsapi.org/v2/sources?apiKey=${API_KEY}`;

const main = document.querySelector('main');
const sourceSelector = document.querySelector('#sourceSelector');

const defaultSource = 'the-washington-post';


window.addEventListener('load', async e => {
    updateNews();
    await updateSources();
    sourceSelector.value = defaultSource;

    // register service worker
    if('serviceWorker' in navigator){
        try{
            navigator.serviceWorker.register('sw.js');
            console.log('SW registered')
        }
        catch(error) {
            console.log('SW reg failed')
        }
    }
})

sourceSelector.addEventListener('change', e => {
    updateNews(e.target.value);
})

const updateNews = async (src = defaultSource) => {
    const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=${src}&apiKey=${API_KEY}`);
    const json = await res.json();

    main.innerHTML = json.articles.map(createArticle).join('\n');
}

const updateSources = async () => {
    const res = await fetch(sourceUrl);
    const json = await res.json();

    sourceSelector.innerHTML = json.sources.map(src => 
        `
            <option value="${src.id}">${src.name}</option>
        `
        ).join('\n');
}

function createArticle(a){
    return `
    <div class="article">
        <a href="${a.url}" target="blank">
            <h2>${a.title}</h2>
            <img src="${a.urlToImage}" />
            <p>${a.description}</p>
        </a>
    </div>
    `
}
