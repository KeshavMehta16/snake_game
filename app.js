let canvas = document.querySelector('canvas');
let cts = canvas.getContext('2d');

// //solid rectangle
// cts.fillStyle =  "white";
// cts.fillRect(100,100,50,50);   //x,y,width,height;

// //only outlining
// cts.strokeStyle = "blue";
// cts.strokeRect(200,200,50,50);

// cts.beginPath();

// cts.moveTo(150,150);         //to move brush to starting point
// cts.lineTo(350,350);           //to draw line
// cts.lineTo(0,350);
// cts.lineTo(150,150);
// cts.stroke();


// cts.closePath();


// cts.font = "40px sans-serif";
// cts.fillStyle = "purple";
// cts.fillText("modi sarkar",200,300);     //content,x,y;

let cellSize = 50;
let snakeBoard = [[0,0]];
let direction = "right";
let gameOver = false;
let boardWidth = 1000;
let boardHeight = 600;
let score = 0;
let foodReady = generateFood();

document.addEventListener('keydown' , function(e){
    if(e.key === "ArrowLeft"){
        direction = "left";
    }
    else if(e.key === "ArrowUp"){
        direction = "up";
    }
    else if(e.key === "ArrowDown"){
        direction = "down";
    }
    else{
        direction = "right";
    }
})


function draw(){

    if(gameOver === true){
        clearInterval(gameEnd);
        cts.font = "60px sans-serif";
        cts.fillStyle = "red";
        cts.fillText("GAME OVER!!" , 100, 100);
        return;
    }
    cts.clearRect(0,0,1000,600);    //phle purane rectangles hatane honge...uske liye poore canvas mein se remove krne pdenge
    for(let cell of snakeBoard){
        cts.fillStyle = "white";
        cts.fillRect(cell[0],cell[1],cellSize,cellSize);   //29 line vala....0,0
    }


    //make food
    cts.fillStyle = "black";
    cts.fillRect(foodReady[0] , foodReady[1] , cellSize , cellSize);

    //draw score
    cts.font = "30px sans-serif";
    cts.fillText(`score: ${score}` , 20 , 20);
}




function update(){
    let headX = snakeBoard[snakeBoard.length-1][0];
    let headY = snakeBoard[snakeBoard.length-1][1];

    // let newheadX  = headX + cellSize;
    // let newheadY = headY;
    let newheadX;
    let newheadY;
    if(direction === "left"){
        newheadX  = headX - cellSize;
        newheadY = headY;

        if(newheadX < 0){
            gameOver = true;  //boundaries touch krne pr game over hoga
        }
    }
    else if(direction === "up"){
        newheadX  = headX;
        newheadY = headY - cellSize;

        if(newheadY < 0){
            gameOver = true;
        }
    }
    else if(direction === "down"){
        newheadX  = headX;
        newheadY = headY + cellSize;

        if(newheadY === 600){
            gameOver = true;
        }
    }
    else{
        newheadX = headX + cellSize;
        newheadY = headY;

        if(newheadX === 1000){
            gameOver = true;
        }
    }

    snakeBoard.push([newheadX,newheadY]);
    if(newheadX == foodReady[0] && newheadY == foodReady[1]){
        foodReady = generateFood();
        score+=2;
    }
    else{
        snakeBoard.shift();     //taaki length increase na ho...toh origin ko bhi shift krna pdega...size same rkhna hai until vo kuch khata ni...starting se hatane kem liye shift
    }


}

function generateFood(){
    return[
        Math.round((Math.random()*(boardWidth-cellSize))/cellSize)*cellSize ,     
        Math.round((Math.random()*(boardHeight-cellSize))/cellSize)*cellSize
    ]
}


let gameEnd = setInterval(function(){
    update();
    draw();
},100)