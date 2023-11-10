// Muestra las opciones del juego
console.log("1. Iniciar un juego");
console.log("2. Estadísticas");
console.log("3. Salir");

// Inicializa variables para estadísticas del juego
var totalPartidas = 0;
var partidasGanadas = 0;
var partidasPerdidas = 0;

// Función para jugar al ahorcado con una palabra dada
function jugarAhorcado(palabraAdivinar) {
  // Inicialización de variables para el juego
  var palabraAdivinada = new Array(palabraAdivinar.length).fill("_");
  var intentosMaximos = 6;
  var letrasFalladas = [];
  var intentos = 0;
  var adivinada = false;

  // Bucle principal del juego
  while (intentos < intentosMaximos && !adivinada) {
    var palabraMostrada = "";

    // Construye la palabra mostrada con las letras adivinadas hasta el momento
    for (var i = 0; i < palabraAdivinar.length; i++) {
      palabraMostrada += palabraAdivinada[i] + " ";
    }

    // Muestra la palabra con las letras adivinadas y espacios
    console.log(palabraMostrada);

    // Solicita al usuario introducir una letra
    var letra = prompt("Introduce una letra:");

    // Verifica si la entrada del usuario es válida
    if (letra.length !== 1 || !letra.match(/[a-zA-Z]/)) {
      console.log("Por favor, introduce una sola letra válida.");
      continue;
    }

    var letraAdivinada = false;

    // Verifica si la letra introducida está en la palabra a adivinar
    for (var i = 0; i < palabraAdivinar.length; i++) {
      if (palabraAdivinar[i] === letra) {
        palabraAdivinada[i] = letra;
        letraAdivinada = true;
      }
    }

    // Manejo de letras no adivinadas
    if (!letraAdivinada) {
      letrasFalladas.push(letra);
      intentos++;
    }

    // Verifica si se ha adivinado la palabra por completo
    adivinada = palabraAdivinada.every(function (letra) {
      return letra !== "_";
    });

    // Muestra mensajes de victoria o derrota
    if (adivinada) {
      console.log("¡Enhorabuena, has adivinado la palabra: " + palabraAdivinar + "!");
      partidasGanadas++;
    } else if (intentos === intentosMaximos) {
      console.log("Has agotado tus intentos. La palabra era: " + palabraAdivinar);
      partidasPerdidas++;
    }

    // Muestra las letras falladas hasta el momento
    var letrasFalladasString = "";
    for (var j = 0; j < letrasFalladas.length; j++) {
      letrasFalladasString += letrasFalladas[j];
      if (j < letrasFalladas.length - 1) {
        letrasFalladasString += ", ";
      }
    }
    console.log("Letras falladas " + intentos + "/" + intentosMaximos + ": " + letrasFalladasString);
  }
}

// Función para iniciar el juego y manejar las opciones
function iniciarJuego() {
  while (true) {
    var promptJugar = prompt("Tria una opcio: (1, 2, 3)");

    if (promptJugar === "1") {
      var palabra = prompt("Introduce una palabra para adivinar:");
      jugarAhorcado(palabra);
    } else if (promptJugar === "2") {
      // Muestra las estadísticas del juego
      console.log('Total de partidas: ' + (totalPartidas=partidasGanadas+partidasPerdidas));
      console.log('Partidas ganadas: (' + ((partidasGanadas/totalPartidas)*100).toFixed(2) + '%) ' + partidasGanadas);
      console.log('Partidas perdidas: (' + ((partidasPerdidas/totalPartidas)*100).toFixed(2) + '%) ' + partidasPerdidas);
    } else if (promptJugar === "3") {
      console.log("Saliendo del juego.");
      break;
    } else {
      console.log("Opción no válida. Por favor, elige 1, 2 o 3.");
    }
  }
}

// Inicia el juego
iniciarJuego();
