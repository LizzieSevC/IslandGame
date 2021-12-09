//Variable del lienzo
let canvas;
//Variable del conexto
let ctx;
//FPS
const FPS = 50;

//Ancho de la "ficha", cuadros del laberinto
let anchoF = 50;
let altoF = 50;

//Ancho de la ficha del player
let anchoP = 20;
let altoP = 20;

//Tipo de ficha
let pasto = "#007e51"; //0
let agua = "#5270ff"; //1
let tierra = "#512101"; //2
let point = "#E2C957"; //3
let start = "#ff9900"; //4
let goal = "#52ff59" //5


//Escenario Array - Matriz
let escenario = [
    [1,4,4,1,1,1,1,1,1,1,1,1,1,1,1,2,0,0,3,1], 
    [1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,1,0,1], 
    [1,0,0,0,0,0,1,0,0,0,2,0,0,0,0,0,1,1,0,1], 
    [1,0,0,0,0,0,1,0,0,0,1,0,0,3,0,0,1,1,0,1], 
    [1,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,1,0,1],
    [1,0,3,0,0,0,2,0,0,0,1,0,0,0,0,0,1,0,0,1], 
    [1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,3,0,1,1], 
    [1,0,0,0,0,0,1,0,3,0,1,0,3,0,0,1,1,0,1,1], 
    [1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,2,1,0,0,1], 
    [1,1,1,2,1,1,1,1,2,1,1,1,1,1,1,2,1,1,0,1],
    [1,1,1,2,1,1,1,1,2,1,1,1,1,1,1,2,1,0,0,1],
    [1,0,0,0,0,0,1,0,0,0,1,3,0,0,0,2,1,0,1,1], 
    [1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,0,1], 
    [1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,1,0,1], 
    [1,2,0,0,0,3,1,0,3,0,1,0,0,0,3,1,1,1,0,1], 
    [1,2,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,0,0,1],
    [1,2,0,0,0,0,0,2,1,1,1,1,1,2,1,3,0,0,1,1],
    [1,2,1,3,0,1,1,2,0,0,0,0,0,2,1,1,1,0,0,1],
    [1,2,1,1,2,1,1,2,1,0,0,0,1,2,1,1,1,1,0,1],
    [1,2,0,3,0,0,0,2,1,1,5,5,1,0,0,0,0,0,3,1]
]

//Construir escenario
function dibujarEscenario(){
    let color;
    //Recorror el alto del escenario
    for(y = 0; y < escenario.length; y++){
        //Recorrer el ancho del escenario
        for(x = 0; x < escenario[y].length; x++){
            //Compara para reemplazar la ficha
            if(escenario[y][x] == 0){
                color = pasto;
            }
            if(escenario[y][x] == 1){
                color = agua;
            }
            if(escenario[y][x] == 2){
                color = tierra;
            }
            if(escenario[y][x] == 3){
                color = point;
            }
            if(escenario[y][x] == 4){
                color = start;
            }
            if(escenario[y][x] == 5){
                color = goal;
            }
            ctx.fillStyle = color
            ctx.fillRect(x*anchoF, y*altoF, anchoF, altoF)
        }
    }
}

//Declaramos la función del pj
let player = function (){
    //Atributo de esta clase
    this.y = 0;
    this.x = 1;
    this.color = "black"

    //Métodos
    this.dibuja = function(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x*anchoF, this.y*altoF, anchoP, altoP)
    }

    this.arriba = function(){
        if (this.margenes(this.x, this.y-1) == false){
        this.y--}
    }

    this.abajo = function(){
        if (this.margenes(this.x, this.y+1) == false){
        this.y++}
    }

    this.izquierda = function(){
        if (this.margenes(this.x-1, this.y) == false){
        this.x--}
    }

    this.derecha = function(){
        if (this.margenes(this.x+1, this.y) == false){
        this.x++}
    }

    this.margenes = function(x,y){
        let colisiones = false;
        if(escenario[y][x] == 1){
            colisiones = true;
        }
        return(colisiones)
    }


  /*  this.die = function(){
    if (escenario[this.x][this.y] == 1 )
    this.x = 0;
    this.y = 0;
    }
*/
}

//Variable global
let protagonista;

//Esta funcion activa todo 
function inicializa(){
    canvas = document.getElementById("canva")
    ctx = canvas.getContext("2d")

    //Creo el jugador
    protagonista = new player();

        document.addEventListener('keydown',function(tecla){
        if(tecla.key == "w" || tecla.key == "ArrowUp"){
            protagonista.arriba()
        }
        if(tecla.key == "s" || tecla.key == "ArrowDown"){
            protagonista.abajo()
        }
        if(tecla.key == "a" || tecla.key == "ArrowLeft"){
            protagonista.izquierda()
        }
        if(tecla.key == "d" || tecla.key == "ArrowRight"){
            protagonista.derecha()
        }
    }    
    )

    //cantidad de tiempo que va a usar el pj para moverse
    setInterval( function(){
    principal()
    },1000/FPS)

}

//Esta función centraliza las demas funciones
function principal(){

    dibujarEscenario()
    protagonista.dibuja();

}


