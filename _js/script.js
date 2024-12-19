

const URL1 = "https://rickandmortyapi.com/api/character/?page=";

function retunNumRandom(){
    return (Math.random()*19+1).toFixed();
}

load();
function load(){

    let numRandom = retunNumRandom();
    let search = URL1+numRandom;

    fetch(search)
    .then((data) => data.json())
    .then((response) => {
        console.log(response)
    })
    .catch((erro) =>{
        console.log("Erro: " + erro);
    })

};