describe("Clase Fireaball", function(){

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
    
  SpriteSheet.map = {
      enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 },
      enemy_bee: { sx: 79, sy: 0, w: 37, h: 43, frames: 1 },
      enemy_ship: { sx: 116, sy: 0, w: 42, h: 43, frames: 1 },
      enemy_circle: { sx: 158, sy: 0, w: 32, h: 33, frames: 1 },
      explosion:{}
  };
  
  var enemies = {
    // B, C y E substituirán a los valores por defecto definidos en la
    // variable baseParameters del constructor Enemy(). Ver
    // comentarios en el código del constructor al final del fichero.
    basic: { x: 100, y: -50, sprite: 'enemy_purple', B: 100, C: 2 , E: 100 }

  };
  
    it("step", function(){
      var gb= new GameBoard();
      var fb= new FireBall(0,600,"left");
      gb.add(fb);
      spyOn(gb,"remove");
      fb.step(5000);
      //expect(gb.remove).toHaveBeenCalled();

    });
    
    it("draw", function(){
      var fb= new FireBall(0,600,"left");
      spyOn(SpriteSheet,"draw");
      fb.draw(ctx);
      expect(SpriteSheet.draw).toHaveBeenCalled();
    });
    
    
  

});
