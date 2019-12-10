//Array con todas las imagenes para poder usar en varias funciones
var imagenes = ["./Imagenes/1.jpg", "./Imagenes/2.jpg", "./Imagenes/3.jpg", "./Imagenes/4.jpg", "./Imagenes/5.jpg", "./Imagenes/6.jpg", "./Imagenes/7.jpg",];

//Variable con los errores para poder utilizar en varias funciones
var errores = 0;

//Variable con las vidas para poder utilizar en varias funciones
var lives = 6;

function obtenerPalabra() {

    //Obtener la Palabra para jugar      

    //Diccionario de palabras para el ahorcado
    var diccionario = ["domingo", "minar", "pijama", "prevenir", "ejercito", "construir", "placas", "recortar", "mama", "micro"];
    
    //Generar numero aleatorio para mas adelante elegir palabra aleatoria
    var indice = Math.round ( Math.random() * diccionario.length );

    //Creo una nueva variable con el contenido de indice para poder utilizarla en otra función ya que indice es una variable local
    window.tip = indice;

    //Guardar la palabra en una variable
    palabra	= diccionario[indice]; 
}

function iniciarJuego(){

    //Resetear Vidas y Errores a valores por defecto
    errores = 0;
    lives = 6;

    //Llamar a la funcion obtenerPalabra para volver a generar una palabra aleatoria
    obtenerPalabra();

    //Resetear el texto de las vidas
    document.getElementById("lives").textContent = "Vidas: " + lives;

    //Cambiar por cambiarImagenen() cuando lo tenga solucionado con errores.
    document.getElementById("img-hang").src = imagenes[0];
    
    //Reset del espacio asignado a la palabra con la que se va a jugar
    document.getElementById("palabra").textContent ="";

    //Bucle para asignar tantas barras y espacios como letras tenga la palabra
    for (i = 0; i < palabra.length ;i++ ) {

    //Cambio el contenido del parrafo a guiones y espacios
    document.getElementById("palabra").textContent +="_" + " ";
    }

    //Vuelvo a poner el Titulo original en el parrafo con id "tit1"
    document.getElementById("tit1").textContent = "Ahorcado Game";

}

function botones(letra) {
//Volver a generar la palabra hueco por hueco

    //Obtengo el valor de la palabra actual en una variable
    var letraCadena = document.getElementById("palabra").textContent;

    //Le hago un split a la palabra obtenida para poder quitar los espacios
    var cadena = letraCadena.split(" ");

    //Creo una variable vacia para asignarle los valores que necesite
    var s2 = "";
    
    //Defino una funcion de la letra pulsada y la paso a mayuscula para mas adelante
    //Poder llamar a la ID de los botones
    var letraUP = letra.toUpperCase(); 

    //Bucle para recorrer la longitud de la palabra a adivinar
    for (x = 0; x < palabra.length; x++) {

    //Si la letra esta en la posicion [X] de la palabra original, S2 vale la letra + " "
        if (palabra[x] == letra) {
            s2 += letra + " ";
        }

    //Si la letra no esta en la posición [X] de la palabra original vuelve a valer "_" + " " 
    //Cadena[x] es la _ de la posicion de la letra que no esta
        else {
            s2 += cadena[x] + " ";
        }
    }

    //Si la palabra contiene la letra pulsada, no hace nada
    if (palabra.includes(letra)) {

    }
    //Si la palabra no contiene la letra pulsada
    else {

        //Suma 1 error
        errores++;

        //Resta una vida
        lives--;

        //Llama a la funcion cambiarImagen y checkLives
        cambiarImagen();
        checkLives();
    }
    
    //Llama a la funcion cambiarColor para cambiar el color de fondo de los botones ya pulsados
    cambiarColor(letraUP);

  

    //Poner el contenido de S2 en el parrafo con id "palabra"
    document.getElementById("palabra").textContent = s2;

    //Llama a la función win para saber si el jugador ha ganado.
    win();
}

function cambiarImagen() {

    //Si tienes 6 errores o menos y 0 vidas o mas.
    if (errores <= 6 && lives >= 0) {

        //Cambia la imagen segun los errores que tengas, imagenes definidas en el array de arriba
        document.getElementById("img-hang").src = imagenes[errores];

    }
    
    //Vuelve a generar el texto de las vidas con las vidas que te quedan
    document.getElementById("lives").textContent = "Vidas: " + lives;

}

function cambiarColor(letra) { 
        //Cambia el color de fondo de los botones
        document.getElementById("button" + letra).style.backgroundColor = "#787878";
}

function resetColor() {

    //Guardo todas las letras que se puede jugar en un array, en mayusculas para poder llamar al ID de los botones mas abajo
    var abcd = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "M", "N", "L", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    //Activo el boton de las pistas
    document.getElementById("buttonTip").disabled = false;

    //Bucle con todas las letras del abecedario
    for (i = 0; i < 28 ; i++ ) {

        //Vuelvo a poner el color de los botones al que tenian al empezar
        document.getElementById("button" + abcd[i]).style.backgroundColor = "#F0F0F0";

        //Aprovecho el bucle para resetear los fondos y tambien activo los botones de nuevo
        document.getElementById("button" + abcd[i]).disabled = false;

    }

}

function pista() {
    //Array con todas las pistas para cada palabra, palabra 0, pista 0, etc...
    var pistas = ["Dia de la Semana", "Acción bajo tierra", "Se utiliza para dormir", "Tomar precauciones o medidas por adelantado para evitar un daño, un riesgo o un peligro.", "Milicia", "Acción que se hace en la obra", "Lo llevan una pareja de policias", "Rajoy era un experto", "Todos tenemos una", "Cuando algo es muy pequeño"]
    
    //Muestro la pista correspiendente a la palabra que se esta jugando.
    alert(pistas[tip]) 
}

function checkLives() {

    //Creo un array con todo el abecedario para poder desactivar los botones
    var abcd = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "M", "N", "L", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    //Si tengo 0 vidas o menos ejecuto lo siguiente
    if (lives <= 0) {

        //Cambio el texto del parrafo con id "lives" a "te quedan 0 vidas..."
        document.getElementById("lives").textContent = "Te quedan 0 vidas, vuelve a intentarlo";

        //Cambio el titulo del juego a "La palabra era" variable de la palabra que se estaba jugando
        document.getElementById("tit1").textContent = "La palabra era " + palabra;

        //Desactivo el boton de las pistas
        document.getElementById("buttonTip").disabled = true;

        //Bucle para desactivar todos los botones
        for (i = 0; i < 28 ; i++ ) {

        //Desactivo los botones    
        document.getElementById("button" + abcd[i]).disabled = true;
        }
    }
}

function win() {

    //Creo un array con todo el abecedario para poder desactivar los botones
    var abcd = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "M", "N", "L", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    //Guardo el contenido del parrafo sobre el que estoy jugando en una variable
    var res = document.getElementById("palabra").textContent;

    //Le quito los espacios a a la palabra para que pueda comprobarla
    res = res.replace(/ +/g, "");

    //Si la palabra que he obtenido es igual a la palabra que estaba jugando, ejecuto lo de dentro
    if (res == palabra) {

        //Cambio el texto del parrafo "tit1"
        document.getElementById("tit1").textContent = "Felicidades, ¡Has ganado!";

        //Cambio el texto del parrafo "lives"
        document.getElementById("lives").textContent = "Ya no las necesitas!";

        //Desactivo el boton de las pistas
        document.getElementById("buttonTip").disabled = true;
        //Bucle para todos los botones
        for (i = 0; i < 28 ; i++ ) {
    
        //Desactivo los botones
        document.getElementById("button" + abcd[i]).disabled = true;

        }

    }
}