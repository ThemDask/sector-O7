
// Scene to handle player, space station, debris & movement
export default class mainScene extends Phaser.Scene {
    constructor() {
        super({key: 'mainScene', active: true})
    }

    preload () {
        // load images/sprites
        this.load.image('space', './assets/space.png');

        this.load.image('debris', './assets/debris.png');
        this.load.image('debris2', './assets/debris2.png');

        this.load.image('mine', './assets/mine.png');
        this.load.image('bomb', './assets/bomb.png');

        this.load.image('ship', './assets/ship.png');
        this.load.image('shipmove', './assets/shipmove.png');
        this.load.image('shipboost', './assets/shipboost.png');
        this.load.image('deadship', './assets/ship_black.png');

        this.load.image('spacestation', './assets/spacestation.png');
        this.load.image('spacestation2', './assets/spacestation_2.png');

        // load audio
        this.load.audio("engine", "./assets/sounds/engine.wav");
        this.load.audio("startengine", "./assets/sounds/startengine.wav");
        this.load.audio("stopengine", "./assets/sounds/stopengine.wav");

        loadingScreen(this);

    }

    create () {  

        
        // add background 
        this.add.image(960, 540, 'space');

        // add space stations
        station = this.physics.add.image(565,780, 'spacestation').setScale(1.5);
        station.setImmovable(true);
        station.setDepth(0);

        station2 = this.physics.add.image(1600,300, 'spacestation2').setScale(0.5);
        station2.setImmovable(true);
        station2.setDepth(0);

        // add audio
        startengine = this.sound.add("startengine",audioconfig);
        stopengine = this.sound.add("stopengine",audioconfig);

        audioconfig = {
            mute: false,
            volume: 1,
            rate: 1,
            loop: false
        }

        // add space debris in physics group
        debris = this.physics.add.group({runChildUpdate: true,collideWorldBounds: true});

        d1 = debris.create(400, 100, 'debris2').setBounce(0.2).setDrag(0.99).setScale(1.5); //refresh body epeidi kaname resize
        d2 = debris.create(600, 400, 'debris2').setBounce(0.2).setDrag(0.99);
        d3 = debris.create(50, 250, 'debris').setBounce(0.2).setDrag(0.99);
        d4 = debris.create(750, 220, 'debris').setBounce(0.2).setDrag(0.99).setScale(1.5);
        d5 = debris.create(1000, 250, 'debris').setBounce(0.2).setDrag(0.99);
        d6 = debris.create(200, 555, 'debris2').setBounce(0.2).setDrag(0.99).setScale(1.5);
        d7 = debris.create(1206, 750, 'debris').setBounce(0.2).setDrag(0.99);
        d8 = debris.create(1590, 627, 'debris2').setBounce(0.2).setDrag(0.99);
        d9 = debris.create(1367, 280, 'debris').setBounce(0.2).setDrag(0.99).setScale(1.5);
        d10 = debris.create(1755, 900, 'debris2').setBounce(0.2).setDrag(0.99).setScale(1.5);

        // add mines in physics group
        mines = this.physics.add.group({runChildUpdate: true,collideWorldBounds: true});

        m1 = mines.create(200,100, 'mine').setScale(0.5);
        m2 = mines.create(500,200, 'mine').setScale(0.5);
        m3 = mines.create(870,400, 'mine').setScale(0.5);
        m4 = mines.create(1512,770, 'mine').setScale(0.5);
        m5 = mines.create(1256,312, 'mine').setScale(0.5);

        // add player (spaceship)
        player = this.physics.add.image(633, 800, 'ship').setDepth(0);
        player.setDamping(true);
        player.setDrag(0.999);
        player.setBounce(0.2);
        player.setMaxVelocity(200); 
        player.setCollideWorldBounds(false);

        // add fuel
        fuel = 2000;    

        // colliders
        this.physics.add.collider(player, debris);
        this.physics.add.collider(player, station, this.stationdock, null, this);
        this.physics.add.collider(debris, debris);         
        this.physics.add.collider(player, mines, this.minecollision, null, this);  
        
        player.body.collideWorldBounds=true;
        debris.collideWorldBounds=true;

        //game over text create
        gameover_text = this.add.text(400,500, '', { font: '50px Courier', fill: '#ff0000' });

        // stop combatScene just after loading to activate later
        this.scene.stop('combatScene');
        
    }   

    update(time) {
        
        //add keymapping
        var cursors = this.input.keyboard.createCursorKeys();
        var spaceBar = this.input.keyboard.addKey('Space');
        var R = this.input.keyboard.addKey('R');

        if (R.isDown && time > mode_timer ) {
            // start combatScene 
            this.scene.launch('combatScene');
            combat = true;
            //combattext.setText('ACTIVATED');           
            mode_timer += 2000;
            console.log('sd')
        }

            // MOVEMENT //
        // up cursor
        if (cursors.up.isDown && player.body.speed < 50) {
            //  START/STOP SCENE
            this.scene.stop("textScene");
            player.body.acceleration.setToPolar(player.rotation+55, 30);
            //if (player.body.speed < 50) {
            //     this.physics.velocityFromAngle(player.angle - 90,
            //         50, player.body.velocity);  
            // }
        }   
        else {
            player.setAcceleration(0);
            player.setDrag(0.999);
        }

        // left cursor  
        if (cursors.left.isDown) {
            // start combat scene
            this.scene.launch(combatScene);

            player.setAngularVelocity(-30);
        // right cursor
        } else if (cursors.right.isDown) {
            player.setAngularVelocity(30);
        } else {
            player.setAngularVelocity(0);
        }

        //down cursor
        if (cursors.down.isDown) {
            player.setDrag(0.5);
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
        if (spaceBar.isDown && player.body.speed > 40 ){
            // boost ends after 3 seconds 
            player.setTexture('shipboost')   
            if (player.body.speed < 80 ){
                //console.log(time)
                player.body.acceleration.setToPolar(player.rotation+55, 20);
            }
        }

        // manage fuel
        if (fuel == 0 ){
            player.setDrag(0.7);
            player.setAcceleration(0);
            player.setTexture('ship')
        } else if (fuel > 0 && player.body.speed > 9.9){
            fuel -=1;
        }
        
        // rotating meteors
        d1.rotation += 0.002
        d2.rotation -= 0.003
        d3.rotation += 0.001
        d4.rotation += 0.002
        d5.rotation -= 0.002
        d6.rotation += 0.003
        d7.rotation += 0.003
        d8.rotation -= 0.002
        d9.rotation -= 0.001
        d10.rotation += 0.001

        station2.rotation += 0.0004

        //manage player health
        if (health <= 0) {
            this.gameover();
            
        }

    }

    // helper functions
    // station collision function
    stationdock(player) {
        this.physics.velocityFromAngle(player.angle - 90,
            0.1, player.body.velocity);
        // refuel
        if (fuel < 2000){
            fuel += 2;
        }
        
    }

    //mine collision function
    minecollision(player, mine) {
        health -= 50;
        console.log(health);
        mine.destroy();
    }

    //game over function
    gameover() {
        player.setTexture('deadship');
        gameover_text.setText('GAME OVER');
        this.input.keyboard.enabled = false;
        
    }

    

}

//transfer player object & fuel to other scenes
export function transferplayer() {
    return player;
}

export function transferfuel() {
    return fuel;
}

export function transferhealth() {
    return health;
}

export function transfercombat() {
    return combat;
}


export function transferdebris() {
    var debristotransfer = [d1,d2,d3,d4,d5,d6, d7, d8, d9, d10]
    return debristotransfer;
}

// declare global variables
var player;
var health = 100;
var station;
var station2;

var debris;
var d1;
var d2;
var d3;
var d4;
var d5;
var d6;
var d7;
var d8;
var d9;
var d10;

var mines;
var m1;
var m2;
var m3;
var m4;
var m5;

var docking = 0;

var startengine;
var stopengine;
var audioconfig;

var combat = false;

var fuel;
var mode_timer = 0;

var gameover_text;

// import dependencies
import { loadingScreen } from "../loadingscreen.js";import textScene from "./textScene.js";
import combatScene from "./combatScene.js";