//  Variáveis de controle 
const LINK_API = "https://mock-api.driven.com.br/api/v4/buzzquizz/";

//Pegando os quizes do servidor e imprimindo (chamar a função para ela funcionar)
function pegarQuizzesDoServidor() {
    const promessa = axios.get(`${LINK_API}quizzes`);
    promessa.then((respostaServidor) => {
        CriarEstruturaHTML(respostaServidor);
    });
    //criar função para o catch?
};

//mudar a estrutura do html, essa estrutura é para testes

function CriarEstruturaHTML(respostaServidor) {
    const ul = document.querySelector("ul");
    ul.innerHTML = "";
    for (i = 0; i < respostaServidor.data.length; i++) {
        ul.innerHTML += `<p>${respostaServidor.data[i].title}</p>
        <img src="${respostaServidor.data[i].image}" alt="${respostaServidor.data[i].image}">`
    }
}

//criação de quizzes
/* let quizCriado = {
    title: '',
    image: '',
    questions: [],
    levels: []
};

const requisicao = axios.post(`${LINK_API}quizzes`, quizCriado);
requisicao.then(criarQuiz);

function criarQuiz (respostaServidor2){
    console.log(respostaServidor2);
} */


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