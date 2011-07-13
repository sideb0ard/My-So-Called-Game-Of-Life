var nc = require('ncurses');

var w = new nc.Window();
var GridWidth = w.width;
var GridHeight = w.height;
w.close();

var Grid = new Array();
var Timer;
var icon = "*";
var switches=new Array();
var transformers=new Array();
transformers[0]=" ";
transformers[1]="*";
switches["*"]=" ";
switches[" "]="*";

for(x = 0; x < GridWidth; x++){
    Grid[x] = new Array();
    for(y = 0; y < GridHeight; y++){
        var icon = Math.round(Math.random());
        icon = transformers[icon];
        Grid[x][y] = icon;
    }
}

drawGrid();
setInterval( function() {
    progress();
    drawGrid();
}, 500);

function drawGrid(){
    for(y in Grid[0]){
    var line = "";
        for(x in Grid){
        line += Grid[x][y];
        }
    console.log(line);
   }
}

function getSurroundingAliveCount(x, y){
    var count = 0;
    var X = 0;
    var Y = 0;
    x = parseInt(x);
    y = parseInt(y);
    for(X = x - 1; X <= x + 1; X++){
        for(Y = y - 1; Y <= y + 1; Y++){
            if((X != x || Y != y) && X >= 0 && Y >= 0 && X < Grid.length && Y < Grid[X].length) {
                if(Grid[X][Y] == '*'){
                    count++;
                }
            }
        }
    }
    return count;
}
function progress(){
    var tempGrid = new Array();
    for(x in Grid){
        tempGrid[x] = new Array();
        for(y in Grid[x]){
            var count = getSurroundingAliveCount(x,y);
            if(count == 3 || ((Grid[x][y] == '*')) && count ==2) {
                tempGrid[x][y] = '*';
            } else {
                tempGrid[x][y] = ' ';
            }
        }
    }
    Grid = tempGrid;
}
