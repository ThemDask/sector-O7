var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 1024,
    physics: {
        default: 'arcade',
        arcade: {
            fps: 60,
            gravity: { y: 0, x:0 }
            //debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


var debris;
var bullets;
var player;
var spaceBar;

var laser;
var lastFired = 0;
var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('space2', 'assets/space2.jpg');
    
    this.load.image('space', 'assets/space.png');
    this.load.image('debris', 'assets/debris.png');
    this.load.image('debris2', 'assets/debris2.png');

    this.load.image('ship', 'assets/ship.png');
    this.load.image('shipmove', 'assets/shipmove.png');
    this.load.image('shipboost', 'assets/shipboost.png');

    this.load.image('laser', 'assets/redlaser.png');



    // load sounds
    this.load.audio("explosion", "assets/sounds/explosion_Medium_2.wav");
    this.load.audio("laser", "assets/sounds/Rebel_Laser_2.wav");
    this.load.audio("engine", "assets/sounds/engine.wav");
    this.load.audio("startengine", "assets/sounds/startengineengine.wav");
}


function create ()
{  
     // add background etc
    this.add.image(640, 512, 'space2');
    
    // add space debris and group
    debris = this.physics.add.staticGroup();

    debris.create(400, 100, 'debris2').setScale(1.5).refreshBody(); //refresh body epeidi kaname resize
    debris.create(600, 400, 'debris2');
    debris.create(50, 250, 'debris');
    debris.create(750, 220, 'debris');
    debris.create(1000, 250, 'debris');
    debris.create(200, 500, 'debris2');

    // add sounds
    laser = this.sound.add("laser", { loop: false });
    explosion = this.sound.add("explosion", { loop: false });
    startengine = this.sound.add("startengine", { loop: false });
    engine =  this.sound.add("engine", { loop: false });

    // add player (spaceship)
    player = this.physics.add.image(620, 800, 'ship').setDepth(1);

    player.setDamping(true);
    player.setDrag(0.999);
    player.setBounce(0.2);
    player.setMaxVelocity(200);
    
    player.setCollideWorldBounds(false);

    // add laser
    var Bullet = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:

        function Bullet (scene)
        {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'laser');

            //bullet speed
            this.speed = Phaser.Math.GetSpeed(500, 1);
        },

        fire: function (x, y)
        {
            // starting position of bullets (to fire from spaceship angle, x,y must be spaceships x,y)
            this.setPosition(x, y - 30);

            this.setActive(true);
            this.setVisible(true);
        },

        update: function (time, delta)
        {
            this.y -= this.speed * delta;

            if (this.y < -50)
            {
                this.setActive(false);
                this.setVisible(false);
            }
        }

    });

    bullets = this.add.group({
        classType: Bullet,
        maxSize: 10,
        runChildUpdate: true
    });

    speed = Phaser.Math.GetSpeed(300, 1);

    
    // collider(s)
    this.physics.add.collider(player, debris);
    this.physics.add.collider(debris, debris);

    // main text in screen
    text = this.add.text(10, 10, '', { font: '16px Courier', fill: '#00ff00' });

    //add keymapping
    cursors = this.input.keyboard.createCursorKeys();

    spaceBar = this.input.keyboard.addKey('Space');
    shoot = this.input.keyboard.addKey('W');
    
    //game.input.mouse.capture = true;
}

function update(time, delta) {

    // spaceship movement

    // up cursor
    if (cursors.up.isDown && player.body.speed < 100) {
        player.setAcceleration(0.1);
        if (player.body.speed < 100) {
            this.physics.velocityFromAngle(player.angle - 90,
                100, player.body.velocity);  
        }
    } else {
        player.setAcceleration(0);
    }
    // left cursor
    if (cursors.left.isDown) {
        player.setAngularVelocity(-50);
        //player.setVelocityX(-20)
        // right cursor
    } else if (cursors.right.isDown) {
        player.setAngularVelocity(50);
        //player.setVelocityX(20)
    } else {
        player.setAngularVelocity(0);
    }
    //down cursor
    if (cursors.down.isDown) {
        player.setDrag(0.98);
        //  slow reverse
        if (player.body.speed < 10) {
            player.setAcceleration(0.1)
            this.physics.velocityFromAngle(player.angle - 90,
                -9, player.body.velocity);
        }
    } else {
        player.setDrag(0.999);
    }
    
    // thrusters show on movement
    if (player.body.speed > 10) {
        player.setTexture('shipmove')
    } else {
        player.setTexture('ship')
    } 

    // spacebar key boost
    if (spaceBar.isDown && player.body.speed > 90 ){
        player.setTexture('shipboost')   
        this.physics.velocityFromAngle(player.angle - 90,
            150, player.body.velocity);   
        if (player.body.speed > 90){
            player.setDrag(0.95);
        }
    }

    if (player.body.speed > 10){
        //engine.play();
    } 


    // rotating meteors
    //trash.setOrigin(0,0);
    debris.angle +=0.1;


    //fire
    if (shoot.isDown && time > lastFired){
        var bullet = bullets.get();
        laser.play();

        if (bullet)
        {
            bullet.fire(player.x, player.y);

            lastFired = time + 150;
        }
    }

    // show text in screen
    text.setText('Speed: ' + player.body.speed);

    // when reaching edge, repeat map
    this.physics.world.wrap(player, 32);

}




