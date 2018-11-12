/*
-----------------------------------
* important notes =============

* for better accuracy of collision I've removed the white spaces from the top
* and bottom of the bugs and player
*/

// setTimeout function to remove the loading screen after the game load
setTimeout(() => {
    document.getElementById('modal_loader').style.display = 'none';
}, 2000);



// this variable tis taken to work as a switch of the game.
let Game = {
    playerDead: false,
};

// store the default values of enemies
let enemyValue = [];

// timer object
/* there are a timer placed on the canvas
 * when user first press any key the timer
 *will start
 */
let timer = {
    isTimerOn: false,
    ID: null,
    min: 0,
    sec: 0,
    startTimer() { // timer method to increase time by one sec
        this.ID = window.setInterval(() => {
            isTimerOn = true;
            if (timer.sec === 60) {
                timer.sec = 0;
                timer.min += 1;
            } else {
                timer.sec += 1;
            }
        }, 1000);
    }
};
class Enemy {
    constructor(x, y, speed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images

        this.height = 67; // exact height of bug
        this.width = 99; // exact width of bug
        this.x = x;
        this.y = y;
        this.sprite = 'images/enemy-bug.png';
        this.speed = speed;
    }
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        let d = dt * this.speed;
        this.x += d;
        // every enemy's position will be randomized
        // every time it completes a loop
        if (this.x > 500) {
            let temp = Math.floor((Math.random() * 10) * -80);

            if (temp > -600) {
                this.x = Math.floor((Math.random() * 10) * -150);
            } else {
                this.x = temp;
            }
        }
        this.collision(); // checks collision at every rendered frame
    }
    collision() {
        // 2D collision detection logic written completely by me with little help of Udacity.
        // here obj 1 = enemy
        // here obj 2 = player
        if (((this.x + this.width) > player.x) && ((player.x + player.width) > this.x) && ((this.y + this.height) > player.y) && ((player.y + player.height) > this.y)) {
            player.life -= 1; // decrease player's life by one value
            if (player.life === 0) {
                // do nothing
            } else {
                player.x = 218; // brings the our player back it's normal position
                player.y = 468;
            }
        }
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

};



// total eight enemies are created to move on the screen
// one enemy's position is randomized 
// so that every time it will appear in different position.


// enemy constructor = Enemy(x, y, speed);
let allEnemies = [new Enemy(0, 140, 100), new Enemy(-300, 220, 70), new Enemy(-200, 305, 150), new Enemy(-500, 305, 85), new Enemy(Math.floor((Math.random() * 10) * 50), 140, 200), new Enemy(340, 220, 130), new Enemy(460, 140, 100), new Enemy(400, 305, 100)];


// function to store default speeds of enemies
allEnemies.forEach((enemy) => {
    enemyValue.push(enemy.speed);
});



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// My own Gems class goes from here

// I'm working on this function and will connect it to the main game after it finishes.
class Gems {
    constructor(x, y, source, height, width, time, value) {
        this.x = x;
        this.y = y;
        this.source = source;
        this.height = height;
        this.width = width;
        this.time = time;
        this.value = value;
        this.callable = false;
    }
    callMe() {

    }
};

// My own player constructor 
class Player {
    constructor(x, y, source, height, width, life, score) {
        this.height = height;
        this.width = width;
        this.x = x;
        this.y = y;
        this.img = source;
        this.life = life;
        this.score = score;
        this.reach = false;
        this.dead = false;
    }
    update() {
        if (timer.sec % 20 === 10) {
            allEnemies.forEach((enemy) => {
                enemy.speed += 0.5; // increase enemy speed
            })
        }
        if (this.life < 1 && Game.playerDead === false) {
            Game.playerDead = true;
            setTimeout(() => {
                win();
            }, 100);
        }

    }
    render() {
        ctx.font = '28px Arial';
        ctx.fillStyle = 'white';
        ctx.fillStyle = 'lightgrey';


        // this switch statement is written 
        // to render the lives on the screen as per it's no.
        switch (this.life) {
            case 1:
                ctx.fillText('💛', 10, 580);
                break;
            case 2:
                ctx.fillText('💛💛', 10, 580);
                break;
            case 3:
                ctx.fillText('💛💛💛', 10, 580);
        }

        ctx.font = '30px ubuntu';
        ctx.fillText(this.score, 420, 580);
        ctx.fillStyle = 'white';
        ctx.font = '24px ubuntu';
        ctx.fillText('⏳  ' + timer.min + ' : ' + timer.sec, 209, 580, 85);
        ctx.stroke();


        ctx.drawImage(Resources.get(this.img), this.x, this.y);

    }


    /* key handling switch statement */
    handleInput(key) {
        switch (key) {
            case 'left':
                if (this.x > 90) {
                    this.x -= 100; // this will move our player to left
                }
                break;
            case 'right':
                if (this.x < 355) {
                    this.x += 100; // this will move our player to right
                }
                break;
            case 'up':
                if (this.y > 80) {
                    this.y -= 83; /// moves our player to up
                }
                break;
            case 'down':
                if (this.y < 400) {
                    this.y += 83; // moves our player to down
                }
        }
    }


    // reset player method on player for resetting
    // the player and it's all values to it's default
    resetPlayer() {
        this.life = 3;
        this.score = 0;
        this.x = x;
        this.y = y;
    }

};



/* our player is declared here 
 * player's constructor(x, y, imageSource, height, width, life, scores); 
 */
let player = new Player(218, 468, 'images/char-boy.png', 75, 67, 3, 0);



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {

    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if (timer.isTimerOn === false) {
        timer.isTimerOn = true;
        timer.startTimer();
    }
    player.handleInput(allowedKeys[e.keyCode]);

    // when our player reaches the water 
    // it's score will be increased by 10 marks 
    // and the player will be brought to it's default position

    if (player.y < 100 && player.reach === false) {
        player.reach = true; // boolean switch to avoid overrun this function
        player.score += 100;
        // this will enable score adding features to the player class
        // after a certain point so that we don't run into multiple function
        // run when the player reaches the water.
        setTimeout(() => {
            player.y = 468;
            player.reach = false;
        }, 600);
    }

});


// function to take screen shot of the game when it has ended

// this is win function I made it a closure so that
// it can only be invoked once.
// It will be invoked from within the player's update method
// if the life === 0 then the game will come to an end
let win = function() {
    document.getElementById('modal_win').style.display = 'block';
    document.getElementById('score').innerHTML = `You have scored ${player.score} within ${timer.min} min : ${timer.sec} sec.`
};


/**********************************************************/
// reset function to roll back game to it's default value
function replay() {
    let modal = document.getElementById('modal_win');
    modal.style.display = 'none';
    document.getElementById('modal_loader').style.display = 'block';
    setTimeout(() => {
        for (let i = 0; i < allEnemies.length; i++) {
            allEnemies[i]['speed'] = enemyValue[i];
        }
        document.getElementById('modal_loader').style.display = 'none';
        timer.min = 0;
        timer.sec = 0;
        player.life = 3;
        player.score = 0;
        Game.playerDead = false;

    }, 2000)
};

// Event listener for our back button
document.getElementById('back').addEventListener('click', function() {
    replay();
});