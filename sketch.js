let walkingAnimations;

function preload(){
    loadImage("assets/SpelunkyGuy.png");
    loadImage("assets/Green.png");
    loadImage("assets/Yellow.png");
    loadImage("assets/monkeys.png");
}

function setup() {
    createCanvas(400,400);
    imageMode(CENTER);

    walkingAnimations = [new WalkingAnimation(loadImage("assets/SpelunkyGuy.png"),80,80,100,150,9),
        new WalkingAnimation(loadImage("assets/Green.png"),80,80,45,150,9),
        new WalkingAnimation(loadImage("assets/Yellow.png"),80,80,150,250,9),
        new WalkingAnimation(loadImage("assets/monkeys.png"),80,80,95,256,6)];
}

function draw() {
    background(220);
    
    for(let i = 0; i<walkingAnimations.length; i++){
        walkingAnimations[i].draw();
    }
}

function keyPressed(){
    for(let i = 0; i<walkingAnimations.length; i++){
        walkingAnimations[i].keyPressed();
    }
}

function keyReleased(){
    for(let i = 0; i<walkingAnimations.length; i++){
        walkingAnimations[i].keyReleased();
    }
}

class WalkingAnimation {
    constructor(spriteSheet,sw,sh,dx,dy,animationLength) {
        this.spriteSheet = spriteSheet;
        this.sw = sw;
        this.sh = sh;
        this.dx = dx;
        this.dy = dy;
        this.u = 0;
        this.v = 0;
        this.animationLength = animationLength;
        this.currentFrame = 0;
        this.moving = 0;
        this.xDirection = 1;
    }

    draw(){

        if(this.moving != 0)
            this.u = this.currentFrame % this.animationLength;
        else
            this.u = 0;

        push();
        translate(this.dx,this.dy);
        scale(this.xDirection,1);
    
        image(this.spriteSheet,0,0,this.sw,this.sh,this.u*this.sw,this.v*this.sh,this.sw,this.sh);
        pop();

        if(frameCount % 8 == 0){
            this.currentFrame++;
        }

        this.dx += this.moving;
    }
    keyPressed(){
        if(keyCode === RIGHT_ARROW){
            this.moving = 1;
            this.xDirection = 1;
            this.currentFrame = 1;
        }
        else if(keyCode === LEFT_ARROW){
            this.moving = -1;
            this.xDirection = -1;
            this.currentFrame = 1;
        }
    }

    keyReleased(){
        if(keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW){
            this.moving = 0;
        }
    }
}