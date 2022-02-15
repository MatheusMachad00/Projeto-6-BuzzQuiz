/* Variáveis de controle */
const LINK_API = "https://mock-api.driven.com.br/api/v4/buzzquizz/";

/* Pegando os quizes do servidor e imprimindo */
const promessa = axios.get(`${LINK_API}quizzes`);
promessa.then(CriarEstruturaHTML);
//criar função para o catch?

//mudar a estrutura do html, essa estrutura é para testes
function CriarEstruturaHTML(respostaServidor) {
    console.log(respostaServidor);
    const ul = document.querySelector("ul");
    ul.innerHTML = "";
    for (i = 0; i < respostaServidor.data.length; i++){
        ul.innerHTML += `<p>${respostaServidor.data[i].title}</p>
        <img src="${respostaServidor.data[i].image}" alt="${respostaServidor.data[i].image}">`
    }
}

/* tentando transformar o codigo acima em arrow function
function pegarQuizzesDoServidor() {
    const promessa = axios.get(`${LINK_API}quizzes`);
    promessa.then(respostaServidor => {
        console.log(respostaServidor);
        console.log(respostaServidor.data[0]);
        console.log(respostaServidor.data);
        
    });
}; */
