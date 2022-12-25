const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1,box2;
var ground;
var pig;
var log;
var bird;
var backgroundImg;
var slingShot;
var platform;
var gameState="onSling";
var score = 0;

function preload(){
    backgroundImg=loadImage("sprites/bg.png");
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;
    
    platform = new Ground(150,305,300,170);
    box1 = new Box(700,320,70,70);
    ground = new Ground(600,height,1200,20);
    box2 = new Box(920,320,70,70);
    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    box5 = new Box(810,160,70,70);
    strokeWeight(8);
    stroke("green");
    pig = new Pig(810,350);
    pig1 = new Pig(810,220);
    log = new Log(810,260,300,PI/2);
    log1 = new Log(810,180,300,PI/2);
    log2 = new Log(760,120,150,PI/7);
    log3 = new Log(870,120,150,-PI/7);
  //  log4 = new Log(230,180,80,PI/2);
    bird = new Bird(100,100);
    slingshot = new SlingShot(bird.body,{x:200,y:50});
}

function draw(){
    if (backgroundImg)
    background(backgroundImg);

    noStroke();
    textSize(35);
    fill("yellow");
    text("score"+score,width-300,50);
    Engine.update(engine);
    box1.display();
    ground.display();
    box2.display();
    pig.display();
    log.display();
    box3.display();
    box4.display();
    box5.display();
    pig1.display();
    log1.display();
    log2.display();
    log3.display();
    bird.display();
    //log4.display();
    slingshot.display();
    platform.display();
}

function mouseDragged(){
    if(gameState!=="launched"){
    Matter.Body.setPosition(bird.body,{x:mouseX,y:mouseY});
}
}
function mouseReleased(){
    slingshot.fly();
    gameState="launched"
}
function keyPressed(){
    if(keyCode===32){
      //  slingShot.attach(bird.body);
    }
}
async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();
    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    if (hour>=06&&hour<=19){
        bg = "sprites/bg.png";
    }
    else {
        bg="sprites/bg2.jpg";
    }
    backgroundImg=loadImage(bg);
}