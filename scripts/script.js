//  Variáveis de controle 
const LINK_API = "https://mock-api.driven.com.br/api/v4/buzzquizz/";
let id = null;
let infos;

let objQuizz = {
    title: '',
    image: '',
    questions: [],
    levels: []
};

let questions = [];

/* Pegando os quizes do servidor e imprimindo */
const promessa = axios.get(`${LINK_API}quizzes`);
promessa.then(criarEstruturaHTML);
promessa.catch();

//mudar a estrutura do html
function criarEstruturaHTML(respostaServidor) {
    //console.log(respostaServidor);
    const section = document.querySelector("section");
    section.innerHTML += "";
    for (i = 0; i < respostaServidor.data.length; i++) {
        //id++
        section.innerHTML += `
        <article onclick="acessarQuizz(this)" id="${respostaServidor.data[i].id}">
            <img class="img-tela-1" src="${respostaServidor.data[i].image}" alt="${respostaServidor.data[i].title}">
            <p class="titulo-quiz-tela-1">${respostaServidor.data[i].title}</p>
        </article>`
    }
}


// INCOMPLETO
function acessarQuizz(quizEscolhido) {
    id = quizEscolhido.id;
    console.log(id)
    console.log(quizEscolhido)

    const quiz = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`);
    quiz.then(abrirTela2);
}


//criação de quizzes
function receberInputTela3_1() {
    let titulo = document.getElementById("tituloQuizz").value;
    let img = document.getElementById("imgQuiz").value;
    let qtdePerguntas = document.getElementById("qtdePerguntasQuizz").value;
    let niveis = document.getElementById("niveisQuizz").value;
    objQuizz.title = titulo;
    objQuizz.image = img;
    objQuizz.questions.length = qtdePerguntas;
    objQuizz.levels.length = niveis;
    validacaoDeQuizzesTela3_1(); //se a validação tiver desativada o html da tela 3.2 não será ativado
    //abrirTela3_2;
}

function validacaoDeQuizzesTela3_1() {
    let v1, v2, v3, v4;
    let i = 0;
    if (objQuizz.title.length >= 20 && objQuizz.title.length <= 65) {
        v1 = true;
    } else {
        alert("Nome inválido! O nome do quizz deve ter no mínimo 20 e no máximo 65 caracteres.");
        v1 = false;
    } objQuizz.image.value
    if (objQuizz.image.includes('.gif') || objQuizz.image.includes('.jpeg') || objQuizz.image.includes('.jpg') || objQuizz.image.includes('.png') && objQuizz.image.includes('https://')) {
        v2 = true;
    } else {
        alert("Link inválido! O link deve conter uma imagem JPEG, JPG, PNG ou um GIF.");
        v2 = false;
    }
    if (objQuizz.questions.length >= 3) {
        v3 = true;
    } else {
        alert("Número de perguntas inválido! O número mínimo são 3 perguntas.");
        v3 = false
    }
    if (objQuizz.levels.length >= 2) {
        v4 = true;
    } else {
        alert("Número de níveis inválido! O número mínimo são 2 níveis.");
        v4 = false;
    }
    if (v1 === true && v2 === true && v3 === true && v4 === true) {
        abrirTela3_2();
        criarHTMLPerguntas();
    }
}

// CONSTRUÇÃO TELA 3.2 HTML
function criarHTMLPerguntas() {
    const questions = document.querySelector(".perguntas");
    questions.innerHTML += "";
    for (let i = 0; i < objQuizz.questions.length; i++) {
        questions.innerHTML += `
    <div class="pergunta-tela-3-2 teste">
        <div class="topo-pergunta">
            <span>Pergunta ${i + 1}</span>
            <img onclick="encolherPergunta(this)" class="botao-encolher" src="imgs/Vector.svg">
        </div>           
    </div>
        <div class="conteudo-encolher">    
            <div class="texto-e-cor-pergunta">    
                <input class="tituloPerguntas" id="tituloPergunta" type="text" placeholder="Texto da pergunta">
                <input class="corPerguntas" id="corPergunta" type="text" placeholder="Cor de fundo da pergunta">  
            </div>

            <div class="resposta-correta">
                <span>Resposta correta</span>
                <input class="respostaCorreta" id="resposta" type="text" placeholder="Resposta correta">
                <input class="imgRespostaCorreta" id="imgResposta" type="text" placeholder="URL da imagem">
            </div>
            
            <span class="span-resposta-incorreta">Respostas incorretas</span>
            <div class="resposta-incorreta">
                <input class="respostaIncorreta0" id="respostaIncorreta" type="text" placeholder="Resposta incorreta 1">
                <input class="imgRespostaIncorreta0" id="imgRespostaIncorreta" type="text" placeholder="URL da imagem 1">
                <input class="respostaIncorreta1" id="respostaIncorreta" type="text" placeholder="Resposta incorreta 2">
                <input class="imgRespostaIncorreta1" id="imgRespostaIncorreta" type="text" placeholder="URL da imagem 2">
                <input class="respostaIncorreta2" id="respostaIncorreta" type="text" placeholder="Resposta incorreta 3">
                <input class="imgRespostaIncorreta2" id="imgRespostaIncorreta" type="text" placeholder="URL da imagem 3">
            </div>
        </div>    
    `
    }
}

function validacaoCor(cor) {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i.test(cor);
}

function validacaoURL(url) {
    return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
}

// INCOMPLETO (COMO CRIAR O OBJETO???)
function validacaoPerguntas() {
    let tituloPerguntas = document.querySelectorAll(".tituloPerguntas");
    let coresPerguntas = document.querySelectorAll(".corPerguntas");
    let respostasCorretas = document.querySelectorAll(".respostaCorreta");
    let imgsRespostasCorretas = document.querySelectorAll(".imgRespostaCorreta");
    let respostasIncorretas0 = document.querySelectorAll(".respostaIncorreta0");
    let imgsRespostasIncorretas0 = document.querySelectorAll(".imgRespostaIncorreta0");
    let respostasIncorretas1 = document.querySelectorAll(".respostaIncorreta1");
    let imgsRespostasIncorretas1 = document.querySelectorAll(".imgRespostaIncorreta1");
    let respostasIncorretas2 = document.querySelectorAll(".respostaIncorreta2");
    let imgsRespostasIncorretas2 = document.querySelectorAll(".imgRespostaIncorreta2");

    let j = 0;

    for (i = 0; i < objQuizz.questions.length; i++) {
        questions.push({ answers: [] });
    }

    tituloPerguntas.forEach((tituloPergunta, index) => {
        if (tituloPergunta.value.length) {
            j++
            questions[index] = { ...questions[index], title: tituloPergunta.value }
        } else {
            alert("O titulo da pergunta deve ter no minimo 20 caracteres!")
        }
    });

    coresPerguntas.forEach((cor, index) => {
        if (validacaoCor(cor.value)) {
            j++
            questions[index] = { ...questions[index], color: cor.value, answers: [] }
        } else {
            alert("A cor deve ser escrita em formato Hexadecimal.")
        }
    });

    respostasCorretas.forEach((respostaCorreta, index) => {
        if (respostaCorreta.value !== '') {
            j++
            questions[index].answers.push({ text: respostaCorreta.value, isCorrectAnswer: true })
        } else {
            alert("O texto da resposta não pode estar vazio!")
        }
    });

    imgsRespostasCorretas.forEach((imgRespostaCorreta, index) => {
        if (validacaoURL(imgRespostaCorreta.value)) {
            j++
            questions[index].answers[0] = { ...questions[index].answers[0], image: imgRespostaCorreta.value }
        } else {
            alert("A imagem deve estar em link URL!")
        }
    });

    respostasIncorretas0.forEach((respostasIncorretas0, index) => {
        if (respostasIncorretas0.value !== '') {
            j++
            questions[index].answers.push({ text: respostasIncorretas0.value, isCorrectAnswer: false })
        } else {
            alert("O texto da resposta não pode estar vazio!")
        }
    });

    imgsRespostasIncorretas0.forEach((imgsRespostasIncorretas0, index) => {
        if (validacaoURL(imgsRespostasIncorretas0.value)) {
            j++
            questions[index].answers[1] = { ...questions[index].answers[1], image: imgsRespostasIncorretas0.value }
        } else {
            alert("A imagem deve estar em link URL!")
        }
    });

    respostasIncorretas1.forEach((respostasIncorretas1, index) => {
        if (respostasIncorretas1.value !== '') {
            j++
            questions[index].answers.push({ text: respostasIncorretas1.value, isCorrectAnswer: false })
        } else {
            alert("O texto da resposta não pode estar vazio!")
        }
    });

    imgsRespostasIncorretas1.forEach((imgsRespostasIncorretas1, index) => {
        if (validacaoURL(imgsRespostasIncorretas1.value)) {
            j++
            questions[index].answers[2] = { ...questions[index].answers[2], image: imgsRespostasIncorretas1.value }
        } else {
            alert("A imagem deve estar em link URL!")
        }
    });

    respostasIncorretas2.forEach((respostasIncorretas2, index) => {
        if (respostasIncorretas2.value !== '') {
            j++
            questions[index].answers.push({ text: respostasIncorretas2.value, isCorrectAnswer: false })
        } else {
            alert("O texto da resposta não pode estar vazio!")
        }
    });

    imgsRespostasIncorretas2.forEach((imgsRespostasIncorretas2, index) => {
        if (validacaoURL(imgsRespostasIncorretas2.value)) {
            j++
            questions[index].answers[3] = { ...questions[index].answers[3], image: imgsRespostasIncorretas2.value }
        } else {
            alert("A imagem deve estar em link URL!")
        }
    });

    if (j === 10 * objQuizz.questions.length) {
        objQuizz = { ...objQuizz, questions }
        abrirTela3_3();
        gerarHTMLNiveis();
    } else {
        questions = [];
    }
}

let arrayNiveis = [];

function receberInputTela3_3() {
    let v1, v2, v3, v4
    const niveis = [...document.querySelectorAll(".nivel")];
    const dadosNiveis = niveis.map(nivel => {
        return {
            title: nivel.querySelector(".tituloDoNivel").value,
            image: nivel.querySelector(".imgDoNivel").value,
            text: nivel.querySelector(".descricaoDoNivel").value,
            minValue: nivel.querySelector(".acertoMinimo").value
        }
    });

    dadosNiveis.forEach((tituloNivel) => {
        //console.log(tituloNivel.title);
        if (tituloNivel.title.length >= 10) {
            v1 = true;
        } else {
            alert("O titulo do nível deve ter no mínimo 10 caracteres!");
            v1 = false;
        }
    });

    dadosNiveis.forEach((imgNivel) => {
        if (imgNivel.image.includes('.gif') || imgNivel.image.includes('.jpeg') || imgNivel.image.includes('.jpg') || imgNivel.image.includes('.png') && imgNivel.image.includes('https://')) {
            v2 = true;
        } else {
            alert("A imagem deve ter uma URL válida!");
            v2 = false;
        }
    });

    dadosNiveis.forEach((valorDescricaoDoNivel) => {
        if (valorDescricaoDoNivel.text.length >= 30) {
            v3 = true;
        } else {
            alert("A descrição do nível deve ter no mínimo 30 caracteres!");
            v3 = false;
        }
    });

    dadosNiveis.forEach((valorAcertoNivel) => {
        if (valorAcertoNivel.minValue >= 0 && valorAcertoNivel.minValue <= 100) {
            v4 = true;
        } else {
            alert("O valor de acerto deve ser um número entre 0 e 100!");
            v4 = false;
        }
    });

    if (v1 === true && v2 === true && v3 === true & v4 === true) {
        objQuizz.levels = [...dadosNiveis];
        abrirTela3_4();
        enviarQuizzCriadoAoServidor();
        mostrarQuizzTela3_4();
        // console.log(objQuizz);
    }
    //console.log(dadosNiveis);
    //return dadosNiveis;
}

//gerar html dos níveis
function gerarHTMLNiveis() {
    const bloco = document.querySelector(".niveis");
    bloco.innerHTML += "";
    for (i = 0; i < objQuizz.levels.length; i++) {
        bloco.innerHTML += `<div class="nivel nivel-tela-3-3">
        <span>Nível ${i + 1}</span>
        <input class="tituloDoNivel" type="text" placeholder="Título do nível">
        <input class="acertoMinimo" type="text" placeholder="% de acerto mínima">                
        <input class="imgDoNivel" type="text" placeholder="URL da imagem do nível">
        <input class="descricaoDoNivel" class="descricao" type="text" placeholder="Descrição do nível">
    </div>`
    }
}

/* Enviar o quizz criado ao servidor */

let quizzDoUsuario, idDoQuizz;

function enviarQuizzCriadoAoServidor (){
    const enviarQuizz = axios.post(`${LINK_API}quizzes`, objQuizz);
    enviarQuizz.then(resposta => {
        quizzDoUsuario = resposta.data;
        idDoQuizz = resposta.data.id;
        salvarQuizzDoUsuario(quizzDoUsuario);
        pegarQuizzesDoUsuario ();
		console.log(resposta);
        console.log(quizzDoUsuario);
        console.log(idDoQuizz);
	});
}

function mostrarQuizzTela3_4 (){
    const quizz = document.querySelector(".tela-3-4");
    quizz.innerHTML += "";
    quizz.innerHTML += `<div class="box"><span>Seu quizz está pronto!</span>
    <div>
        <img class="img-tela-finalizar" src="${objQuizz.image}" alt="${objQuizz.image}">
        <p class="texto-img-tela-finalizar">${objQuizz.title}</p>
    </div></div>`;
}

/* Local data storage */
function salvarQuizzDoUsuario (quizz, id){
    let quizzUsuario = JSON.stringify(quizz);
	localStorage.setItem(`${id}`, quizzUsuario);
    console.log(quizz);
    console.log(id);
}

let quizzesDoUsuario = [];

function pegarQuizzesDoUsuario (){
    for (i = 0; i < localStorage.length; i++){
        let idDoQuizzDoUsuario = localStorage.key(i);
        let quizzSerializado = localStorage.getItem(idDoQuizzDoUsuario);
        let quizzDeserializado = JSON.parse(quizzSerializado);
        quizzesDoUsuario = [{...quizzDeserializado}];
    }  
}

function mostrarQuizzesDoUsuario() {
    const quizzesUsuario = document.querySelector(".seus-quizzes");
    quizzUsuario += "";
    quizzUsuario += `<article onclick="acessarQuizz(this)" id="${respostaServidor.data[i].id}">
    <img class="img-tela-1" src="${respostaServidor.data[i].image}" alt="${respostaServidor.data[i].title}">
    <p class="titulo-quiz-tela-1">${respostaServidor.data[i].title}</p>
</article>`;
}

/* --> Outras funções <-- */

// //selecionando resposta tela 2
function selecionarOpcao(opcao) {
    console.log(opcao)
    let alternativasTela2 = document.querySelectorAll(".alternativa");
    alternativasTela2.forEach(alternativaTela2 => {
        alternativaTela2.classList.add("opacidade")
    });

    opcao.style.opacity = "1"
}

//mudança de telas

function abrirTela2(quiz) {
    infos = quiz.data;
    console.log(quiz)
    console.log(infos)
    const tela1 = document.querySelector(".tela-1");
    const tela2 = document.querySelector(".tela-2");
    tela1.classList.add("off");
    tela2.classList.remove("off");

    gerarHeaderTela2()
    gerarQuestionTela2()
}

function gerarHeaderTela2() {
    const header = document.querySelector(".container-header-tela-2");
    header.innerHTML += `
    <div class="header-tela-2">
        <img class="img-header-tela-2" src="${infos.image}">
        <span class="texto-header-tela-2">${infos.title}</span>
    </div>
    `
}

function gerarQuestionTela2() {
    // let i = 0;
    const questions = infos.questions;
    const quizQuestions = document.querySelector(".pergunta");
    quizQuestions.innerHTML = "";
    questions.forEach(question => {
        quizQuestions.innerHTML += `
        <div style="background-color: ${question.color}" class="titulo-da-pergunta-tela-2">
                <p class="texto-titulo-da-pergunta-tela-2">${question.title}</p>
        </div>
        
        <div class="alternativas">
            ${gerarRespostas(question)}
        </div>
    `});
}

function gerarRespostas(question) {
    const respostasSemModificacao = question.answers;
    const respostas = respostasSemModificacao.sort(() => Math.random() - 0.5);
    console.log(respostas);
    let quizRespostas = "";
    respostas.forEach(resposta => {
        quizRespostas += `
        <div class="alternativa" onclick="selecionarOpcao(this)">
            <img class="img-resposta" src="${resposta.image}">
            <p class="texto-resposta">${resposta.text}</p>
        </div>
        `
    });
    console.log(quizRespostas);
    return quizRespostas;
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

function encolherPergunta(perguntaEscolhida) {
    const pergunta = document.querySelector(".conteudo-encolher")
    pergunta.classList.toggle("off")
    
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
    window.location.reload(true);
}

function escondeBotao() {
    const botao = document.querySelector(".iconeEditar");
    const inputs = document.querySelectorAll(".esconderNiveis");
    botao.classList.add("esconderNiveis");
    inputs.classList.remove("esconderNiveis");
}

function randomizarArray() {
    return Math.random() - 0.5;
}