/*

  En el anterior prototipo (06-player), el objeto Game permite
  gestionar una colecci�n de tableros (boards). Los tres campos de
  estrellas, la pantalla de inicio, y el sprite de la nave del
  jugador, se a�aden como tableros independientes para que Game pueda
  ejecutar sus m�todos step() y draw() peri�dicamente desde su m�todo
  loop(). Sin embargo los objetos que muestran los tableros no pueden
  interaccionar entre s�. Aunque se a�adiesen nuevos tableros para los
  misiles y para los enemigos, resulta dif�cil con esta arquitectura
  pensar en c�mo podr�a por ejemplo detectarse la colisi�n de una nave
  enemiga con la nave del jugador, o c�mo podr�a detectarse si un
  misil disparado por la nave del usuario ha colisionado con una nave
  enemiga.


  Requisitos:

  Este es precisamente el requisito que se ha identificado para este
  prototipo: dise�ar e implementar un mecanismo que permita gestionar
  la interacci�n entre los elementos del juego. Para ello se dise�ar�
  la clase GameBoard. Piensa en esta clase como un tablero de un juego
  de mesa, sobre el que se disponen los elementos del juego (fichas,
  cartas, etc.). En Alien Invasion los elementos del juego ser�n las
  naves enemigas, la nave del jugador y los misiles. Para el objeto
  Game, GameBoard ser� un board m�s, por lo que deber� ofrecer los
  m�todos step() y draw(), siendo responsable de mostrar todos los
  objetos que contenga cuando Game llame a estos m�todos.

  Este prototipo no a�ade funcionalidad nueva a la que ofrec�a el
  prototipo 06.


  Especificaci�n: GameBoard debe

  - mantener una colecci�n a la que se pueden a�adir y de la que se
    pueden eliminar sprites como nave enemiga, misil, nave del
    jugador, explosi�n, etc.

  - interacci�n con Game: cuando Game llame a los m�todos step() y
    draw() de un GameBoard que haya sido a�adido como un board a Game,
    GameBoard debe ocuparse de que se ejecuten los m�todos step() y
    draw() de todos los objetos que contenga

  - debe ofrecer la posibilidad de detectar la colisi�n entre
    objetos. Un objeto sprite almacenado en GameBoard debe poder
    detectar si ha colisionado con otro objeto del mismo
    GameBoard. Los misiles disparados por la nave del jugador deber�n
    poder detectar gracias a esta funcionalidad ofrecida por GameBoard
    cu�ndo han colisionado con una nave enemiga; una nave enemiga debe
    poder detectar si ha colisionado con la nave del jugador; un misil
    disparado por la nave enemiga debe poder detectar si ha
    colisionado con la nave del jugador. Para ello es necesario que se
    pueda identificar de qu� tipo es cada objeto sprite almacenado en
    el tablero de juegos, pues cada objeto s�lo quiere comprobar si ha
    colisionado con objetos de cierto tipo, no con todos los objetos.

*/

describe("Clase GameBoard", function(){

    var canvas, ctx;

  beforeEach(function(){
  // Hemos enlazado en jasmine/spec/javascript/fixtures el fichero index.html
  loadFixtures('index.html');

  canvas = $('#game')[0];
  expect(canvas).toExist();

  ctx = canvas.getContext('2d');
  expect(ctx).toBeDefined();

  oldGame = Game;
  Game = {width: 320, height: 480};

    });

    afterEach(function(){
  Game = oldGame;
    });

    it("add:A�ade obj a objects", function(){
      var gb = new GameBoard();
      var foo="test";
      gb.add(foo);

      expect(gb.objects[0]).toEqual("test");
    });

    it("resetRemoved:Inicializar la lista de objetos pendientes de ser borrados", function(){
      var gb = new GameBoard();
      gb.resetRemoved();
      expect(gb.removed).toBeDefined();
    });

    it("remove:a�ade a la lista de objetos marcados", function(){
      var gb = new GameBoard();
      gb.resetRemoved();

      var foo="test";
      gb.remove(foo);
      expect(gb.removed[0]).toBeDefined();
    });

    it("finalizeRemoved:borra definitivamente", function(){
      var gb = new GameBoard();
      gb.resetRemoved();

      var foo="test";
      gb.add(foo);
      gb.remove(foo);
      expect(gb.objects[0]).toEqual("test");
      gb.finalizeRemoved();
      expect(gb.objects[0]).not.toEqual("test");
    });    

    it("iterate:aplica funcName a todos los objects", function(){
      var gb = new GameBoard();
      var dum= new function(){
        this.func= function(){return true};
      };
      spyOn(dum,"func");
      gb.add(dum);
      gb.iterate('func');

      expect(dum.func).toHaveBeenCalled();

    }); 


    it("detect:devuelve el primer true", function(){
      var gb = new GameBoard();
      var dum ="test";
      var dum2="test2";  
      gb.add(dum);
      gb.add(dum2);
      var dumf= function (){
        return true;
      }; 
      expect(gb.detect(dumf)).toBe("test");
    }); 

    it("step:aplica el step", function(){
      var gb = new GameBoard();
      var dum ="test";
      var dum2="test2";  

      gb.add(dum);
      gb.add(dum2);
      spyOn(gb,"resetRemoved");
      spyOn(gb,"iterate");
      spyOn(gb,"finalizeRemoved");

      gb.step(1);

      expect(gb.resetRemoved).toHaveBeenCalled();
      expect(gb.iterate).toHaveBeenCalledWith('step',1);
      expect(gb.finalizeRemoved).toHaveBeenCalled();

    });

    it("draw: dibuja llamando a iterate", function(){
      var gb = new GameBoard();
      spyOn(gb,"iterate")
      gb.draw(ctx);

      expect(gb.iterate).toHaveBeenCalledWith("draw",ctx);

    }); 



});
