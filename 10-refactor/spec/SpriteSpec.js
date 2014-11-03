describe("Clase Sprite", function(){

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
      ship: { sx: 0, sy: 0, w: 37, h: 42, frames: 1 }
  };
  
  var enemies = {
    // B, C y E substituirán a los valores por defecto definidos en la
    // variable baseParameters del constructor Enemy(). Ver
    // comentarios en el código del constructor al final del fichero.
    basic: { x: 100, y: -50, sprite: 'enemy_purple', B: 100, C: 2 , E: 100 }

	};
	
    it("setup", function(){
      var s = new Sprite();
      spyOn(s,"merge");
      s.setup('ship',{ vx: 0, reloadTime: 0.25, maxVel: 200 });
      expect(s.merge).toHaveBeenCalledWith({ vx: 0, reloadTime: 0.25, maxVel: 200 });
      expect(s.w).toEqual(37);
      expect(s.h).toEqual(42);
    });

    it("merge", function(){
      var s = new Sprite();
      s.merge({ vx: 0, reloadTime: 0.25, maxVel: 200 });
      expect(s.vx).toEqual(0);
      expect(s.reloadTime).toEqual(0.25);
      expect(s.maxVel).toEqual(200);
    });

    it("draw", function(){
      var s = new Sprite();
      s.setup('ship',{ vx: 0, reloadTime: 0.25, maxVel: 200 });
      spyOn(SpriteSheet,"draw");
      s.draw(ctx);
      expect(SpriteSheet.draw).toHaveBeenCalled();

    });



    

    
	

});