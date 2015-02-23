window.onload = function() {
    
    "use strict";
    
    
    var game = new Phaser.Game( 840, 640, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update} );
    
    function preload() {
       game.load.tilemap('level1', 'assets/tilemaps.json', null, Phaser.Tilemap.TILED_JSON);
       game.load.image('gameTiles', 'assets/hospitla-tileset.png');
       game.load.image('bloodbag', 'assets/bloodbag.png');
       game.load.image('cooler', 'assets/cooler.png');
       game.load.image('exit', 'assets/exit.png');
       game.load.image('background', 'assets/background.png');
    }
    var bags;
    var cooler;
    var cursor;
    var blocktile
    var end;
    var bloodText;
    var blood = 20.0;
    var bloodTime
    
   function create() {
   	   var background = game.add.sprite(641, 0, 'background');
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
   	   
   	   var styleT = { font: "bold 25px Verdana", fill: "#C90000", align: "center" };
    	   bloodText = game.add.text(645, 40, 'Blood: 100%', styleT);
   	   
    	   bloodTime = game.time.create(false);
    	   bloodTime.add(20000, endLevel, this);
    	   
   	   cursor = game.input.keyboard.createCursorKeys();
   }
    
    function update() {
    	game.physics.arcade.collide(cooler, blocktile);
    	game.physics.arcade.overlap(cooler, bags, drinkBlood, null, this);
    	game.physics.arcade.overlap(cooler, end, exitToNext, null, this);
    	
    	cooler.body.velocity.x = 0;
    	cooler.body.velocity.y = 0;
    	
    	if(cursor.left.isDown){
    		if(!bloodTime.running){
    			bloodTime.start();
    		}
    		cooler.body.velocity.x = -64;	
    	}
    	else if(cursor.right.isDown){
    		if(!bloodTime.running){
    			bloodTime.start();
    		}
    		cooler.body.velocity.x = 64;
    	}
    	if(cursor.up.isDown){
    		if(!bloodTime.running){
    			bloodTime.start();
    		}
    		cooler.body.velocity.y = -64;
    	}
    	else if(cursor.down.isDown){
    		if(!bloodTime.running){
    			bloodTime.start();
    		}
    		cooler.body.velocity.y = 64;
    	}
    	if(bloodTime.seconds < 20){
    		bloodText.setText('Blood: ' + String(((20 - Math.floor(bloodTime.seconds))/20)*100) + '%');
    	}
    	else{
    		bloodText.setText('Blood: 0%');
    	}
    }
    function drinkBlood(player, item){
    	    item.kill();
    	    bloodTime.destroy();
    	    bloodTime = game.time.create(false);
    	    bloodTime.add(20000, endLevel, this);
    }
    function exitToNext(player, exit){
    	    player.kill();
    	    //call function to change level
    }
    function endLevel(){
    	    
    }
};
