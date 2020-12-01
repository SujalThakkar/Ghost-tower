// adding global variables
var PLAY = 1;
var END = 0;
var gameState = PLAY;


var ghost,ghostImage;
var door,doorImage;
var climber,climberImage;
var tower,towerImage;
var doorGroup;
var climberGroup;
var inviblock,inviblockGrp;
var score = 0 ;

function preload(){
  
  // loading images
  ghostImage = loadImage("ghost-standing.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  towerImage = loadImage("tower.png");
  
  
}

function setup(){
  // creating canvas
  createCanvas(600,600)
  
  // creating tower
  tower = createSprite(300,300,10,10);
  tower.addImage(towerImage);
  tower.velocityY = 5;
  
  // creating ghost
  ghost = createSprite(300,300,20,20);
  ghost.addImage(ghostImage);
  ghost.scale = 0.5;
  
  // creating groups
  doorGroup = new Group();
  climberGroup = new Group();
  inviblockGrp = new Group();
  
}

function draw(){
  background(225);
  
 
  
  if(gameState === PLAY){
    
    score = score + Math.round(getFrameRate()/60);
   //     score = score + Math.round(getFrameRate()/200);
  //  score = Math.round(score);
    // jumping the ghost
  if(keyDown("space")){
    ghost.velocityY = -3;
  }
  
    // adding gravity to the ghost
  ghost.velocityY = ghost.velocityY + 0.8
        
    // moving the ghost to right
  if(keyDown("right")){
    ghost.x = ghost.x + 3 ;
  }
  
    //  moving the ghost to left
   if(keyDown("left")){
    ghost.x = ghost.x  - 3 ;
  }
   
    // infinite tower
    if(tower.y > 400){
    tower.y = 300;
  }
    
    // change gamestate to end
     if(climberGroup.isTouching(ghost)){
        gameState = END;
     }
    
  spawndoors(); 
    
  }
  
  else if(gameState === END){
    
    // making the ghost fall down
    ghost.velocityY = 5;   
  
    // stoping tower
    tower.velocityY = 0;
    
    // making velocity of groups to 0
    doorGroup.setVelocityYEach(0);
    inviblockGrp.setVelocityYEach(0); 
    climberGroup.setVelocityYEach(0);
    
    // destroying doors and climber
     doorGroup.destroyEach();
     climberGroup.destroyEach();
    
  }
  console.log(mouseX,mouseY);
  drawSprites();
  textSize(24);
  fill("white")
   text("score:" + score,31,28);
  
}

function spawndoors(){
  if(frameCount%200 === 0){
    // creating doors
    door = createSprite(Math.round(random(100,500)),-50);
    door.addImage(doorImage);
    door.velocityY = 5;
    door.lifetime = 200;
    doorGroup.add(door);
    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1 ;
    
    // creating climber
    climber = createSprite(door.x,10);
    climber.x = door.x
    climber.velocityY = 5;
    climber.addImage(climberImage);
    climber.lifetime = 200;
    climberGroup.add(climber);
    
    // creating invisibleblock
    inviblock = createSprite(200,20);
    inviblock.width = climber.width;
    inviblock.height = 2;
    inviblock.velocityY = 5
    inviblock.x = door.x;
    inviblock.visible = false;
    inviblock.lifetime = 800;
    inviblockGrp.add(inviblock);
  }
  
}