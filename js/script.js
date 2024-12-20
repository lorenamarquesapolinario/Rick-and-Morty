

const URL1 = "https://rickandmortyapi.com/api/character/";

function retunNumRandom() {
    return (Math.random() * 19 + 1).toFixed();
}

function notNull(valor) { return valor ? valor : "Null" }

function clearMain() { $("main").empty(); }
function clearArticle(){ $("article").empty()}



load();
async function load() {

    let numRandom = retunNumRandom();
    let search = URL1 + "?page=" + numRandom;

    await fetch(search)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data)
            criarCards(data);
        })
        .catch((erro) => {
            console.log("Erro: " + erro);
        })

};



function criarCards(data) {

    let main = document.querySelector("main");
    clearMain();

    for (let i = 0; i < data["results"].length; i++) {
        let id = data["results"][i]["id"];
        let image = data["results"][i]["image"];
        let name = data["results"][i]["name"];
        let status = data["results"][i]["status"];
        let species = data["results"][i]["species"];
        let gender = data["results"][i]["gender"];
        let location = data["results"][i]["location"]["name"];

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

        // console.log(main);
        main.innerHTML += content;

    }
}



async function construirCard(obj) {

    let article = document.querySelector("article");
    let content = "";

    let id = obj["id"];
    let image = obj["image"];
    let name = obj["name"];
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
                        <p>Name: <span>${notNull(id)}</span></p>
                        <p>Status: <span>${notNull(name)}</span></p>
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



