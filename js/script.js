

const URL1 = "https://rickandmortyapi.com/api/character/";
const URL2 = "https://rickandmortyapi.com/api/episode/";

function retunNumRandom() {
    return (Math.random() * 19 + 1).toFixed();
}

function notNull(valor) { return valor ? valor : "Unknown" }

function clearMain() { $("main").empty(); }
function clearArticle() { $("article").empty() }



load();
async function load() {

    let numRandom = retunNumRandom();
    let search = URL1 + "?page=" + numRandom;

    await fetch(search)
        .then((response) => response.json())
        .then((data) => {
            clearMain();

            const TAMANHO = data["results"].length;
            data = data["results"];

            for (let i = 0; i < TAMANHO; i++) {
                criarCards(data[i]);
            }
        })
        .catch((erro) => {
            console.log("Erro: " + erro);
        })

};



function criarCards(data) {

    let main = document.querySelector("main");


    let id = data["id"];
    let image = data["image"];
    let name = data["name"];
    let status = data["status"];
    let species = data["species"];
    let gender = data["gender"];
    let location = data["location"]["name"];

    let content = "";

    content += `<section onclick="searchId(${id})" class="card" id="${id}">
                        <img src="${image}" alt="" class="image">
                        <div class="description">
                            <p>ID: <span>${id}</span></p>
                            <p>Name: <span>${notNull(name)}</span></p>
                            <p>Status: <span>${notNull(status)}</span></p>
                            <p>Species: <span>${notNull(species)}</span></p>
                            <p>Gender: <span>${notNull(gender)}</span></p>
                            <p>Location: <span>${notNull(location)}</span></p>
                        </div>
                    </section>`;

    main.innerHTML += content;

    return;

}



async function construirCard(obj) {

    let article = document.querySelector("article");
    let content = "";

    let id = obj["id"];
    let image = obj["image"];
    let name = obj["name"];
    let status = obj["status"];
    let species = obj["species"];
    let gender = obj["gender"];
    let location = obj["location"]["name"];
    let origin = obj["origin"]["name"];
    let numEp = obj["episode"].length;

    content = `
                <button  onclick="clearArticle()" id="close">
                    <span class="material-symbols-outlined">
                    close
                    </span>
                </button>
                <div class="article-card" onclick="construirCard(this)">
                    <img src="${image}" alt="" class="article-image">
                    <div class="article-description">
                        <p>ID: <span>${id}</span></p>
                        <p>Name: <span>${notNull(name)}</span></p>
                        <p>Status: <span>${notNull(status)}</span></p>
                        <p>Species: <span>${notNull(species)}</span></p>
                        <p>Gender: <span>${notNull(gender)}</span></p>
                        <p>Location: <span>${notNull(location)}</span></p>
                        <p>Origin: <span>${notNull(origin)}</span></p>
                        <p>Participates in : <span>${numEp} episodes</span></p>
                    </div>
                </div>`;

    article.innerHTML = content;

    window.scrollTo(0, -1000);
}





async function searchId(id) {

    let search = URL1 + id;

    await fetch(search)
        .then((response) => response.json())
        .then((data) => {
            construirCard(data);
        })
        .catch((erro) => {
            console.log("Erro: " + erro);
        })

}



$(document).keypress(function (e) {
    if (e.which === 13) { getName() }
})


let searchBtn = document.getElementById("search");
searchBtn.addEventListener("click", getName);

function getName() {
    let name = document.getElementById("busca").value;
    name = name.toLowerCase();
    document.getElementById("busca").value = "";

    searchName(name);    
    searchEpisode(name);
}


async function searchName(name) {

    let search = URL1 + "?name=" + name;

    await fetch(search)
        .then((response) => response.json())
        .then((data) => {
            let id = data["results"][0]["id"];
            searchId(id);
        })
        .catch((erro) => {
            console.log("Erro: " + erro);
        })
}


async function searchEpisode(name) {
    
    let search = URL2 + "?name=" + name;

    await fetch(search)
    .then((response) => response.json())
    .then((data) => {
        
        const TAMANHO = data["results"][0]["characters"].length;
        let ep = data["results"][0]["name"];

        for(let i=0; i<TAMANHO; i++){
            let personagem = data["results"][0]["characters"][i];
            searchPersona(personagem, ep)
        }
    })
    .catch((erro) => {
        console.log("Erro: " + erro);
    })
}



async function searchPersona(persona, nameEp) {
    clearMain();
    clearArticle();

    document.querySelector("main").innerHTML = `<h2 id="numero-ep">Episode: ${nameEp}</h2>`;

    await fetch(persona)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        criarCards(data)
        return;
    })
    .catch((erro) => {
        console.log("Erro: " + erro);
    })
    
}