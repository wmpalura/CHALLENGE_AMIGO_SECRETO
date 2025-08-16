//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.

let listaDeAmigos = [];

//aceita o pressionar da tecla enter se o foco estiver na caixa input, além do clique no botão.
document.querySelector("#amigo").addEventListener("keydown", function(event){
    if (event.key === "Enter"){
        event.preventDefault();
        adicionarAmigo();
    }
})

//quando o botão adicionar amigo é clicado:
function adicionarAmigo(){
    let amigo = document.querySelector("#amigo").value; //recebe a entrada do campo input.

    //verifica se campo input está vazio, caso sim, nada é feito.
    if (amigo !== ""){
        limparMensagens();

        //verifica se o nome inserido está na lista, e se sim:
        if (listaDeAmigos.includes(amigo)){
            document.querySelector("#avisoRepetido").classList.remove("lista-vazia"); //exibe a lista os espaços na página para melhor visualização
            document.querySelector("#avisoRepetido").innerHTML = `${amigo} já está incluso na lista. Tente outro nome.`;
        }

        //se não:
        else{
            listaDeAmigos.push(amigo); //adiciona o novo nome na lista de amigo
            let novoAmigo = document.createElement("li"); //cria um novo elemento li no html para printar o novo nome.
            novoAmigo.textContent = amigo; //adiciona o novo nome para o elemento li criado.
            document.querySelector("#listaAmigos").append(novoAmigo); //printa na página o novo nome abaixo dos nomes adicionados anteriormentes sendo li subordinado ao elemento ul, que possui a tag listaAmigos, já existente.
        }
    }
    document.querySelector("#amigo").value = ""; //apaga a entrada so clicar no botão Adicionar Amigo.
}

function exibirResultados(fazerDuplas, nomeAmigo1, nomeAmigo2, numeroDupla, exibirSolitario, solitario){
    document.querySelector("#resultado").classList.remove("lista-vazia"); //exibe a lista os espaços na página para melhor visualização
    //exibe mensagem se houver algum amigo sem dupla
    if (exibirSolitario){
        let novaDupla = document.createElement("li");
        novaDupla.textContent = `Infelizmente, ${solitario} ficou sem dupla. T_T`;
        document.querySelector("#resultado").append(novaDupla);
    }
    //exibe duplas
    else if (fazerDuplas){
        let novaDupla = document.createElement("li");
        novaDupla.textContent = `Dupla ${numeroDupla}: ${nomeAmigo1} e ${nomeAmigo2}`;
        document.querySelector("#resultado").append(novaDupla);
    }
    //exibe o amigo individual sorteado
    else{
        let amigoEscolhido = selecionarAmigo(); //sorteia o index da lista de amigos inserida e seleciona o amigo escolhido.
        document.querySelector("#resultado").innerHTML = `O amigo secreto foi ${amigoEscolhido}.`; //exibe na página o resultado do sorteio.
    }
}

//sorteio geral
function selecionarAmigo(){
    return listaDeAmigos[Math.floor(Math.random() * listaDeAmigos.length)];
}

function sorteioDeDuplas(solitarioExiste){
    let amigosEmGrupos = [];
    let amigo1;
    let amigo2;
    //se houver, reserva o nome do amigo solitário ao primeiro lugar da lista
    if (solitarioExiste){
        amigosEmGrupos.push(selecionarAmigo())
    }
    //exibe duplas uma a uma
    for (let i = 0; i < Math.floor(listaDeAmigos.length / 2); i++){
        amigo1 = selecionarAmigo();
        while (amigosEmGrupos.includes(amigo1) === true){
            amigo1 = selecionarAmigo();
        }
        amigosEmGrupos.push(amigo1);
        amigo2 = selecionarAmigo();
        while (amigosEmGrupos.includes(amigo2) === true){
            amigo2 = selecionarAmigo();
        }
        amigosEmGrupos.push(amigo2);
        exibirResultados(true, amigo1, amigo2, (i + 1), false);
    }
    //exibe a mensagem do amigo solitário por último
    if (solitarioExiste){
        exibirResultados(true, amigo1, amigo2, (Math.floor(listaDeAmigos.length / 2) + 1), true, amigosEmGrupos[0]);
    }
}

function sortearDuplas(){
    limparMensagens();
    //verifica se há um número par de amigos
    if (listaDeAmigos.length % 2 == 0){
        sorteioDeDuplas(false);
    }
    else{
        sorteioDeDuplas(true);
    }
}

function limparMensagens(){
    document.querySelector("#avisoRepetido").innerHTML = ""; //limpa o aviso de amigo repetido.
    document.querySelector("#resultado").innerHTML = ""; //limpa do resultado individual.
    document.querySelector("#avisoRepetido").classList.add("lista-vazia"); //limpa espaços vazios na página
    document.querySelector("#resultado").classList.add("lista-vazia"); //limpa espaços vazios na página
}


//quando o botão de sorteio é clicado:
function sortearAmigo(){
    limparMensagens();
    exibirResultados(false);
}