//  Variáveis de controle 
const LINK_API = "https://mock-api.driven.com.br/api/v4/buzzquizz/";
let id = 0;

/* Pegando os quizes do servidor e imprimindo */
const promessa = axios.get(`${LINK_API}quizzes`);
promessa.then(CriarEstruturaHTML);
//criar função para o catch?

//mudar a estrutura do html, essa estrutura é para testes

function CriarEstruturaHTML(respostaServidor) {
    // console.log(respostaServidor);
    const section = document.querySelector("section");
    section.innerHTML = "";
    for (i = 0; i < respostaServidor.data.length; i++){
        id++
        section.innerHTML += `
        <article id="${id}" onclick="abrirTela2(this)">
            <img class="img-tela-1" src="${respostaServidor.data[i].image}" alt="${respostaServidor.data[i].image}">
            <p class="titulo-quiz-tela-1">${respostaServidor.data[i].title}</p>
        </article>`
     }
 }
//  tentando transformar o codigo acima em arrow function


//Pegando os quizes do servidor e imprimindo
function pegarQuizzesDoServidor() {
    const promessa = axios.get(`${LINK_API}quizzes`);
    promessa.then((respostaServidor) => {
        CriarEstruturaHTML(respostaServidor);
    });
    promessa.catch();
};

// INCOMPLETO
function acessarQuizz() {
    let promessa = axios.get(`${LINK_API}quizzes/${id}`);
    promessa.then(respostaServidor => {
        // console.log(respostaServidor.data);
    })
}

window.onload = pegarQuizzesDoServidor();

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
    if (objQuizz.image.includes('.gif') || objQuizz.image.includes('.jpeg') || objQuizz.image.includes('.jpg') && objQuizz.image.includes('https://')){
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
        // CONSTRUÇÃO TELA 3.2 HTML
        const questions = document.querySelector(".perguntas");
        for(let i = 0; i < objQuizz.questions.length; i++) {
        questions.innerHTML += `
        <div class="pergunta-tela-3-2">
            <span>Pergunta ${i+1}</span>
            <input id="tituloPergunta" type="text" placeholder="Texto da pergunta">
            <input id="corPergunta" type="text" placeholder="Cor de fundo da pergunta">                
        </div>

        <div class="resposta-correta">
            <span>Resposta correta</span>
            <input id="resposta" type="text" placeholder="Resposta correta">
            <input id="imgResposta" type="text" placeholder="URL da imagem">
        </div>
        
        <span>Respostas incorretas</span>
        <div class="resposta-incorreta">
            <input id="resposta" type="text" placeholder="Resposta incorreta ${i+1}">
            <input id="imgResposta" type="text" placeholder="URL da imagem ${i+1}">
        </div>`
        }

        // TENTANDO REPETIR A RESPOSTA INCORRETA EM TODAS AS PERGUNTAS
        const respostasIncorretas = document.querySelector(".resposta-incorreta");
        for(let j = 0; j < objQuizz.questions.length - 2; j++){
        respostasIncorretas.innerHTML += `
        <input id="resposta" type="text" placeholder="Resposta incorreta ${j+2}">
        <input id="imgResposta" type="text" placeholder="URL da imagem ${j+2}">
        `    
        }
        // objQuizz.questions = [];
    }
}

function validacaoCor(cor) {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i.test(cor);
}

function validacaoURL(url) {
    return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
}

// INCOMPLETO (COMO VALIDAR EM TODAS AS PERGUNTAS???)
function validacaoPerguntas() {
let tituloPergunta = document.getElementById('tituloPergunta').value;
let corPergunta = document.getElementById("corPergunta").value;
let resposta = document.getElementById("resposta").value;
let imgResposta = document.getElementById("imgResposta").value;


let i = 0;
    if (tituloPergunta.length >= 20) {
        i++
    }else{
        alert("O titulo da pergunta deve ter no minimo 20 caracteres!")
    }

    if (validacaoCor(corPergunta)) {
        i++
    }else{
        alert("A cor deve ser escrita em formato Hexadecimal.")
    }

    if (resposta !== ''){
        i++
    }else{
        alert("O texto da resposta não pode estar vazio!")
    }

    if (validacaoURL(imgResposta)){
        i++
    }else{
        alert("A imagem deve estar em link URL!")
    }
    if (i === 4){
        abrirTela3_3();
    }
}






// //selecionando resposta tela 2
function selecionarOpcao(opcao) {
    opcao.style.opacity = "0.3"
    // console.log(opcao)
}

//mudança de telas

function abrirTela2(quizEscolhido) {
    const tela1 = document.querySelector(".tela-1");
    const tela2 = document.querySelector(".tela-2");
    tela1.classList.add("off");
    tela2.classList.remove("off");

    // console.log(quizEscolhido);
    acessarQuizz();
}

function abrirTela3() {
    const tela1 = document.querySelector(".tela-1");
    const tela3 = document.querySelector(".tela-3");
    tela1.classList.add("off");
    tela3.classList.remove("off")
}

function abrirTela3_2() {
    const tela3 = document.querySelector(".tela-3");
    const tela3_2 = document.querySelector(".tela-3-2");
    tela3.classList.add("off");
    tela3_2.classList.remove("off")
}

function abrirTela3_3() {
    const tela3_2 = document.querySelector(".tela-3-2");
    const tela3_3 = document.querySelector(".tela-3-3");
    tela3_2.classList.add("off");
    tela3_3.classList.remove("off")
}


function abrirTela3_4() {
    const tela3_3 = document.querySelector(".tela-3-3");
    const tela3_4 = document.querySelector(".tela-3-4");
    tela3_3.classList.add("off");
    tela3_4.classList.remove("off")
}

function voltarHome() {
    const tela3_4 = document.querySelector(".tela-3-4");
    const tela1 = document.querySelector(".tela-1");
    tela3_4.classList.add("off");
    tela1.classList.remove("off");
}

