//  Variáveis de controle 
const LINK_API = "https://mock-api.driven.com.br/api/v4/buzzquizz/";

//Pegando os quizes do servidor e imprimindo
function pegarQuizzesDoServidor() {
    const promessa = axios.get(`${LINK_API}quizzes`);
    promessa.then((respostaServidor) => {
        CriarEstruturaHTML(respostaServidor);
    });
    promessa.catch();
};

window.onload = pegarQuizzesDoServidor();

//mudar a estrutura do html
function CriarEstruturaHTML(respostaServidor) {
    console.log(respostaServidor);
    const section = document.querySelector("section");
    section.innerHTML = "";
    for (i = 0; i < respostaServidor.data.length; i++) {
        section.innerHTML += `
        <article onclick="abrirTela2(this)">
        <img class="img-tela-1" src="${respostaServidor.data[i].image}" alt="${respostaServidor.data[i].image}">
        <p class="titulo-quiz-tela-1">${respostaServidor.data[i].title}</p>
        </article>`
    }
}

//criação de quizzes

let objQuizz = {
    title: '',
    image: '',
    questions: [],
    levels: []
};

function receberInput (){
    let titulo = document.getElementById("tituloQuizz").value;
    let img = document.getElementById("imgQuiz").value;
    let qtdePerguntas = document.getElementById("qtdePerguntasQuizz").value;
    let niveis = document.getElementById("niveisQuizz").value;
    objQuizz.title = titulo;
    objQuizz.image = img;
    objQuizz.questions.length = qtdePerguntas;
    objQuizz.levels.length = niveis;
    validacaoDeQuizzes();
}

function validacaoDeQuizzes(){
    let i = 0;
    if (objQuizz.title.length >= 20 && objQuizz.title.length <= 65){
        i++;
    }else{
        alert("Nome inválido! O nome do quizz deve ter no mínimo 20 e no máximo 65 caracteres.");
    }
    if (objQuizz.image.includes('.gif') || objQuizz.image.includes('.jpeg') && objQuizz.image.includes('https://')){
        i++;
    }else {
        alert("Link inválido! O link deve conter uma imagem JPEG ou um GIF.");
    }
    if (objQuizz.questions.length >= 3){
        i++
    }else {
        alert("Número de perguntas inválido! O número mínimo são 3 perguntas.");
    }
    if (objQuizz.levels.length >= 2){
        i++
    }else{
        alert("Número de níveis inválido! O número mínimo são 2 níveis.");
    }
    if (i === 4){
        abrirTela3_2();
    }
}


//mudança de telas
function abrirTela2(quizEscolhido) {
    const tela1 = document.querySelector(".tela-1");
    tela1.classList.add("off");

    const tela2 = document.querySelector(".tela-2");
    tela2.classList.add("on")
}

function abrirTela3() {
    const tela1 = document.querySelector(".tela-1");
    tela1.classList.add("off");

    const tela3 = document.querySelector(".tela-3");
    tela3.classList.add("on")
}

function abrirTela3_2() {
    const tela3 = document.querySelector(".tela-3");
    tela3.classList.add("off");

    const tela3_2 = document.querySelector(".tela-3-2");
    tela3_2.classList.add("on")
}

function abrirTela3_3() {
    const tela3_2 = document.querySelector(".tela-3-2");
    tela3_2.classList.add("off");

    const tela3_3 = document.querySelector(".tela-3-3");
    tela3_3.classList.add("on")
}


function abrirTela3_4() {
    const tela3_3 = document.querySelector(".tela-3-3");
    tela3_3.classList.add("off");

    const tela3_4 = document.querySelector(".tela-3-4");
    tela3_4.classList.add("on")
}

function voltarHome() {
    const tela3_4 = document.querySelector(".tela-3-4");
    tela3_4.classList.add("off");

    const tela1 = document.querySelector(".tela-1");
    tela1.classList.remove("off")
}