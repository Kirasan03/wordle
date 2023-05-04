let intentos = 6;

const API =
  "https://random-word-api.herokuapp.com/word?number=2&length=5&lang=es";

const quitarAcento = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

fetch(API)
  .then((response) => response.json())
  .then((response) => {
    palabra = quitarAcento(response[0].toUpperCase());
    console.log(palabra);
   
  })
  .catch((err) => console.log(err));
let contenedor = document.getElementById("guesses");
const BOTON = document.getElementById("guess-button");
BOTON.addEventListener("click", intentar);

function leerIntento() {
  let intento = document.getElementById("guess-input").value;
  return intento.toUpperCase();
}

function intentar() {
  const INTENTO = leerIntento();
  contenedor.innerHTML = "";
  if (INTENTO.length < 5 || INTENTO.length > 5) {
    contenedor.innerHTML = "<h1>Ingrese una palabra de 5 letras </h1>";
    return;
  }

  const GRID = document.getElementById("grid");
  const ROW = document.createElement("div");

  ROW.className = "row";
  for (let i in palabra) {
    const SPAN = document.createElement("span");
    SPAN.className = "letter";
    if (INTENTO[i] === palabra[i]) {
      SPAN.innerHTML = INTENTO[i];
      SPAN.style.backgroundColor = "#79b851"; //verde
    } else if (palabra.includes(INTENTO[i])) {
      SPAN.innerHTML = INTENTO[i];
      SPAN.style.backgroundColor = "#f3c237"; //amarillo
    } else {
      SPAN.innerHTML = INTENTO[i];
      SPAN.style.backgroundColor = "gray"; //gris
    } 
    ROW.appendChild(SPAN);
  }
  GRID.appendChild(ROW);
  intentos--;
  if (INTENTO === palabra) {
    terminar("<h1>GANASTEEE 😀 </h1>");
    // const SPAN = document.createElement('span');
    // SPAN.innerHTML = intento[palabra];
    return;
  }
  if (intentos == 0) {
    terminar("<h1>PERDISTE TRISTEMENTE</h1>");
  }
}

function terminar(mensaje) {
  const INPUT = document.getElementById("guess-input");
  INPUT.disabled = true;
  BOTON.disabled = true;
  let contenedor = document.getElementById("guesses");
  contenedor.innerHTML = mensaje;
}


