'use strict'
class comida {

    constructor(escala) {
        this.scl = escala;
        this.x = Math.floor(Math.random() * (canvas.width / this.scl)) * this.scl;
        this.y = Math.floor(Math.random() * (canvas.height / this.scl)) * this.scl;
        if (this.x != 0) {
            this.x -= this.scl;
        }
        if (this.y != 0) {
            this.y -= this.scl;
        }


    }
    drawComida(ctx) {

        var comida = new Image();
        comida.src = "comida.svg";
        ctx.drawImage(comida, this.x, this.y, this.scl, this.scl);

    }

}
class cubo {

    constructor(x, y, escala) {

        this.x = x;
        this.y = y;
        this.siguiente;
        this.anterior;
        this.scl = escala;
    
    }

    pintarCubo(zxt) {
        zxt.beginPath();
        zxt.rect(this.x, this.y, this.scl,this.scl);
        zxt.fillStyle = "green";
        zxt.fill();
        zxt.lineWidth = 2;
        zxt.strokeStyle = 'black';
        zxt.stroke();
        zxt.closePath();
    }
    pintarCabezaIzquierda(ctx) {

console.log(this.scl);
        var izquierda = new Image();
       
        
        izquierda.src = "izquierda.svg";
        
        
            ctx.drawImage(izquierda, this.x, this.y, this.scl, this.scl);
        
       


    }
      pintarCabezaArriba(ctx) {


      
        
        var arriba = new Image();
    
    
        
        arriba.src = "arriba.svg";

        
            ctx.drawImage(arriba, this.x, this.y, this.scl, this.scl);
        




}

      pintarCabezaDerecha(ctx) {
        var derecha = new Image();
        derecha.src = "derecha.svg";
       
        
            ctx.drawImage(derecha, this.x, this.y, this.scl, this.scl);
      }
    pintarCabezaAbajo(ctx) {


        
        var abajo = new Image();
        abajo.src = "abajo.svg";
        
            ctx.drawImage(abajo, this.x, this.y, this.scl, this.scl);
        
      }
    
    
}
class snake {



    constructor(escala) {
        this.scl=escala;
        this.cubos = [];
        this.estado = 2;
        this.primero = new cubo(0, 0,this.scl);
        this.ultimo = this.primero;
        this.cubos.push(this.primero);
        this.crecer();
    }

    drawSnake(ct) {
        
        if(this.estado==0){this.cubos[0].pintarCabezaIzquierda(ct);}
        if(this.estado==1){this.cubos[0].pintarCabezaArriba(ct);}
        if(this.estado==2){this.cubos[0].pintarCabezaDerecha(ct);}
        if(this.estado==3){this.cubos[0].pintarCabezaAbajo(ct);}
        for (var i = 1; i < this.cubos.length; i++) {
            this.cubos[i].pintarCubo(ct);
            
        }

    }
    crecer() {
        let nuevoX;
        let nuevoY;
        if (this.estado == 0) {
            nuevoX = this.ultimo.x + this.scl;
            nuevoY = this.ultimo.y;
        }
        if (this.estado == 1) {
            nuevoX = this.ultimo.x;
            nuevoY = this.ultimo.y + this.scl;
        }
        if (this.estado == 2) {
            nuevoX = this.ultimo.x - this.scl;
            nuevoY = this.ultimo.y;
        }
        if (this.estado == 3) {
            nuevoX = this.ultimo.x;
            nuevoY = this.ultimo.y - this.scl;
        }

        var nuevo = new cubo(nuevoX, nuevoY, this.scl);
        nuevo.anterior = this.ultimo;
        this.ultimo.siguiente = nuevo;
        this.ultimo = nuevo;
        this.cubos.push(nuevo);


    }
    avanzar(escala) {
        let scl = escala;
        var aux = this.ultimo;
        while (aux != this.primero) {

            aux.x = aux.anterior.x;
            aux.y = aux.anterior.y;
            aux = aux.anterior;



        }
        if (this.estado == 0) {
            this.primero.x -= scl;
        }
        if (this.estado == 1) {
            this.primero.y -= scl;
        }
        if (this.estado == 2) {
            this.primero.x += scl;
        }
        if (this.estado == 3) {
            this.primero.y += scl;
        }




    } 
    reset() {

        this.estado = 2;
        this.cubos = [];
        this.primero = new cubo(0, 0,this.scl);
        this.ultimo = this.primero;
        this.cubos.push(this.primero);
        this.crecer();
        this.puntuacion=0;
    }

}
class JuegoSnake {
    constructor() {
        this.comidas = [];
        this.intervalo;
        this.canv = document.getElementById("canvas");
        this.puntuacion = 0;
        this.maximo=0;
        this.ctx = this.canv.getContext("2d");
        this.scl =Math.floor(window.innerWidth/15);
        this.canv.width = window.innerWidth;
        this.canv.height = Math.floor(window.innerHeight * 0.9);
        this.serpiente = new snake(this.scl);
        this.comidas.push(new comida(this.scl));
        this.draw = this.draw.bind(this);
        this.clicar=this.clicar.bind(this);
        this.levantada=this.levantada.bind(this);
        this.iniciar();

    }


    draw() {
       
        this.ctx.clearRect(0, 0, this.canv.width, this.canv.height);
        this.drawFondo(this.ctx);
        this.pintarPuntuacion(this.ctx);
        this.drawSanke();
        this.drawComida(this.ctx);
        this.comprobarChoqueMuro();
        this.comprobarChoqueSerpiente();
        this.comprobarComido();
        this.serpiente.avanzar(this.scl);
    }
    drawSanke(){
      this.serpiente.drawSnake(this.ctx);
    }
    levantada(e) {
        if (e.keyCode == 37 && this.serpiente.estado != 2) {
            this.serpiente.estado = 0;
            console.log("presinado");
            console.log(this.serpiente);
        }
        if (e.keyCode == 38 && this.serpiente.estado != 3) {
            this.serpiente.estado = 1;
            console.log("presinado");

        }
        if (e.keyCode == 39 && this.serpiente.estado != 0) {
            this.serpiente.estado = 2;
            console.log("presinado");

        }
        if (e.keyCode == 40 && this.serpiente.estado != 1) {
            this.serpiente.estado = 3;
            console.log("presinado");

        }

    }
    comprobarChoqueMuro() {
        if (this.serpiente.primero.x + this.scl > canvas.width) {
            this.serpiente.reset();
            this.puntuacion = 0;

        }
        if (this.serpiente.primero.x < 0) {
            this.serpiente.reset();
            this.puntuacion = 0;

        }

        if (this.serpiente.primero.y + this.scl > canvas.height) {
            this.serpiente.reset();
            this.puntuacion = 0;

        }

        if (this.serpiente.primero.y < 0) {
            this.serpiente.reset();
            this.puntuacion = 0;


        }

    }
    comprobarComido() {

        if (this.serpiente.primero.x == this.comidas[0].x && this.serpiente.primero.y == this.comidas[0].y) {

            this.comidas.pop(this.comidas[0]);
            this.comidas.push(new comida(this.scl));
            this.serpiente.crecer(this.scl);
            this.puntuacion++;
            console.log("0");

        }



    }
    drawComida(ctx) {

        this.comidas[0].drawComida(ctx);


    }
    drawFondo(ctx) {

        ctx.beginPath();
        ctx.rect(0, 0, this.canv.width, this.canv.height);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();




    }
    comprobarChoqueSerpiente() {

        for (var i = 1; i < this.serpiente.cubos.length; i++) {

            if (this.serpiente.primero.x == this.serpiente.cubos[i].x && this.serpiente.primero.y == this.serpiente.cubos[i].y) {
                this.serpiente.reset();

            }

        }


    }
    iniciar() {
        this.interval=setInterval(this.draw,120);
        console.log("iniciando");
        document.addEventListener("keydown",this.levantada,false);
        this.canv.addEventListener("click",this.clicar,false);


    }
    clicar(e){
     let w=window.innerWidth;
     let h=window.innerHeight;    
        if(e.pageX>w/2&&e.pageY>Math.floor(h*0.33)&&e.pageY<Math.floor(h*0.66)&&this.serpiente.estado!=0){
          this.serpiente.estado=2;
      } 
        if(e.pageX<w/2&&e.pageY>Math.floor(h*0.33)&&e.pageY<Math.floor(h*0.66)&&this.serpiente.estado!=2){
          this.serpiente.estado=0;
      } 
        if(e.pageX>w*0.33&&e.pageX<w*0.66&&e.pageY<h*0.33&&this.serpiente.estado!=3){
          this.serpiente.estado=1;
      } 
        if(e.pageX>w*0.33&&e.pageX<w*0.66&&e.pageY>h*0.66&&this.serpiente.estado!=1){
          this.serpiente.estado=3;
      } 
        
        
    }
    parar() {
        clearInterval(this.intervalo);
    }
    salir() {
        this.serpiente.reset();
        parar();
        //lo que quieras que pase al salir
    }
    pintarPuntuacion(){
this.ctx.font = "50px Arial";
this.ctx.fillStyle="rgba(0,0,0,0.3)";
this.ctx.textAlign = "center";
this.ctx.fillText("PUNTUACION:"+this.puntuacion,this.canv.width/2,this.canv.height/2);
this.ctx.fillText("PUNTUACION MAXIMA:"+this.maximo,this.canv.width/2,this.canv.height/1.5);
        if(this.puntuacion>this.maximo){this.maximo=this.puntuacion;}

        
    }
}
new JuegoSnake();



