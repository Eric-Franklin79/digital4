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
       game.load.image('restartLevel', 'assets/restart.png');
    }
    var bloodBags = 0;
    var bags;
    var cooler;
    var cursor;
    var blocktile
    var end;
    var bloodText, restartText, scoreText;
    var blood = 20.0, score = 0, finalScore = 0;
    var bloodTime;
    var map;
    var reset;
    var resetScreen;
    var currentLevel = 1;
    var levelString = '';
    var playerx = 0, playery = 0, bloodBagID = 0, endID = 0;
    
   function create() {
   	   var background = game.add.sprite(641, 0, 'background');
   	   levels(currentLevel);
   	   resetScreen = game.add.sprite(0,0, 'restartLevel');
   	   resetScreen.kill();
   	   var styleR = { font: "bold 25px Verdana", fill: "#FFFFFF", align: "center" };
   	   restartText = game.add.text( 240, 320, "", styleR);
   	   
   	   //******* HUD bar *******
   	   //levle counter
   	   //what the controls are
   	   
    	   bloodTime = game.time.create(false);
    	   bloodTime.add(20000, endLevel, this);
    	   
   	   cursor = game.input.keyboard.createCursorKeys();
   	   reset = game.input.keyboard.addKey(Phaser.Keyboard.R);
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
    		endLevel(false);
    	}
    	if(reset.isDown){
    		endLevel(true);
    	}
    }
    function drinkBlood(player, item){
    	    item.kill();
    	    bloodTime.destroy();
    	    bloodTime = game.time.create(false);
    	    bloodTime.add(20000, endLevel, this);
    	    bloodBags--;
    	    score += 10;
    	    scoreText.setText("Score: " + String(score));
    }
    function exitToNext(player, exit){
    	    player.kill();
    	    finalScore += (bloodBags * 30);
    	    finalScore += score;
    	    scoreText.setText("Score: " + String(finalScore));
    	    currentLevel++;
    	    levels(currentLevel);
    }
    function endLevel(reset){
    	   resetScreen.kill()
    	   bags.destroy();
    	   end.destroy();
    	   cooler.kill();
    	   bloodTime.destroy();
    	   restartText.setText("");
    	   bloodText.setText("");
    	   scoreText.setText("");
	   if(reset){
	   	cooler.destroy();
		bloodTime = game.time.create(false);
		bloodTime.add(20000, endLevel, this);
		levels(currentLevel);
    	   }
    	   else{
    	   	resetScreen.revive();
    	   	restartText.setText("Press R to Restart the Level");	
    	   }
    }
    function levels(level){
    	   if(level === 1){
    	    	    levelString = 'level1';
    	    	    playerx = 60;
    	    	    playery = 600;
    	    	    bloodBagID = 33;
    	    	    endID = 23;
    	    	    bloodBags = 6;
    	   }
    	   map = game.add.tilemap(levelString);
   	   map.addTilesetImage('hospitla-tileset', 'gameTiles');
   	   var backgroundLayer = map.createLayer('background');
   	   blocktile = map.createLayer('blocktile');
   	   map.setCollisionBetween(1, 100, true, 'blocktile');
   	   //create the player
   	   cooler = game.add.sprite(playerx, playery, 'cooler');
   	   game.physics.arcade.enable(cooler);
   	   //Text for each level
   	   var styleT = { font: "bold 25px Verdana", fill: "#C90000", align: "center" };
   	   bloodText = game.add.text(645, 40, 'Blood: 100%', styleT);
   	   var styleS = { font: "bold 25px Verdana", fill: "#FFFFFF", align: "center" };
   	   scoreText = game.add.text(645, 70, 'Score: ' + String(finalScore));
   	   //create the sprites for the game objects
   	   bags = game.add.group();
   	   bags.enableBody = true;
   	   map.createFromObjects('blood bags', bloodBagID, 'bloodbag', 0, true, false, bags);
   	   end = game.add.group();
   	   end.enableBody = true;
   	   map.createFromObjects('end', endID, 'exit', 0, true, false, end);
   	   score = finalScore;
   	   //End of the game ---- win condition
   	   if(level === 2){
   	   	   endGame();
   	   }
    }
    function endGame() {
    	    //create an end screen
    	    //display the score
    	    //add to the end of level array?
    }
    
};
