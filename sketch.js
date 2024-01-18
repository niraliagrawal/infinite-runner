var bg,bg_img;
var kid,kid_anim;
var wood,wood_img;
var lion,lion_img;
var fruit,fruit_img;
var gameover,game_img;
var restart,reset_img;
var woodspike,woodspike1,woodspike2;

var woodGroup,fruitGroup,lionGroup,lionGroup1;
var woodspikeGroup1,woodspikeGroup2,woodspikeGroup3;

var PLAY=2;
var START=1;
var END=0;
var gameState=START;

function preload(){
bg_img = loadImage("back.png");
kid_anim = loadAnimation("1.png","2.png","3.png");
wood_img = loadImage("branch.png");
lion_img = loadImage("lion.png");
fruit_img = loadImage("fruit.png");
game_img = loadImage("game over.png");
restart_img = loadImage("reset.png");
}

function setup() {

createCanvas(600,600);

//To create background sprite
bg=createSprite(300,400);
//Adding image to boy
bg.addImage(bg_img);
//To assign velocity to boy
bg.velocityY=(2);

//To create boy sprite
kid=createSprite(300,450,10,10);

//To load all animation of boy
kid.addAnimation("1.png",kid_anim);
kid.addAnimation("2.png",kid_anim);
kid.addAnimation("3.png",kid_anim);
kid.scale=0.7;

//Assigning initial value of score and chance
score=0;
chance=3;

//Declaring all groups
woodGroup=new Group();
fruitGroup=new Group();
lionGroup=new Group();


//To create gameover sprite
gameover=createSprite(300,270,10,10);
gameover.addImage(game_img);
//Scaling to adjust the image size
gameover.scale=1.8;

//To create restart sprite
restart=createSprite(300,350,10,10);
//Adding image to restart
restart.addImage(restart_img);
restart.scale=0.4;

}

function draw() {
 
 //To assign background
 background("white");
 //Start state
 if(gameState===START)
 {
   //Bakcground of start state
   background("black");
   
   //Assigning visibility false to all sprites
   gameover.visible=false;
   bg.visible=false;
   kid.visible=false;
   restart.visible=false;
   woodGroup.visible=false;
   lionGroup.visible=false;
   
   //To declare instructions
   textSize(20);
   fill("white");
   text("Read all the instructions before playing the game",80,100);
   text("1.Press Space Key to make jump",50,140);
   text("2.Collect fruits to score the points",50,170);
   text("3.Don't touch with wood lower,right and left upper",50,200);
   text("otherwise it will kill the kid and game will over",50,225);
   text("4.Jump on the wood to rest for sometime",50,255);
   text("5.Save the kid from lion",50,285);
   text("6.Don't let kid fall down otherswise game will get over",50,315);
   text("7.Use left and right Arrow key to move the kid left and right",50,345);
   text("8.With more score game will be more challenging",50,375);
   text("9.Try to score more and more as you can and share it",50,405);
   text("10.Protect your kid from getting killed by lion",50,435);
   textSize(40);
   text("ALL THE BEST!!",160,500);
   
   textSize(28);
   text("Press Space Key to Start the Game",100,550);
   
   //To start the game when space key is presses
   if(keyDown("space"))
   {
     gameState=PLAY; 
   }
 }
 //Game State play
 else if(gameState===PLAY)
 {
   //Assigning visibility true to all spites
   bg.visible=true;
   kid.visible=true;
   gameover.visible=false;
   restart.visible=false;
   
   //To provide infinite scrolling effect to background
   if(bg.y>400)
   {
     bg.y=height/2;  
   }   
 
   //To make the kid jump when space key is pressed
   if(keyDown("space"))
   {
     //Changning kid animation to jump when space is pressed
     kid.velocityY=-4.5;  
     kid.changeAnimation("2.png");
   }
 
   //To add gravity to kid
   kid.velocityY=kid.velocityY+0.8;
 
   //To make kid go right if space key is pressed
   if(keyDown(RIGHT_ARROW))
   {
     kid.changeAnimation("1.png"); 
     kid.velocityX=3;
   }
 
   //To make kid go left if left key is pressed
   if(keyDown(LEFT_ARROW))
   {
     kid.changeAnimation("2.png");
     kid.velocityX=-3;
   }
 
   //To make kid collide with woodGroup
   kid.collide(woodGroup);

   //To kid y velocity 0 when collides with woodGroup
   if(kid.isTouching(woodGroup))
   {
     kid.velocityY=0; 
   }
 
   //To increase the score when kid collects fruit
   if(kid.isTouching(fruitGroup))
   {
     score=score+10;
     fruitGroup.destroyEach();
   }
 
   //To decrease kid life when get hit by lion
   if(kid.isTouching(lionGroup))
   {
     chance=chance-1; 
     lionGroup.destroyEach();
     kid.changeAnimation("1.png");
   }
   
   //To decrease kid life when get hit by lion
   if(kid.isTouching(lionGroup1))
   {
     chance=chance-1; 
     lionGroup1.destroyEach();
     kid.changeAnimation("1.png");
   }
   
   //Calling other functions in draw function
   spawnWood();
   spawnlion();
   
   //To end the game if kid fall down out of the canvas
   if(kid.y>600)
   {
     gameState=END;
   }
   
   //To make kid life decrease when touched by inv wood spikes 3
   if(boy.isTouching(woodspikeGroup3))
   {
     chance=chance-1;
     woodspikeGroup1.destroyEach();
     kid.changeAnimation("1.png");
   }
   
   //To make kid life decrease when touched by inv wood spikes 1
   if(kid.isTouching(woodspikeGroup1))
   {
     chance=chance-1;
     woodspikeGroup1.destroyEach();
     kid.changeAnimation("1.png");
   }
   
   //To make kid life decrease when touched by inv wood spikes 2
   if(kid.isTouching(woodspikeGroup2))
   {
     chance=chance-1;
     woodspikeGroup2.destroyEach();
     kid.changeAnimation("1.png");
   }
   
   //To end the game if kid chance=0
   if(chance===0)
   {
     gameState=END;
   }
 }
 //End state
 else if(gameState===END)
 {
   //To stop everything and make sprites visible false
   kid.velocityX=0;
   kid.velocityY=0;
   gameover.visible=true;
   restart.visible=true;
   kid.visible=false;
   

   //To provide infinite scrolling effect to bg
   if(bg.y>400)
   {
     bg.y=height/2;  
   }   
   
   //To reset when clicked on restart button
   if(mousePressedOver(restart))
   {
     reset();
   }
 }
   //To draw the sprites
   drawSprites();
 
   
 //Displaying scores and chances
 fill("white");
 textSize(20);
 text("Score: "+score,50,50);
 text("Chances: "+chance,450,50);
 
}

function spawnWood()
{
 //To make wood appear at every 125 frame count
 if(frameCount%125===0)
 {
   //To create sprite
   wood=createSprite(Math.round(random(80,520)),0,10,10);
   //To add image
   wood.addImage(wood_img);
   //Scaling to adjust the image
   wood.scale=0.080;
   //To assign velocity to sprite
   wood.velocityY=(4.5+score/50);
   //To add respective sprite to respective groups
   woodGroup.add(wood);
   //Debugging
   wood.debug=false;
   //To set collider
   wood.setCollider("rectangle",0,0,2500,300);
   //To assign lifetime to sprite to avoid memory leaks
   wood.lifetime=width/wood.velocityY;
   
   //To create sprite
   fruit=createSprite(wood.x,-40,10,10);
   //To add image
   fruit.addImage(fruit_img);
   //To assign velocity to sprite
   fruit.velocityY=(4.5+score/50);
   //Scaling to adjust the image
   fruit.scale=0.020;
   //To add respective sprite to respective groups
   fruitGroup.add(fruit);
   //Debugging
   fruit.debug=false;
   //To assign lifetime to sprite to avoid memory leaks
   fruit.lifetime=width/fruit.velocityY;
   
   //To create sprite
   woodspike=createSprite(wood.x,28,150,3);
   //To assign velocity to sprite
   woodspike.velocityY=wood.velocityY;
   //To make woodspike visibility false
   woodspike.visible=false;
   //Debugging
   woodspike.debug=true;
   //To add respective sprite to respective groups
   woodspikeGroup1.add(woodsprike);
   //To assign lifetime to sprite to avoid memory leaks
   woodspike.lifetime=width/woodspike.velocityY;
   
   //To create sprite
   woodspike1=createSprite(wood.x-105,-5,5,10);
   //To assign velocity to sprite
   woodspike1.velocityY=wood.velocityY;
   //To make woodspike visibility false
   woodspike1.visible=false;
   //Debugging
   woodspike1.debug=true;
   //To add respective sprite to respective groups
   woodspikeGroup2.add(woodspike1);
   //To assign lifetime to sprite to avoid memory leaks
   woodspike1.lifetime=width/woodspike1.velocityY
   
   //To create sprite
   woodspike2=createSprite(wood.x+105,5,5,15);
   //To assign velocity to sprite
   woodspike2.velocityY=wood.velocityY;
   //To make woodspike visibility false
   woodspike2.visible=false;
   //Debugging
   woodspike2.debug=true;
   //To add respective sprite to respective groups
   woodspikeGroup3.add(woodspike2);
   //To assign lifetime to sprite to avoid memory leaks
   woodspike2.lifetime=width/woodspike2.velocityY;
  } 
}

function spawnlion()
{
 if(frameCount%150===0)
 {
   //To create sprite
   lion=createSprite(50,0,10,10);
   //To add image to sprite
   lion.addImage(lion_img);
   //To assign velocity to sprite
   lion.velocityX=(3+score/80);
   lion.velocityY=(4+score/80);
   //Scaling to adjust the image
   lion.scale=0.1;
   //To add respective sprite to respective groups
   lionGroup.add(lion);
   //To assign lfetime to sprite to avoid memory leaks
   lion.lifetime=width/lion.velocityX;
 
 }
 

}
function reset()
{
 //Change game state to play
 gameState=PLAY;
 //Assigning initial value back to score and chance
 score=0;
 chance=3;
 
 //To make gameover and restart visiblity false
 gameover.visible=false;
 restart.visible=false;
 //Make kid visibility true
 kid.visible=true;
 //Assigning back y position to kid
 kid.y=500;
}   
    

