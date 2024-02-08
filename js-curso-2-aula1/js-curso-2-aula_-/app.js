//let titulo = document.querySelector('h1');   (Local)
//titulo.innerHTML = 'Jogo do número secreto'; (Mudando o título principal da página)

//let paragrafo = document.querySelector('p');  (Local)
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';     (Mudando o conteúdo do paragrafo)

//------------------------------------------------------------------------------------------------------------------//

let listaDeNumerosSorteados = [];        //string vazia.
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;



function exibirTextonaTela(tag, texto) {
    let campo = document.querySelector(tag, texto);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female',
    {rate:1.2});
}

function exibirMensagemInicial(){
    exibirTextonaTela('h1', 'Jogo do número secreto');
    exibirTextonaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

function verificarChute() {                     //Função : trecho de código responsavel por determinada ação.
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextonaTela('h1', 'Acertou');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextonaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextonaTela('p', 'O número secreto é menor');
        } else {
            exibirTextonaTela('p', 'O número secreto é maior');
        }
        tentativas++; //Soma da tentiva
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let NumeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(NumeroEscolhido)){
       return gerarNumeroAleatorio(); 
    } else {
        listaDeNumerosSorteados.push(NumeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return NumeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
     exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}


