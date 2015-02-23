window.onload = function() {
    
    "use strict";
    
    
    var game = new Phaser.Game( 840, 640, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update} );
    
    function preload() {
       game.load.tilemap('level1', 'assets/tilemaps.json', null, Phaser.Tilemap.TILED_JSON);
       game.load.image('gameTiles', 'assets/hospitla-tileset.png');
       game.load.image('bloodbag', 'assets/bloodbag.png');
       game.load.image('cooler', 'assets/cooler.png');
       game.load.image('exit', 'assets/exit.png');
    }
    var bags;
    var cooler;
    var cursor;
    var blocktile
    var end;
   
    
   function create() {
   	   var map = game.add.tilemap('level1');
   	   map.addTilesetImage('hospitla-tileset', 'gameTiles');
   	   var backgroundLayer = map.createLayer('background');
   	   blocktile = map.createLayer('blocktile');
   	   map.setCollisionBetween(1, 100, true, 'blocktile');
   	   
   	   bags = game.add.group();
   	   bags.enableBody = true;
   	   map.createFromObjects('blood bags', 33, 'bloodbag', 0, true, false, bags);
   	   end = game.add.group();
   	   end.enableBody = true;
   	   map.createFromObjects('end', 23, 'exit', 0, true, false, end);
   	   cooler = game.add.sprite(60, 600, 'cooler');
   	   game.physics.arcade.enable(cooler);
   	   
   	   cursor = game.input.keyboard.createCursorKeys();
   }
    
    function update() {
    	game.physics.arcade.collide(cooler, blocktile);
    	game.physics.arcade.overlap(cooler, bags, drinkBlood, null, this);
    	game.physics.arcade.overlap(cooler, end, exitToNext, null, this);
    	
    	cooler.body.velocity.x = 0;
    	cooler.body.velocity.y = 0;
    	
    	if(cursor.left.isDown){
    		cooler.body.velocity.x = -64;	
    	}
    	else if(cursor.right.isDown){
    		cooler.body.velocity.x = 64;
    	}
    	if(cursor.up.isDown){
    		cooler.body.velocity.y = -64;
    	}
    	else if(cursor.down.isDown){
    		cooler.body.velocity.y = 64;
    	}
    }
    function drinkBlood(player, item){
    	    item.kill();
    	    //increase blood level
    }
    function exitToNext(player, exit){
    	    player.kill();
    	    //call function to change level
    }
};
