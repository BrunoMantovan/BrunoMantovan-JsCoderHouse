/*let edad = prompt("ingrese su edad");
let aporte = 0;

if(edad >=18){
    aporte = prompt("¿hace cuantos años trabaja?");
    console.log(aporte);
}


if(edad >= 65 && aporte >= 30){
    alert("dale jubilate pa");
}else if(edad >= 18 && aporte >=30){
    alert("te faltan " + (65-edad) + " para jubilarte")
}else if(edad >= 65 && aporte <=29){
    alert("te faltan " + (30-aporte) + " para jubilarte")
}else if(edad >= 18 && aporte <= 0){
    alert("ponete a trabajar vago")
}else{
    alert("na, te falta una banda para jubilarte")
}*/


/* let numero = prompt("adivina el numero tenes " + intentos + " intentos")

let intentos = 3;
for(i = 1; i<=3; i++){
    intentos--;
    if(numero == 3){
        alert("le pegaste")
        break;
    }
    else if(numero == 2 || numero == 4){
        alert("estas cerca");
    }
    else if(numero > 5 && numero<10){
        alert("estas lejos");
    }
    else if(numero == 10){
        alert("no estas ni cerca");
    }
    else if(numero > 10){
        alert("era del 1 al 10")
    }
    else{
        alert("intenta de nuevo")
    }

} */
alert("Bienvenido a al juego de la ruleta");
let saldo = parseInt(prompt("Ingrese el saldo total"));

do{
    let deseaApostar = prompt("Escriba \'SI\' si desea apostar")

    if(deseaApostar == "si"){
        apuesta()
    }else{
        alert("Ha decidido retirarse, le quedan $" + saldo)
        break;
    }


    function apuesta(){
        let monto = parseInt(prompt("¿Cuánto va a apostar?"))
        let numero = parseInt(prompt("Elija el número al que apostar (0 - 36)"))
        let numeroRuleta = Math.floor(Math.random() * 37);


        if((saldo - monto) < 0){
            alert("No tiene suficientes fondos para realizar esa apuesta");
            apuesta();
        }
        else if(numero < 0 || numero >36){
            alert("Tiene que ser un número del 0 al 36");
            apuesta();
        }
        else if(numero == numeroRuleta){
            saldo = saldo + (monto*36);
            alert("Flecidades! Ganó $" + (monto*36) + ", le quedan $" + saldo)
            return saldo;
        }
        else if(numero != numeroRuleta){
            saldo = saldo - monto;
            alert("Lo sentimos, perdió $" + monto + ", le quedan $" + saldo)
            return saldo;
        }
    }

}while(saldo > 0)

if(saldo <= 0){
    alert("Lo perdió todo :c")
}