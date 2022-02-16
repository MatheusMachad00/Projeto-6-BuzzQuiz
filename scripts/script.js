/* Variáveis de controle */
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
    for (i = 0; i < respostaServidor.data.length; i++){
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