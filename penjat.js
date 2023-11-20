// Letra introducida por el usuario
let letra = ""; 
// Palabra que el usuario debe adivinar
let palabra = "";  
// Representación oculta de la palabra por adivinar  
let oculta = "";   
// Número máximo de intentos permitidos  
let intentos = 6;   
// Contador de intentos fallidos 
let fallos = 0;   
// Referencia al elemento HTML para mostrar la palabra oculta   
let p = "";  
// Letras que el usuario ya ha intentado y no están en la palabra        
let usadas = "";     


// Obtener las estadísticas del Local Storage o iniciarlas en 0 si no existen
let ganadas = localStorage.getItem("ganadas") || 0;
let perdidas = localStorage.getItem("perdidas") || 0;

// Función para mostrar las estadísticas en una nueva ventana
function estats() {
    let stats = window.open("", "_blank"); // Abrir una nueva ventana en blanco
    stats.document.write("Total de partides: " + (ganadas + perdidas) + "<br>"); // Mostrar el total de partidas
    // Mostrar el porcentaje de partidas ganadas y perdidas junto con el número de partidas
    stats.document.write("Partides guanyades (" + (ganadas / (ganadas + perdidas) * 100).toFixed(2) + "%): " + ganadas + "<br>");
    stats.document.write("Partides perdudes (" + (perdidas / (ganadas + perdidas) * 100).toFixed(2) + "%): " + perdidas);
}

// Función para borrar las estadísticas y reiniciar los contadores
function borrarEstats() {
    localStorage.setItem("ganadas", 0); // Establecer las partidas ganadas en 0 en el Local Storage
    localStorage.setItem("perdidas", 0); // Establecer las partidas perdidas en 0 en el Local Storage
    ganadas = 0; // Establecer las partidas ganadas en 0 en la memoria
    perdidas = 0; // Establecer las partidas perdidas en 0 en la memoria
    alert("Estadísticas borradas."); // Mostrar un mensaje de alerta
}

// Función para comenzar una nueva partida
function nuevaPartida() {
    // Reiniciar valores de juego
    intentos = 6;
    fallos = 0;
    usadas = "";
    let ocultaEspacios = "";
    let botones = "";
    oculta = "";

    palabra = prompt("Introduce una palabra"); // Pedir al usuario que introduzca una palabra

    dibujarPenjat(fallos); // Dibujar el ahorcado con 0 fallos
    escribirInfo(fallos, usadas); // Mostrar la información de letras falladas y usadas
    
    // Verificar si la palabra es nula o está vacía y pedir al usuario que introduzca una palabra válida
    while (palabra == null || palabra.length < 1) {
        palabra = prompt("Introduce una palabra");
    }

    let letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Cadena de letras del abecedario

    // Generar la palabra oculta con guiones bajos y espacios
    for (let i = 0; i < palabra.length; i++) {
        oculta = "_" + oculta;
        ocultaEspacios = "_ " + ocultaEspacios;
    }
    p = document.getElementById('ahorcado'); // Obtener el elemento con el id 'ahorcado'
    p.innerHTML = ""; // Limpiar el contenido existente
    p.innerHTML = `<p>${ocultaEspacios}</p>`; // Mostrar la palabra oculta con guiones y espacios

    botones = document.getElementById('abecedario'); // Obtener el elemento con el id 'abecedario'
    botones.innerHTML = ""; // Limpiar el contenido existente

    // Crear botones para cada letra del abecedario
    for (let i = 0; i < letras.length; i++) {
        botones.innerHTML += `<button id="${letras[i]}" onclick='recibirLetra("${letras[i]}")'>${letras[i]}</button>`;
    }
}

// Función para recibir la letra seleccionada por el usuario
function recibirLetra(letraDada) {
    letra = letraDada; // Establecer la letra seleccionada
    let resultado = "";

    if (comprobarLetra(letra, palabra)) {
        resultado = escribirPalabraOculta(letra, palabra, oculta);
        oculta = resultado;
        resultado = resultado.join(" ");
        p = document.getElementById('ahorcado');
        p.innerHTML = `<p>${resultado}</p>`;

        if (comprobarGuion(oculta)) {
            ganadas++;
            setTimeout(function () {
                alert("¡Has ganado!");
            }, 100);
        }
    } else {
        if (!usadas.includes(letra)) {
            usadas = letra + "," + usadas;
            intentos--;
            fallos++;
            dibujarPenjat(fallos);
            escribirInfo(fallos, usadas);
        }
        if (intentos == 0) {
            perdidas++;
            setTimeout(function () {
                alert("¡Has perdido!");
            }, 100);
        }
    }
}   

// Función para dibujar el ahorcado según los fallos
function dibujarPenjat(falladas){
    let fotos = document.getElementById('imagen'); // Obtener el elemento con el id 'imagen'
    fotos.src = ""; // Limpiar la fuente de la imagen
    fotos.src = `./img/penjat_${falladas}.png`; // Establecer la nueva fuente de la imagen según los fallos
}

// Función para comprobar si la letra está en la palabra
function comprobarLetra (letra, palabras){ 
    let letraDada = letra.toLowerCase(); // Convertir la letra dada a minúsculas
    let palabraDada = palabras.toLowerCase(); // Convertir la palabra a minúsculas
    
    for (let i = 0; i <= palabraDada.length - 1; i++){
        if (palabraDada[i] == letraDada){
           return true; // Si la letra está en la palabra, devuelve true
        }
    }
    return false; // Si no, devuelve false
}

// Función para escribir la palabra oculta con las letras descubiertas
function escribirPalabraOculta(letra, palabra, oculta) {
    let palabraOculta = oculta; // Establecer la palabra oculta inicial
    let palabraDada = palabra.toLowerCase(); // Convertir la palabra a minúsculas
    let letraDada = letra.toLowerCase(); // Convertir la letra a minúsculas

    let ocultaArray = ""; // Inicializar el array para la palabra oculta
    ocultaArray = [...palabraOculta]; // Convertir la palabra oculta en un array
    
    for (let i = 0; i <= palabraDada.length - 1; i++){
        if (palabraDada[i] == letraDada){
            ocultaArray[i] = letraDada; // Si la letra está en la palabra, se muestra en la posición correspondiente
        }
    }
    return ocultaArray; // Devolver la palabra oculta actualizada
}  

// Función para comprobar si hay algún guion bajo en la palabra oculta
function comprobarGuion(palabraOculta) {
    for (let i = 0; i < palabraOculta.length; i++) {
        if (palabraOculta[i] === '_') {
            return false; // Si encuentra al menos un guion bajo, devuelve false
        }
    }
    return true; // Si no hay guiones, devuelve true indicando que se ha revelado completamente la palabra
}

// Función para escribir la información sobre las letras falladas
function escribirInfo(falladas, usadas){
    let info = document.getElementById('letrasUsadas'); // Obtener el elemento con el id 'letrasUsadas'
    info.innerHTML = ""; // Limpiar el contenido existente
    info.innerHTML = `<p>Letras falladas ${falladas}/6: ${usadas.toLowerCase()}</p>`; // Mostrar las letras falladas y usadas
}



