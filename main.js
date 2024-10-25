let carX = 225;
let carY = 530;
let carW = 50;
let carH = 100;
let carS = 5;

let obstacleX;
let obstacleY = 0;
let obstacleW = 50;
let obstacleH = 100;
let obstacleS = 7;

let obstacle2X;
let obstacle2Y = 0;
let obstacle2W = 50;
let obstacle2H = 100;
let obstacle2S = 13;

let highwayImg, carImg, obstacleImg, obstacle2Img, explosionImg;
let car, highway, explosion, obstacle, obstacle2;
let game = "play";

function preload() {
  highwayImg = loadAnimation("estrada.jpg", "estrada2.jpg", "estrada3.jpg", "estrada4.jpg");
  carImg = loadImage("carro_azul.png");
  obstacleImg = loadImage("carro_vermelho.png");
  obstacle2Img = loadImage("carro_branco.png");
  explosionImg = loadAnimation("e1.png", "e2.png", "e3.png", "e4.png");
}

function setup() {
  let canvas = createCanvas(500, 600);
  obstacleX = random(0, 350);
  obstacle2X = random(0, 350);

  highway = createSprite(250, 300, 500, 600);
  highway.addAnimation("moving", highwayImg);

  car = createSprite(carX, carY, carW, carH);
  car.addImage(carImg);
  car.scale = 0.2;
  car.setCollider("rectangle", 0, 0, 250 , 560 ); // Ajuste da área de colisão
  
  obstacle = createSprite(obstacleX, obstacleY, obstacleW, obstacleH);
  obstacle.addImage(obstacleImg);
  obstacle.scale = 0.4;
  obstacle.setCollider("rectangle", 0, 0, 180 , 360 ); // Ajuste da área de colisão
  
  obstacle2 = createSprite(obstacle2X, obstacle2Y, obstacle2W, obstacle2H);
  obstacle2.addImage(obstacle2Img);
  obstacle2.scale = 0.4;
  obstacle2.setCollider("rectangle", 0, 0, 180 , 360 ); // Ajuste da área de colisão

  explosion = createSprite(car.position.x, car.position.y - 90);
  explosion.addAnimation("animation", explosionImg);
  explosion.scale = 1.5;
  explosion.visible = false;
}

function draw() {
  background("gray");

  obstacle.position.y += random(4,10);
  obstacle2.position.y += random(4,10);

  if (keyIsDown(LEFT_ARROW) && car.position.x >= 0) {
    car.position.x -= carS;
  }
  if (keyIsDown(RIGHT_ARROW) && car.position.x <= 450) {
    car.position.x += carS;
  }

  if (obstacle.position.y > 600) {
    obstacle.position.y = 0;
    obstacle.position.x = random(0, 450);
  }

  if (obstacle2.position.y > 600) {
    obstacle2.position.y = 0;
    obstacle2.position.x = random(0, 450);
  }

  // Checar colisão e exibir mensagem no console para depuração
  if (game === "play") {
    if (car.overlap(obstacle)) {
      console.log("Colisão com obstáculo 1 detectada");
      explosion.position.x = car.position.x;
      explosion.position.y = car.position.y;
      explosion.visible = true;
      car.visible = false;
      game = "end";
    }
    if (car.overlap(obstacle2)) {
      console.log("Colisão com obstáculo 2 detectada");
      explosion.position.x = car.position.x;
      explosion.position.y = car.position.y;
      explosion.visible = true;
      car.visible = false;
      game = "end";
    }
  }

  if (game === "restart") {
    explosion.visible = false;
    car.visible = true;
    car.position.x = 225;
    car.position.y = 530;
    game = "play";
  }

  drawSprites();
}

function jogar() {
  document.getElementById("instrucoes").style.display = "block";
}

function fechar() {
  document.getElementById("instrucoes").style.display = "none";
}

function dozero() {
  game = "restart";
}
