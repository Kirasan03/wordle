//console.log('hola')
let intentos = 6;
let palabra = 'APPLE';

const API = 'https://random-word-api.herokuapp.com/word?number=2&length=5&lang=es'


fetch(API).then(response => response.json())
.then(response => {
    palabra = response[0].toUpperCase()
    //console.log(palabra)
    //console.log(response[0].toUpperCase())
})
.catch(err => console.log(err))

let contenedor = document.getElementById('guesses');
const BOTON = document.getElementById('guess-button');
BOTON.addEventListener('click', intentar)


function leerIntento(){ 
    let intento = document.getElementById('guess-input').value;
    
    //console.log(intento)
    return intento.toUpperCase();
    //return intento
    //console.log(intento)
}


function intentar(){
    
    const INTENTO = leerIntento();
    contenedor.innerHTML = ''
    if (INTENTO.length < 5){
        
        contenedor.innerHTML = '<h1>Ingrese una palabra de 5 letras :)</h1>'
        return 
    }
    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    if (INTENTO === palabra) {
        terminar('<h1>GANASTEEE </h1>')
        // const SPAN = document.createElement('span');
        // SPAN.innerHTML = intento[palabra];
        return
    }        
    
    ROW.className = 'row';
    for(let i in palabra){
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
       // SPAN.innerHTML = INTENTO[i];
        if(INTENTO [i] === palabra[i]){
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#79b851';
            

        } else if (palabra.includes(INTENTO[i])) {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'yellow';
        } else {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'gray'
        }
        ROW.appendChild(SPAN);
    }
    GRID.appendChild(ROW);
    intentos--;
    if (intentos == 0){
        terminar('<h1>PERDISTE TRISTEMENTE</h1>')
    }
}
  

function terminar(mensaje){
    const INPUT = document.getElementById('guess-input');
    INPUT.disabled = true;
    BOTON.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje

}


