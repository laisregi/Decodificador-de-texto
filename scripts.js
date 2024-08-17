function criptografarTexto(texto) {
    const substituicoes = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };

    return texto.split('').map(char => substituicoes[char] || char).join('');
}

function descriptografarTexto(texto) {
    const substituicoes = {
        'enter': 'e',
        'imes': 'i',
        'ai': 'a',
        'ober': 'o',
        'ufat': 'u'
    };

    const regex = new RegExp(Object.keys(substituicoes).join('|'), 'g');
    return texto.replace(regex, match => substituicoes[match]);
}

function normalizarTexto(texto) {
    texto = texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const regex = /^[a-z\s]+$/;
    if (!regex.test(texto)) {
        alert("O texto deve conter apenas letras minúsculas e sem caracteres especiais.");
        return "";
    }
    return texto;
}

document.getElementById("criptografar").addEventListener("click", function() {
    let texto = document.getElementById("texto").value;
    let textoNormalizado = normalizarTexto(texto);

    if (textoNormalizado.trim() === "") {
        document.getElementById("menu-titulo").innerText = "Nenhuma mensagem encontrada";
        document.getElementById("resultado-criptografado").style.display = "none";
        document.getElementById("aviso").style.display = "block";
    } else {
        let criptografado = criptografarTexto(textoNormalizado);
        document.getElementById("texto").value = ""; // Limpar o textarea
        document.getElementById("menu-titulo").innerText = "Texto Criptografado";
        document.getElementById("texto-criptografado").innerText = criptografado;
        document.getElementById("resultado-criptografado").style.display = "block";
        document.querySelector(".menu-direito img").style.display = "none";
        document.querySelector(".menu-direito p").style.display = "none";
        document.getElementById("aviso").style.display = "none";
    }
});

document.getElementById("descriptografar").addEventListener("click", function() {
    let texto = document.getElementById("texto").value;
    let descriptografado = descriptografarTexto(texto);
    
    if (descriptografado) {
        let textoNormalizado = normalizarTexto(descriptografado);
        if (textoNormalizado.trim() !== "") {
            document.getElementById("texto").value = textoNormalizado;
            document.getElementById("menu-titulo").innerText = "Texto Descriptografado";
            document.getElementById("texto-criptografado").innerText = textoNormalizado;
            document.getElementById("resultado-criptografado").style.display = "block";
            document.querySelector(".menu-direito img").style.display = "none";
            document.querySelector(".menu-direito p").style.display = "none";
            document.getElementById("aviso").style.display = "none";
        } else {
            document.getElementById("aviso").style.display = "block";
        }
    }
});

document.getElementById("copiar").addEventListener("click", function() {
    let textoParaCopiar = document.getElementById("texto-criptografado").innerText;
    navigator.clipboard.writeText(textoParaCopiar).then(function() {
        alert("Texto copiado para a área de transferência!");
    }).catch(function(err) {
        console.error("Erro ao copiar o texto: ", err);
    });
});