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
        update: update,
        fire:fire
    }
};

var lastfired = 0;
var debris;
var bullets;
var player;
var spaceBar;
//var laser1;
var laser;
var vx;
var vu;
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
    this.load.audio("piou", "assets/sounds/piou.mp3");
    this.load.audio("engine", "assets/sounds/engine.wav");
    //this.load.audio("startengine", "assets/sounds/startengineengine.wav");
}


function create ()
{  
     // add background 
    this.add.image(640, 512, 'space2');

    // add sounds
    lasersound = this.sound.add("laser", { loop: false });
    piousound = this.sound.add("piou", { loop: false });
    explosion = this.sound.add("explosion", { loop: false });
    startengine = this.sound.add("startengine", { loop: false });
    engine =  this.sound.add("engine", { loop: false });
    
    // add space debris and group
    debris = this.physics.add.group({runChildUpdate: true,collideWorldBounds: true});

    debris.create(400, 100, 'debris2').setBounce(0.2).setDrag(0.99); //refresh body epeidi kaname resize
    debris.create(600, 400, 'debris2').setBounce(0.2).setDrag(0.99);
    debris.create(50, 250, 'debris').setBounce(0.2).setDrag(0.99);
    debris.create(750, 220, 'debris').setBounce(0.2).setDrag(0.99);
    debris.create(1000, 250, 'debris').setBounce(0.2).setDrag(0.99);
    debris.create(200, 500, 'debris2').setBounce(0.2).setDrag(0.99);


    // add player (spaceship)
    player = this.physics.add.image(620, 800, 'ship').setDepth(1);

    player.setDamping(true);
    player.setDrag(0.999);
    player.setBounce(0.2);
    player.setMaxVelocity(200);
    
    player.setCollideWorldBounds(false);


    // add laser
    laser = this.physics.add.group({
        defaultKey: 'laser',
        maxSize: 100
    });

   
    // colliders
    this.physics.add.collider(player, debris, debriscollision, null, this);
    this.physics.add.collider(debris, debris);

    //this.physics.add.collider(this.laser, debris, bulletCollide(this.laser), null, this);

    player.body.collideWorldBounds=true;
    debris.collideWorldBounds=true;

    // main text in screen
    text = this.add.text(10, 10, '', { font: '16px Courier', fill: '#00ff00' });
    angletext = this.add.text(10, 50, '', { font: '16px Courier', fill: '#00ff00' });


    //add keymapping
    cursors = this.input.keyboard.createCursorKeys();
    spaceBar = this.input.keyboard.addKey('Space');
    shoot = this.input.keyboard.addKey('W');
    
    //game.input.mouse.capture = true;
}

function update(time) {

    // spaceship movement //

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
        if (player.body.speed < 1) {
            player.setAcceleration(0.1)
            this.physics.velocityFromAngle(player.angle - 90,
                0, player.body.velocity);
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
    debris.angle += 2;


    // FIRING //

    // call fire function when 'w' is down
    if (shoot.isDown && time > lastfired ){
        lasersound.play()

        const vec = this.physics.velocityFromAngle(player.angle-90, 1);
        vx = vec.x * 400;
        vy = vec.y * 400;
        var myangle = player.angle;
        fire(vx,vy, myangle);
        lastfired = time + 200;
    } 

    // destroy bullets when they reach the end of screen
    laser.children.each(function(b) {
        if (b.active) {
            if (b.y < 0 || b.x < 0 || b.x > 1200 || b.y > 1000) {
                b.setActive(false);
                
            } 

        }
    }.bind(this));

    // Miscallenious //

    // show text in screen
    text.setText('Speed: ' + player.body.speed);
    angletext.setText('Angle: ' + player.angle);

    // when reaching edge, repeat map
    this.physics.world.wrap(player, 32);
    
}

 function fire(vx,vy, myangle) {
    var laserbullet = this.laser.get(player.x , player.y);
    if (laserbullet) {
        laserbullet.setActive(true);
        laserbullet.setVisible(true);
        laserbullet.angle = myangle
        laserbullet.body.velocity.y = vy;
        laserbullet.body.velocity.x = vx;
    }
}


// function bulletCollide (thislaser) {
//     thislaser.kill();
//     }

function debriscollision (player, debris){
    player.body.speed -= 80;
    //player.setAcceleration(-5);
}
