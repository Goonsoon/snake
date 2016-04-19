/**
 * Created by Zhichao Liu on 2015/10/30.
 */


window.onload  = function(){
    document.getElementById('startScreen').style.height = innerHeight+'px';
    var ROW =30,t;
    for(i=0;i<ROW;i++){
        for(j=0;j<ROW;j++){
            var pos = i + "_" + j;
            var blockEl = document.createElement('div');
            blockEl.style.width = String((800)/ROW) + 'px';
            blockEl.style.height = String((800)/ROW) + 'px';
            blockEl.setAttribute("class","block");
            blockEl.setAttribute("id",pos);
            document.getElementsByClassName('layout')[0].appendChild(blockEl);
        }
    }
    var
        snake = [ {x:0,y:0}, {x:0,y:1}, {x:0,y:2} ],
        MAXSNAKE = ROW*ROW,RIGHT = 39,LEFT = 37,UP = 38, DOWN = 40,
        SNAKECOLOR="1",FOODCOLOR="1",DEFAULTCOLOR = '0.1', score=0,
        defaultDirection = RIGHT,
        isInSnake = function(x,y){ //判断蛇是否撞到自己
            for ( var i = 0;  i < snake.length;  i++){
                if(  snake[i].x == x && snake[i].y == y){return true;}
            }
            return false;
        },
        random = function(){ //生成随机坐标
            return Math.floor( Math.random()*ROW );
        },
        $ = function(id){
            return document.getElementById(id);
        },
        join =function(f,s){
            return f + '_' + s;
        },
        dropFood  = function(){   //放好吃的
            var
                x = random(), y = random();
            if( snake.length == MAXSNAKE ){return null;}
            while( isInSnake(x,y) ){
                x = random();
                y = random();
            }
            $( join(x,y) ).style.opacity = FOODCOLOR;
            $( join(x,y) ).setAttribute("class","block guo");
            return {x:x,y:y};
        },
        food = dropFood(),
        zou = function(){
            var last  = snake.length -1,newHead,weiba;
            if( defaultDirection == RIGHT ){newHead = {x:snake[last].x, y:snake[last].y+1};}
            if( defaultDirection == LEFT  ){newHead = {x:snake[last].x, y:snake[last].y-1};}
            if( defaultDirection == DOWN  ){newHead = {x:snake[last].x+1, y:snake[last].y};}
            if( defaultDirection == UP    ){newHead = {x:snake[last].x-1, y:snake[last].y};}
            if( newHead.x >= ROW || newHead.x < 0 || newHead.y>=ROW || newHead.y < 0){
                document.getElementById('audio').src='./sound/died.mp3';document.getElementById('audio').play();alert('game over!你的分数: '+score);console.log(t);clearInterval(t);document.getElementsByClassName('guo')[0].style.background = FOODCOLOR;return null;
            }
            if( isInSnake(newHead.x,newHead.y) ){
                document.getElementById('audio').src='./sound/died.mp3';document.getElementById('audio').play();alert('game over!你的分数: '+score);clearInterval(t);document.getElementsByClassName('guo')[0].style.background = FOODCOLOR;return null;
            }
            snake.push(newHead);
            if(newHead.x == food.x && newHead.y == food.y){
                $( join(food.x,food.y) ).setAttribute("class","block");
                $( join( food.x,food.y) ).style.opacity = SNAKECOLOR;
                document.getElementById('audio').src='./sound/eat.mp3';document.getElementById('audio').play();
                score+=10;
                food = dropFood(); return null;
            }
            weiba = snake.shift();
            $( join( weiba.x , weiba.y) ) .style.opacity  = DEFAULTCOLOR;
            $( join( newHead.x , newHead.y) ).style.opacity = SNAKECOLOR;
            return null;
        };
    //-----------------------------------------------------------------
    (function(){
        for ( var i = 0;  i < snake.length;  i++){
            var div = $(join(snake[i].x ,snake[i].y));
            div.style.opacity = SNAKECOLOR;
        }
    })();

    var kaiguan = false;
    document.onkeydown = function(e){
            if(Math.abs(e.keyCode - defaultDirection) !== 2 ){
            defaultDirection = e.keyCode;
        }
        if(!kaiguan){
          t = setInterval(zou,100);
          kaiguan = true;
        }
    };

    document.getElementById('inGame').onclick = function(){
      document.getElementById('startScreen').style.opacity = '0';
      setTimeout(function(){document.getElementById('startScreen').style.zIndex = '-1';return false;},500);
    }

};
