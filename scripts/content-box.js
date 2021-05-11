
var contentBox  = document.getElementById("contentBox");
const boxExpression = document.getElementById("boxExpression");
var expression = document.getElementById("expression");
var reponces  =  new Array();
var zoneGame = document.getElementById("zoneGame");
var penguiBox;
var pengui;
var animationPlayer;
var zonneScore;
var score;
var start;
var reStart;
var fullScreen;
var exit;
var bonneReponce;
var idIntervale = null;
var index;
var penguiRect;
var position;
var jeuDemarer=false;


contentBox.style.height = String(HEIGHT - 20) + "px";


function init() {

    {
        start = document.getElementById("start");
        reStart = document.getElementById("restart");
        fullScreen = document.getElementById("fullScreen");
        exit = document.getElementById("exit");
        expression = document.getElementById("expression");
        penguiBox = document.getElementById("pengui-box");
        pengui = document.getElementById("penguin");
        zonneScore = document.getElementById("zonneScore");
        score = document.getElementById("score");
        animationPlayer = document.getElementById("animation-Player");

        reStart.style.display ="none";
        exit.style.display ="none";
        expression.style.display ="none"
        penguiBox.style.display ="none"
        zonneScore.style.display ="none"
        zoneGame.style.display="none"
    }

    {
        for(var i=0; i<5; i++)
        {
            for(var j=0; j<5; j++)
            {
                var div = document.createElement("div");
                div.setAttribute("id", String(i)+"."+String(j));
                div.setAttribute("class", "box");
                zoneGame.appendChild(div);
                div.style.boxShadow =  "inset 2px 2px 0 rgb(255 255 255 / 5%), inset -2px -2px 0 #665235";
            }
        }
    }


    pengui.style.top = "0px";
    pengui.style.left = String(boxExpression.clientWidth - 100) +"px";


    start.addEventListener("click", ()=> {
        start.style.display = "none";
        reStart.style.display ="inline";
        exit.style.display ="inline";
        expression.style.display ="flex";
        penguiBox.style.display ="block"
        zonneScore.style.display ="flex"
        zoneGame.style.display="grid"
        animationPlayer.style.display ="none"

        time();
        setTimeout(startJeu, 4500);
    });
    reStart.addEventListener("click",()=> {
        reStartJeu();
    });
    fullScreen.addEventListener('click', () => {
        if (document.fullscreenElement === null) {
            document.body.requestFullscreen()
          } else {
            document.exitFullscreen();
          }
    });
    exit.addEventListener("click", ()=> {
        start.style.display = "inline";
        exit.style.display ="none";
        reStart.style.display ="none";
        expression.style.display ="none"
        penguiBox.style.display ="none"
        zonneScore.style.display ="none"
        animationPlayer.style.display ="block"
        zoneGame.style.display = "none";
    
        jeuDemarer = false;
        exitJeu();
    });

    document.body.addEventListener("keyup", (e) => {

        switch (e.key) {
            case "ArrowDown":
                if(parseInt(pengui.style.top) < 400 )
                {
                    pengui.style.top = parseInt(pengui.style.top)+100+'px';
                }
                break;
            case "ArrowUp":
                if(parseInt(pengui.style.top) > 0 )
                {
                    pengui.style.top = parseInt(pengui.style.top)-100+'px';
                }
                break;
            case "ArrowRight":
                if(parseInt(pengui.style.left) <  400 + boxExpression.clientWidth)
                {
                    pengui.style.left = parseInt(pengui.style.left)+100+'px';
                }
                break;
            case "ArrowLeft":
                if(parseInt(pengui.style.left) > boxExpression.clientWidth)
                {
                    pengui.style.left = parseInt(pengui.style.left)-100+'px';
                }
                break;
            case "Enter":
                penguiRect = pengui.getBoundingClientRect();
                evalScore();
            default:
                break;
        }
    })
    for (var i=0; i<4; i++)
    {
        var div = document.createElement("div");
        div.setAttribute("class", "contentFruit-box-"+(i+1));
        div.style.position = "absolute";
        reponces.push(div)
    }

    score.innerHTML = 0;
    // idIntervale = setInterval(startJeu ,5000);
}

function startJeu() {

    if(jeuDemarer){

        reponces.forEach(element => {
            element.innerHTML  = "";
        });

        var exp = initExpression();
        var pos = choixDesPoints(NPOINT, 5);

        expression.innerHTML = exp[0] + "+" + exp[1];

        index = choseInt(1,4)[0];
        var div = document.createElement("div");
        div.setAttribute("class", "fruits");
        for(var i=0; i<exp[0] + exp[1]; i++)
        {
            var img = document.createElement("img");
            img.setAttribute("src", "img/mango.png");
            img.style.width = 20 + "px"; 
            img.style.height = 20 + "px"; 
            div.appendChild(img);
            reponces[index].appendChild(img);

        }
        reponces[index].appendChild(div);
        var span = document.createElement("div");
        span.innerText = String(exp[0] + exp[1]);
        span.setAttribute("class", "reponce text red");
        reponces[index].appendChild(span);

        reponces.forEach(element => {
            i =reponces.indexOf(element);
            if(i !== index){
                
                var x = choseInt(1,21)[0];
                while(x == exp[0] + exp[1]) { x = choseInt(1,21)[0];}
                var div = document.createElement("div");
                div.setAttribute("class", "fruits");
                for(var i=0; i<x; i++)
                {
                    var img = document.createElement("img");
                    img.setAttribute("src", "img/mango.png");
                    img.style.width = 20 + "px"; 
                    img.style.height = 20 + "px"; 
                    div.appendChild(img);
                }
                element.appendChild(div);
                var span = document.createElement("div");
                span.setAttribute("class", " reponce text red");
                span.innerText = String(x);
                element.appendChild(span);
            }
            
            // element.style.left = String(pos[i].y+boxExpression.clientWidth) +  "px";
            // element.style.top = pos[i].x + "px";
            // zoneGame.appendChild(element);
        });

        pos.forEach(point => {
            var i =pos.indexOf(point);
            var clas = String(point.x) +'.'+String(point.y);
            var div = document.getElementById(clas);
            div.appendChild(reponces[i]);
        });
    }
    if(idIntervale === null){
        idIntervale = setInterval(startJeu ,5000);
    }
}

function evalScore() 
{
    if(isCollide(penguiRect, reponces[index].getBoundingClientRect()))
    {
        score.innerHTML = parseInt(score.innerHTML ) +  1;
    }
    else
    {
        score.innerHTML = String(parseInt(score.innerHTML ) -  1);
    }
}

function reStartJeu() {

    expression.innerText = "";
    pengui.style.top = "0px";
    pengui.style.left =  String(boxExpression.clientWidth - 100) +"px";
    score.innerText = "0";
    reponces.forEach(element => {
        element.innerText = "";
    });
    time();
}
function exitJeu() {
    clearInterval(idIntervale);
    reponces.forEach(element => {
        element.style.display = "none";
    });

}
function choseInt(n, max) 
{
    var index = [...(new Array(max).keys())],
        result = [];
    
    for (var i=0; i<n; i++)
    {
        var indexRandom = Math.floor(Math.random() * index.length),
        random = index.splice(indexRandom, 1);
        result.push(random[0]);
    }

    return result;
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
function catPoint(array1, array2) 
{
    var r = [];
    for(var i=0; i<array1.length; i++)
    {   
        var p = new Point();
        p.x = array1[i];
        p.y = array2[i];
        r.push(p);
    }
    return r;
};


function initExpression(){
    
    var a = choseInt(1, 9)[0];
    var b = choseInt(1,9)[0];

    return [a, b];

}
function choixDesPoints(n,max){ // Retourne n point
    var posY = choseInt(n, max);
    var posX = choseInt(n, max);
    var pos = catPoint(posX, posY);
    return pos;
}
function isCollide(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
  }

function time()
{
    var timer = document.createElement("div");
    timer.setAttribute("class", "timer text red");
    zoneGame.appendChild(timer);
    timer.innerText = 3;
    setTimeout(()=>{
        timer.innerText = 2;
    }, 1000);
    setTimeout(()=>{
        timer.innerText = 1;
    }, 2000);
    setTimeout(()=>{
        timer.innerText = "GO";
    }, 3000);
    setTimeout(()=>{
        timer.style.display = "none";
        jeuDemarer = true;
    }, 4000);
}