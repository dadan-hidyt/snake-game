(function(){
    const config = {
        x : 48,
        y : 30,
        block_size : 20,
    }
    let snake = {
        x : (config.block_size * config.x) / 2,
        y : (config.block_size * config.y) / 2,
    }
    let ekor = [];
    let pelet = [];
    let direction = {
        x : 0,
        y : 0,
    }
    let gameOver = false;
    let score = 0;
    function $el(elemen) {
        return document.querySelector(elemen);
    }

    const canvas = $el('#canvas');
    let ctx = canvas.getContext('2d');

    function component(bg,x,y,w,h) {
        ctx.fillStyle = bg;
        ctx.fillRect(x,y,w,h);
    }
    function acak_pelet(e = false) {
        if(e === false) {
            for (let i = 0; i < 3; i++) {
                pelet.push([
                   Math.floor(Math.random() * config.x) * config.block_size,
                    Math.floor(Math.random() * config.y) * config.block_size,
                ]);
            }
        } else {
            pelet[e] = [
                Math.floor(Math.random() * config.x) * config.block_size,
                Math.floor(Math.random() * config.y) * config.block_size,
            ];
        }
    }
    function draw_canvas() {
        component('#dedede',0,0,(config.block_size * config.x),(config.block_size * config.y));
    }
    function draw_pelet() {
        pelet.forEach(function (e){
           component('maroon',e[0],e[1],18,18);
        });
    }
    function draw_snake() {

        for (let i = ekor.length-1; i > 0 ;i--) {
            ekor[i] = ekor[i-1];
        }
        if(ekor.length) {
            ekor[0] = [snake.x,snake.y];
        }
        snake.x += (direction.x * config.block_size);
        snake.y += (direction.y * config.block_size);

        component('red',snake.x,snake.y,18,18);
        ekor.forEach(function (e){
            component('red',e[0],e[1],18,18);
        });
    }
    function start(){
        if(gameOver) {
            return;
        }
        pelet.forEach(function(val,index){
            if(snake.x === val[0] && snake.y === val[1]) {
                acak_pelet(index);
                ekor.push([val[0] , val[1]]);
                score++;
            }
        })
        draw_canvas();
        draw_snake();
        draw_pelet();
        $el('#score').innerText = score;
        if(snake.x < 0) {
            snake.x = (config.block_size * config.x);
        } else if(snake.x > (config.block_size * config.x)) {
            snake.x = 0;
        } else if(snake.y < 0) {
            snake.y = (config.block_size * config.y);
        } else if(snake.y > (config.block_size * config.y)) {
            snake.y = 0;
        }
        ekor.forEach(function(d){
            if(d[0] === snake.x && d[1] === snake.y) {
                gameOver = true;
                alert("Game over");
            }
        })
    }

    window.onload = function() {
        canvas.width = (config.block_size * config.x);
        canvas.height = (config.block_size * config.y);
        acak_pelet();
        document.onkeydown = function(e) {
            /**
             * untuk kontrol keyboard
             * @type {string}
             */
            const code = e.code;
            if(code === 'KeyW' && direction.y != 1) {
                direction.x = 0;
                direction.y = -1;
            } else if(code === 'KeyS' && direction.y != -1) {
                direction.x = 0;
                direction.y = 1;
            } else if(code === 'KeyA' && direction.x != 1) {
                direction.y = 0;
                direction.x = -1;
            }  else if(code === 'KeyD' && direction.x != -1) {
                direction.y = 0;
                direction.x = 1;
            }
            console.log(code)
        }
        setInterval(start, 1000/10);

    }

})();