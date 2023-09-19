
alert("Bienvenido a al juego de la ruleta");
let saldo = Number(prompt("Ingrese el saldo total"));
const rojo = [1, 3, 5 ,7 ,9, 12, 14 ,16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
const negro = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 25];
const array = [];

const numerosSalidos = [];
const numerosElegidos = [];

let montoNumero = 0;
let montoColor = 0;
let color = 0;


while(saldo > 0){
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

    if(numerosElegidos.includes(numeroRuleta)){
        saldo = saldo + (montoNumero*36);
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






let botones = document.querySelectorAll(".boton");
for(let i=0; i<botones.length; i++){
    botones[i].addEventListener("click", function(){
        let numero = this.innerText;
        let plata = 100;
        const elegido = new placeBet(numero, plata);
       
        // Check if the array already contains the numero
        const existingItemIndex = array.findIndex(item => item.num === numero);

    if (existingItemIndex !== -1) {
      // If the numero already exists in the array, increase plata by 20
      array[existingItemIndex].plata += plata;
      console.log(`Increased plata for Numero ${numero} to ${array[existingItemIndex].plata}`);
    } else {
      const elegido = new placeBet(numero, plata);
      array.push(elegido);
      console.log(array);
    }   
    });
}

function placeBet(numero, plata){
    this.num = numero;
    this.plata = plata;
}