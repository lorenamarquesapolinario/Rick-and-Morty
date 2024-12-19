

const URL1 = "https://rickandmortyapi.com/api/character/?page=";

function retunNumRandom() {
    return (Math.random() * 19 + 1).toFixed();
}

load();
async function load() {

    let numRandom = retunNumRandom();
    let search = URL1 + numRandom;

    await fetch(search)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            criarCards(data);
        })
        .catch((erro) => {
            console.log("Erro: " + erro);
        })

};



function criarCards(data) {

    let main = document.querySelector("main");
    // main.remove();

    for (let i = 0; i < data["results"].length; i++) {
        let id = data["results"][i]["id"];
        let image = data["results"][i]["image"];
        let name = data["results"][i]["name"];
        let status = data["results"][i]["status"];
        let species = data["results"][i]["species"];
        let gender = data["results"][i]["gender"];
        let location = data["results"][i]["location"]["name"];

        let content = "";

        content += `<section class="card">
                        <img src="${image}" alt="" class="image">
                        <div class="description">
                            <p>sndisb</p>
                            <p>sndisb</p>
                            <p>sndisb</p>
                            <p>sndisb</p>
                        </div>
                    </section>`;

        console.log(main)
        main.innerHTML += content;

       
    }
}