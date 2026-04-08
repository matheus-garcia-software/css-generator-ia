//toda vez que for puxar uma class tem que colocar o "." antes do nome da class
//fetch - ferramenta do JS para se comunicar com um servidor

let botao = document.querySelector(".botaoGerar")
let chaveApi = "" // INSIRA SUA CHAVE DA GROQ AQUI PARA TESTAR LOCALMENTE
let enderecoApi = "https://api.groq.com/openai/v1/chat/completions"


//criei a função que sera chamada quando clicar o botão
//async / await(espere)

async function gerarCodigo() {
    let textoUsuario = document.querySelector(".caixaTexto").value
    let blocoCodigoCss = document.querySelector(".blocoCodigoCss")
    let resultadoCodigo = document.querySelector(".resultadoCodigo")

    //endereço, configurações
    let resposta = await fetch(enderecoApi, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + chaveApi
        },
        body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: "Você é um gerador de código HTML e CSS. Responda SOMENTE com código puro. NUNCA use crases, markdown ou explicações. Formato: primeiro <style> com o CSS, depois o HTML. Siga EXATAMENTE oque o usuário pedir. Se pedir algo quicando, use translateY no @keyframes. Se pedir algo girando, use rotate. Se pedir sombra em algum model, faça. SEMPRE faça tudo oque for pedido pelo usuário."

                },
                {
                    role: "user",
                    content: textoUsuario
                }
            ]
        })
    })

    let dados = await resposta.json()
    let resultado = dados.choices[0].message.content

    blocoCodigoCss.textContent = resultado
    resultadoCodigo.srcdoc = resultado

}

//ficar de olho no botão, quando clicado chamar a função
botao.addEventListener("click", gerarCodigo) //adicionar um ouvinte de eventos (eventos = clique, digitei...)


function copiarCodigo() {
    // 1. Seleciona o elemento que contém o código gerado
    const codigoElemento = document.querySelector(".blocoCodigoCss");
    const tooltip = document.querySelector(".tooltip-text");

    // 2. Verifica se existe texto para copiar (evita copiar o "placeholder")
    const textoParaCopiar = codigoElemento.innerText;

    if (textoParaCopiar && textoParaCopiar !== "O código aparecerá aqui...") {
        // 3. Usa a API do navegador para copiar o texto
        navigator.clipboard.writeText(textoParaCopiar).then(() => {

            // Muda o texto do tooltip
            tooltip.innerText = "Copiado! ✅";

        }).catch(err => {
            console.error("Erro ao copiar: ", err);
            alert("Não foi possível copiar o código.");
        });
    } else {
        // Se o usuário tentar copiar antes de gerar o código
        tooltip.innerText = "Nada para copiar!";
        setTimeout(() => {
            tooltip.innerText = "Copiar o código";
        }, 2000);
    }
}

