const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var rightWall;
var leftWall;
var jointLink;
var bridge;
var jointPoint;
var stone;
var stones = [];
var engine ;
var world;
var ground;
var zombie1,zombie2,zombie3,zombie4;
var bg_Img;
var zombie;
var breakButton;
var wood_Img;
var stone_Img;
var collided=false;
var sad_Zombie;

function preload(){
zombie1 = loadImage('zombie1.png');
zombie2 = loadImage("zombie2.png");
zombie3 = loadImage("zombie3.png");
zombie4 = loadImage("zombie4.png");

bg_Img=loadImage("background.png");

wood_Img= loadImage("wood.png");

sad_Zombie= loadImage("sad_zombie.png")

stone_Img = loadImage("stone.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground =new Base(0,height-10,width*2,20);

  leftWall=new Base(100,height-300,200,height/2+100)

  rightWall=new Base(width-100,height-300,200,height/2+100);

  bridge =new Bridge(30,{x:-50,y:height/2-140});

  jointPoint =new Base(width-230,height/2-100,40,20);

  Matter.Composite.add(bridge.body,jointPoint);
 jointLink = new Link(bridge,jointPoint);

   for (var i = 0; i <= 8; i++){
    var x = random(width / 2 - 200,width / 2 + 300);
    var y = random(-100, 100);
    var stone = new Stone(x,y,80,80);
    stones.push(stone);
  }
    zombie=createSprite(width/2,height-110);
    zombie.addAnimation("lefttoright",zombie1,zombie2,zombie1);
    zombie.addAnimation("righttoleft",zombie3,zombie4,zombie3);
    zombie.addImage("sad",sad_Zombie);
    zombie.scale = 0.1;
    zombie.velocityX = 10;

    breakButton = createButton("");
    breakButton.position(width - 200,height/2-50);
    breakButton.class("breakButton");
    breakButton.mouseClicked(handleButtonPress);

}


function draw() {
  background(bg_Img);
  Engine.update(engine);

  bridge.show();
  //jointpoint.show();
 
for (var stone of stones){
  stone.show();
  var pos=stone.body.position;
  var distance=dist(zombie.position.x,zombie.position.y,pos.x,pos.y);
  if(distance<=50){
    zombie.velocityX=0;
    Matter.Body.setVelocity(stone.body,10,-10);
    collided=true;
    zombie.changeImage("sad");
  }
}
if(zombie.position.x>=width-300 && !collided){
zombie.velocityX=-10
zombie.changeAnimation("righttoleft")
}
if(zombie.position.x<=300 && !collided){
  zombie.velocityX=+10
  zombie.changeAnimation("lefttoright")
}

drawSprites();

}



function handleButtonPress(){
jointLink.dettach();
setTimeout(() => {
  bridge.break();
}, 1500);

}
