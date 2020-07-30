var dog,happyDog;
var database
var foodS,foodStock;
var Image_dog
var fedTime,lastFed;
var foodObj
var foodStock=20




function preload() {
   
 Image_dog=loadImage("images/dogImg.png")
happyDog=loadImage("images/dogImg1.png")
}
function setup(){
    var canvas = createCanvas(1200,400);
   

    database=firebase.database()
   
    feed=createButton("feed the dog")
    feed.position(700,95)
    feed.mousePressed(feedDog);

    addFood=createButton("Add Food")
    addFood.position(800,95)
    addFood.mousePressed(addFoods);
    
    dog = createSprite(250,250,10,10);
   dog.addImage("image",Image_dog)

   foodObj=new Food()
   dog.scale=0.3;
 foodStock =database.ref("food")
 foodStock.on("value",readStock)
  
}

function draw(){
    background(43,139,87);
    text(mouseX+","+mouseY,250,255)
textSize(15);
if(lastFed>=12){
    text("lastFeed : "+lastFed%12+"PM",350,30)
}else if(lastFed===0){
    text("lastFeed : 12 AM ",350,30)  
}else{
    text("lastFeed : "+lastFed +" AM ",350,30)  
}


foodObj.display();
drawSprites();
textSize(35)
fill("red")
text("food Left"+foodS,100,100)

//foodObj.display();
  
   
}
function readStock(data){
    foodS=data.val();
}

function writeStock(x){
    if(x<=0){
        x=0;
    }else{
        x=x-1;
    }
    database.ref('/').update({
        food:x
      })
    }
 function feedDog(){
     dog.addImage(happyDog)
   
     foodObj.updateFoodStock(foodObj.getFoodStock()-1);
     database.ref(' / ').update({
        food:foodObj. getFoodStock(),
        feedTime:hour()
     })
  
 }

 function addFoods(){
     foodS++
     database.ref(' / ').update({
        food:foodS
       
     })
 }