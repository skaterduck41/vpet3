//Create variables here
var dog, happyDog, dogIMG, happyDogIMG, bimg
var database
var foodS, foodStock
var feedDog, feed, foodTime, lastFeed, foodObj
function preload() {
  //load images here
  dogIMG = loadImage("images/dogImg1.png")
  happyDogIMG = loadImage("images/dogImg.png")
  milkIMG = loadImage("images/Milk.png")
  bimg = loadImage("images/Garden.png")
}

function setup() {
  createCanvas(1000, 500);
  console.log("firebase = " + firebase)
  database = firebase.database();

  feed = createButton("Feed the Dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  dog = createSprite(800, 200, 150, 150);
  dog.scale = 0.4;
  dog.addImage(dogIMG)
  // var xpos=200;
  addFood = createButton("Add Food")
  addFood.position(800, 95)
  addFood.mousePressed(addFoodStock)

}


function draw() {
  background(46, 139, 87)
  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDogIMG);
  }
  drawSprites();
  //add styles here
  fill("white")
  text("Remaining Food: " + foodS, 200, 50);
  // fill("red");
  //text("Remaining Food text ",200,200)
}

function readStock(data) {
  foodS = data.val();
  var xpos = 100, ypos = 200;
  for (i = 1; i <= foodS; i++) {
    var milk = createSprite(xpos, ypos, .5, .5);
    milk.scale = 0.1;
    milk.addImage(milkIMG);
    xpos = xpos + 50;
    if (i === 6) {
      xpos = 100;
      ypos += 200;
    }

  }
}

function writeStock(x) {
  if (x <= 0) {
    x = 0
  }
  else {
    x = x - 1
  }
  database.ref('/').update({
    Food: x
  })
}

function addFoodStock() {
  foodS = foodS + 1
  database.ref('/').update({
    Food: foodS
  })
}

function feedDog() {
  //mousePressed()
  dog.addImage(happyDogIMG);
  foodS = foodS - 1;
  database.ref('/').update({
    Food: foodS
  })
  //foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  //database.ref('/').update({
  //  FeedTime: hour()
  //})
  background(bimg);
}