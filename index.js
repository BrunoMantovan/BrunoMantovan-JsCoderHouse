const rojo = [1, 3, 5 ,7 ,9, 12, 14 ,16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
const negro = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
const limitesAngulos = [0, 9.72973, 19.45945, 29.18919, 38.91892, 48.64865, 58.37838, 68.10811, 77.83784, 87.56757, 97.29730, 107.02703,
    116.75676, 126.48649, 136.21622, 145.94595, 155.67568, 165.40541, 175.13514, 184.86486, 194.59459, 204.32432, 214.05405, 223.78378,
    233.51351, 243.24324, 252.97297, 262.70270, 272.43243, 282.16216, 291.89189, 301.62162, 311.35135, 321.08108, 330.81081, 340.54054, 350.27027];
const numerosEnRuleta = [26, 3, 35, 12, 28, 7, 29, 18, 22, 9, 31, 14, 20, 1, 33, 16, 24, 5, 10, 23, 8, 30, 11, 36, 13, 27, 6, 34, 17, 25, 2, 21, 4, 19, 15, 32, 0];
const numerosSalidos = [];
const numerosElegidos = [];

const array = [];
let saldo = 5000;

const ruleta = document.querySelector(".ruleta");
const jugar = document.querySelector(".jugar");
let botones = document.querySelectorAll(".boton");

let montoNumero = 0;
let montoColor = 0;
let montoParidad = 0;
let apostado = 0;
let plata = 100;

let saldo_text_html = document.querySelector(".saldo_cantidad");
let apostado_text_html = document.querySelector(".apostado_cantidad");

saldo_text_html.innerHTML = `${saldo}`;
apostado_text_html.innerHTML = `${apostado}`;



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
    // If the numero already exists in the array, increase plata by 20
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
    
    /* const numeroRandom = Math.floor(Math.random() * 37); */   
    const deg = (2000 + Math.random()*2000);

    ruleta.style.transition = `all 5s ease`;
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
        console.log(numeroRandom);
    
        const numeroTirado = new tiro(numeroRandom);
        console.log(numeroTirado);

        const existingItemNumero = array.findIndex((item) => item.valor == numeroTirado.num);
        const existingItemColor = array.findIndex((item) => item.valor == numeroTirado.col);
        const existingItemParidad = array.findIndex((item) => item.valor == numeroTirado.paridad);
        console.log(existingItemNumero);
    
        if (existingItemNumero !== -1) {
          console.log("Original saldo:", saldo);  
          
          saldo += array[existingItemNumero].plata*36;
          console.log("Updated saldo:", saldo);
        }
        if (existingItemColor !== -1) {
            saldo += array[existingItemColor].plata*2;
        }
        if (existingItemParidad !== -1) {
            saldo += array[existingItemParidad].plata*2;
        }
        
        console.log(array);
        apostado = 0;
        saldo_text_html.innerHTML = `${saldo}`;
        apostado_text_html.innerHTML = `${apostado}`;
        array.splice(0, array.length);
}

function tiro(numero){
    this.num = numero;

    rojo.includes(numero) ? this.col = "Rojo" : negro.includes(numero) ? this.col = "Negro" : this.col = "Verde";
    numero % 2 === 0 ? this.paridad = "Par" : this.paridad = "Impar";
}
/* while(saldo > 0){
    numerosElegidos.splice(0, numerosElegidos.length);
    montoNumero = 0;
    montoColor = 0;
    color = 0;

    
    let deseaApostar = prompt("Escriba \'Y\' si desea apostar");
    if(deseaApostar == "y" || deseaApostar == "Y"){
        let apostarNumero = prompt("Escriba \'Y\' si desea apostar a número");
        if(apostarNumero == "y" || apostarNumero == "Y"){
            const catidadDeNumeros = Number(prompt("¿A cuantos números desea apostarles?"))
            apuestaNumero(catidadDeNumeros)
        }
        let apostarColor = prompt("Escriba \'Y\' si desea apostar a color");
        if(apostarColor == "y" || apostarColor == "Y"){
            apuestaColor();
        }
        ruleta(numerosElegidos, montoNumero, montoColor);
    }else{
        alert("Ha decidido retirarse, le quedan $" + saldo)
        break;
    }
}
function apuestaNumero(cantidad){
    for(i = 0; i < cantidad; i++){
        const numero = Number(prompt("Elija el número del 0 al 36"))
        if(numero < 0 || numero >36){
            alert("Tiene que ser un número del 0 al 36");
            i--;
        }else{
            numerosElegidos.push(numero);
        }
    }
    montoNumero = parseInt(prompt("¿Cuánto va a apostar a cada número?"))
    if((saldo - (cantidad * montoNumero)) >= 0){
        saldo = (saldo - (cantidad*montoNumero));
        
    }else{
        alert("no tiene fondos suficientes");
        apuesta(cantidad);
    }
    console.log(numerosElegidos);   
}

function apuestaColor(){
    const colorElegido = Number(prompt("Escriba 1 si desea elegir rojo y 2 si desea elegir negro"));
    if(colorElegido == 1){
        color = "rojo";
    }else if(colorElegido == 2){
        color = "negro";
    }
    montoColor = Number(prompt("Eligió el color " + color + ". ¿Cuánto desea apostar?"));
    if((saldo - montoColor) >= 0){
        saldo = (saldo - montoColor);            
    }else{
        alert("no tiene fondos suficientes");
        apuestaColor();
    }
}


function ruleta(){
    let numeroRuleta = Math.floor(Math.random() * 37);
    console.log(numeroRuleta);
    const numeroTirado = new tiro(numeroRuleta);
    console.log(numeroTirado);
    numerosSalidos.push(numeroTirado);
    
    alert("Numero: " + numeroTirado.num + ", Color: " + numeroTirado.col + ", " + numeroTirado.paridad);


    
    
    if(numerosElegidos.find((element) => element == numeroRuleta)){
        saldo = saldo + (montoNumero*36);
        console.log("gano $" + montoNumero*36);
    }


    if(color == numeroTirado.col){
        saldo = saldo + (montoColor*2);
    }

    alert("Saldo = " + saldo)
}


function tiro(numero){
    this.num = numero;
    if(rojo.includes(numero)){
        this.col = "rojo";
    }else{
        this.col = "negro";
    }
    if(numero % 2 === 0){
        this.paridad = "par";
    }else if( numero % 2 !==0){
        this.paridad = "impar"
    }
}
if(saldo <= 0){
    alert("Lo perdió todo :c")
}


 */