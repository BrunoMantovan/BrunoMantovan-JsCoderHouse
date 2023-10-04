

const rojo = [1, 3, 5 ,7 ,9, 12, 14 ,16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
const negro = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
const limitesAngulos = [0, 9.72973, 19.45945, 29.18919, 38.91892, 48.64865, 58.37838, 68.10811, 77.83784, 87.56757, 97.29730, 107.02703,
    116.75676, 126.48649, 136.21622, 145.94595, 155.67568, 165.40541, 175.13514, 184.86486, 194.59459, 204.32432, 214.05405, 223.78378,
    233.51351, 243.24324, 252.97297, 262.70270, 272.43243, 282.16216, 291.89189, 301.62162, 311.35135, 321.08108, 330.81081, 340.54054, 350.27027];
const numerosEnRuleta = [26, 3, 35, 12, 28, 7, 29, 18, 22, 9, 31, 14, 20, 1, 33, 16, 24, 5, 10, 23, 8, 30, 11, 36, 13, 27, 6, 34, 17, 25, 2, 21, 4, 19, 15, 32, 0];
const numerosSalidos = JSON.parse(localStorage.getItem("listaDeNumerosSalidos")) ?? [];
const numerosElegidos = [];
const array = [];

let primeraCarga = true;

const ruleta = document.querySelector(".ruleta");
const jugar = document.querySelector(".jugar");
let botones = document.querySelectorAll(".boton");
const container = document.querySelector(".lista_numeros")

let saldo = 5000;
let montoNumero = 0;
let montoColor = 0;
let montoParidad = 0;
let apostado = 0;
let plata = 100;
const timer = 5;
const maxArraySize = 9;

let saldo_text_html = document.querySelector(".saldo_cantidad");
let apostado_text_html = document.querySelector(".apostado_cantidad");

saldo_text_html.innerHTML = `${saldo}`;
apostado_text_html.innerHTML = `${apostado}`;
console.log(numerosSalidos.length);

if(numerosSalidos.length > 0 && primeraCarga == true){
    for(i=0; i<numerosSalidos.length; i++){
        añadirNumero(numerosSalidos[i].number, numerosSalidos[i].color);
    }
    
}
primeraCarga = false;
for(let i=0; i<botones.length; i++){
    botones[i].addEventListener("click", function(){
        if(this.innerText == "Par" || this.innerText == "Impar"){
            let paridad = this.innerText;
            añadirAlArray(paridad);
        }else if(this.innerText == "Rojo" || this.innerText == "Negro"){
            let color = this.innerText;
            añadirAlArray(color);
        }else{
            let numero = this.innerText;
            añadirAlArray(numero);
        }
        saldo -= plata;
        saldo_text_html.innerHTML = `${saldo}`;
        apostado += plata;
        apostado_text_html.innerHTML = `${apostado}`;
    });
}


function añadirAlArray(valor){
    const existingItemIndex = array.findIndex(item => item.valor == valor);

    if (existingItemIndex !== -1) {
    // Si numero ya existe en array, aumentar plata
    array[existingItemIndex].plata += plata;
    console.log(`Increased plata for ${valor} to ${array[existingItemIndex].plata}`);
    } else {
    const elegido = new placeBet(valor, plata);
    array.push(elegido);
    console.log(array);
    }
}


function placeBet(valor, plata){
    this.valor = valor;
    this.plata = plata;
}

jugar.addEventListener("click", function () {
    const deg = (2000 + Math.random()*2000);

    ruleta.style.transition = `all ${timer}s ease`;
    ruleta.style.transform = `rotate(${deg}deg)`;
    
    setTimeout(function(){
        pago(deg);
        
    }, 5000);
  });


function pago(grados){
    ruleta.style.transition = `none`;

    const deg_real = grados%360;
    console.log(deg_real);
    ruleta.style.transform = `rotate(${deg_real}deg)`;
    for (let i = 0; i < limitesAngulos.length; i++) {
        if (deg_real > limitesAngulos[i]) {
            numeroRuleta = i;
        }else{
            break;
        }
    }
    const numeroRandom = numerosEnRuleta[numeroRuleta];
    
    const numeroTirado = new tiro(numeroRandom);
    const {num, colCode} = numeroTirado
    console.log(numeroTirado);

    const existingItemNumero = array.findIndex((item) => item.valor == numeroTirado.num);
    const existingItemColor = array.findIndex((item) => item.valor == numeroTirado.col);
    const existingItemParidad = array.findIndex((item) => item.valor == numeroTirado.paridad);
    
    existingItemNumero !== -1 && (saldo += array[existingItemNumero].plata*36);

    existingItemColor !== -1 && (saldo += array[existingItemColor].plata*2);
    
    existingItemParidad !== -1 && (saldo += array[existingItemParidad].plata*2);
    
    añadirEnLista(num, colCode);
    apostado = 0;
    saldo_text_html.innerHTML = `${saldo}`;
    apostado_text_html.innerHTML = `${apostado}`;
    array.splice(0, array.length);
}

function tiro(numero){
    this.num = numero;

    rojo.includes(numero) ? (this.col = "Rojo", this.colCode = "#ff0000") : negro.includes(numero) ? (this.col = "Negro", this.colCode = "#000000")
    : (this.col = "Verde", this.colCode = "#008000");
    numero % 2 === 0 ? this.paridad = "Par" : this.paridad = "Impar";
}

function añadirEnLista(number, color) {
    if (numerosSalidos.length > maxArraySize) {
        quitarDeLista();
        setTimeout( () => {añadirNumero(number, color)}, 500);
    }else{
        añadirNumero(number, color);
    }
}
function quitarDeLista() {
    const divToRemove = document.getElementsByClassName("numeros_salidos");
    if (divToRemove) {
        divToRemove[0].style.opacity = 0;
        setTimeout(() => {
            divToRemove[0].remove();
            numerosSalidos.shift();
        }, 500);
    }
}
function añadirNumero(number, color){
    const div = document.createElement('div');
    div.className = 'numeros_salidos';
    div.textContent = number;
    container.appendChild(div);
    div.style.backgroundColor = `${color}`;
    div.offsetHeight;

    if(!primeraCarga){
        numerosSalidos.push({number, color});
        localStorage.setItem("listaDeNumerosSalidos", JSON.stringify(numerosSalidos));
    }
    
}
