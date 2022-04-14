var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 1024,
    physics: {
        default: 'arcade',
        arcade: {
            fps: 60,
            gravity: { y: 0, x:0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var trash;
var debris;

var player;
var spaceBar;

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
}

function create ()
{   // add background etc
    this.add.image(640, 512, 'space2');

    // add space debris and group
    trash = this.physics.add.staticGroup();

    trash.create(400, 100, 'debris2').setScale(1.5).refreshBody(); //refresh body epeidi kaname resize
    trash.create(600, 400, 'debris2');
    trash.create(50, 250, 'debris');
    trash.create(750, 220, 'debris');
    trash.create(1000, 250, 'debris');
    trash.create(200, 500, 'debris2');

    // add player (spaceship)
    player = this.physics.add.image(620, 800, 'ship');

    player.setDamping(true);
    player.setDrag(0.999);
    player.setBounce(0.2);
    player.setMaxVelocity(200);
    //player.angle = 0;
    player.setCollideWorldBounds(false);

    // add laser

    
    // collider(s)
    this.physics.add.collider(player, trash);
    this.physics.add.collider(trash, trash);

    // main text in screen
    text = this.add.text(10, 10, '', { font: '16px Courier', fill: '#00ff00' });

    //add keymapping
    cursors = this.input.keyboard.createCursorKeys();

    spaceBar = this.input.keyboard.addKey('Space');
    
    //game.input.mouse.capture = true;
}

function update() {

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
    // spacebar key boost
    if (spaceBar.isDown ) {
        //this.physics.velocityFromAngle(player.angle - 90,
        //    200, player.body.velocity);   
        player.setTexture('shipboost')
    }
    //&& cursors.up.isDown && player.body.speed > 90

    // thrusters show on movement
    if (player.body.speed > 10) {
        player.setTexture('shipmove')
    } else {
        player.setTexture('ship')
    } 
    
    if (spaceBar.isDown && player.body.speed > 90 ){
        player.setTexture('shipboost')   
        this.physics.velocityFromAngle(player.angle - 90,
            150, player.body.velocity);   
        if (player.body.speed > 90){
            player.setDrag(0.95);
        }
    }

    // fire laser 
    //if (game.input.activePointer.leftButton.isDown){
    //    player.setTexture('laser')
    //}

    // rotating meteors
    trash.rotation += 0.01;

    // show text in screen
    text.setText('Speed: ' + player.body.speed);

    // when reaching edge, repeat map
    this.physics.world.wrap(player, 32);
}

