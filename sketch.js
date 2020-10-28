var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score,ground,invisibleGround,stime;

function preload(){
  
  
  monkey_running =          loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}
function setup() {
  createCanvas(400, 400);
  
  monkey= createSprite(80,320,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(200,350,400,2);
  
  stime=0
  score=0
  
  obstaclesGroup = createGroup();
  foodGroup = createGroup();
}

function draw() {
  background(rgb(70,500,2000));
  spawnObstacles();
  spawnFood();
  
  textSize(20);
  text(" Score: "+ score, 297,50);
  text("Survival time: "+ stime, 10,50);
  
  stime=Math.ceil(frameCount/frameRate());
  
  if(keyDown("space")&& monkey.y >= 300) {
  monkey.velocityY = -12}
  
  if (obstaclesGroup.isTouching(monkey)){
    monkey.setVelocityx(0);
    obstaclesGroup.setVelocityXEach(0);
  //  obstaclesGroup.setLifetimeEach(-1);
  }
    
  if (foodGroup.isTouching(monkey)){
    score=score+1
    foodGroup.destroyEach();
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  
  drawSprites();
}
 function spawnObstacles(){
   if(frameCount % 70 === 0){
  obstacle=createSprite(400,330,20,20);
  obstacle.addImage("obstacleImage",obstacleImage);
  
  obstacle.setCollider("circle",0,20,20);
  //obstacle.debug=true;
     
  //obstacle.lifetime=100
  obstacle.scale=0.1
  obstacle.velocityX=-(6+stime/2)
  obstaclesGroup.add(obstacle);
   }
}

function spawnFood(){
  if (frameCount % 80 === 0) {
    banana = createSprite(300,Math.round(random(160,190)),40,10);
    
    banana.addImage("bananaImage",bananaImage);
    banana.scale = 0.2;
    banana.velocityX = -2*(score+1);
     
    banana.lifetime = 200; 
    banana.setCollider("rectangle",0,0,banana.width,banana.height);
    //banana.debug=true;
    
    foodGroup.add(banana);
  }
}