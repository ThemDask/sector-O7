
// Scene to handle player & movement
export default class mainScene extends Phaser.Scene {
    constructor() {
        super({key: 'mainScene', active: true})
    }

    preload () {
        // load images/sprites
        this.load.image('space2', './assets/space2.jpg');

        this.load.image('debris', './assets/debris.png');
        this.load.image('debris2', './assets/debris2.png');

        this.load.image('ship', './assets/ship.png');
        this.load.image('shipmove', './assets/shipmove.png');
        this.load.image('shipboost', './assets/shipboost.png');

        this.load.image('spacestation', './assets/spacestation.png');

        // load audio
        this.load.audio("engine", "./assets/sounds/engine.wav");
        this.load.audio("startengine", "./assets/sounds/startengine.wav");
        this.load.audio("stopengine", "./assets/sounds/stopengine.wav");

        loadingScreen(this);

    }

    create () {  

        // if (player.body.speed < 10 & player.body.speed > 2 ){
        //     startengine.play();
        // }

        // add background 
        this.add.image(640, 512, 'space2');
        // add space station
        station = this.physics.add.image(565,780, 'spacestation').setScale(1.5);
        station.setImmovable(true);
        station.setDepth(0);

        // add audio
        startengine = this.sound.add("startengine",audioconfig);
        stopengine = this.sound.add("stopengine",audioconfig);

        audioconfig = {
            mute: false,
            volume: 1,
            rate: 1,
            loop: false
        }

        // add space debris and group
        debris = this.physics.add.group({runChildUpdate: true,collideWorldBounds: true});

        d1 = debris.create(400, 100, 'debris2').setBounce(0.2).setDrag(0.99).setScale(1.5); //refresh body epeidi kaname resize
        d2 = debris.create(600, 400, 'debris2').setBounce(0.2).setDrag(0.99);
        d3 = debris.create(50, 250, 'debris').setBounce(0.2).setDrag(0.99);
        d4 = debris.create(750, 220, 'debris').setBounce(0.2).setDrag(0.99).setScale(1.5);
        d5 = debris.create(1000, 250, 'debris').setBounce(0.2).setDrag(0.99);
        d6 = debris.create(200, 500, 'debris2').setBounce(0.2).setDrag(0.99).setScale(1.5);

        // add player (spaceship)
        player = this.physics.add.image(633, 800, 'ship').setDepth(0);
        player.setDamping(true);
        player.setDrag(0.999);
        player.setBounce(0.2);
        player.setMaxVelocity(200); 
        player.setCollideWorldBounds(false);
        //player.setImmovable(true);

        // add fuel
        fuel = 2000;
        

        // colliders
        this.physics.add.collider(player, debris);
        this.physics.add.collider(player, station, this.stationdock ,null, this);
        this.physics.add.collider(debris, debris);
        player.body.collideWorldBounds=true;
        debris.collideWorldBounds=true;
        
    }   

    update() {
        //add keymapping
        var cursors = this.input.keyboard.createCursorKeys();
        var spaceBar = this.input.keyboard.addKey('Space');
        var U = this.input.keyboard.addKey('U');

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
            player.setDrag(0.99);
        }

        // left cursor  
        if (cursors.left.isDown) {
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
            player.setDrag(0.9);
        }
        
        // thrusters show on movement
        if (player.body.speed > 10) {
            player.setTexture('shipmove')
        } else {
            player.setTexture('ship')
        } 

        // spacebar key boost
        if (spaceBar.isDown && player.body.speed > 40 ){
            player.setTexture('shipboost')   
            if (player.body.speed < 80){
                player.body.acceleration.setToPolar(player.rotation+55, 20);
            }
        }

        // manage fuel
        if (fuel == 0 ){
            player.setAcceleration(0);
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

    }

    // station collision function
    stationdock(player) {
        this.physics.velocityFromAngle(player.angle - 90,
            0.1, player.body.velocity);
        // refuel
        if (fuel < 2000){
            fuel += 2;
        }
        
    }
}

//transfer player object & fuel to other scenes
export function transferplayer() {
    return player;
}

export function transferfuel() {
    return fuel;
}


export function transferdebris() {
    var debristotransfer = [d1,d2,d3,d4,d5,d6]
    return debristotransfer;
}

// declare global variables
var player;
var station;
var debris;
var d1;
var d2;
var d3;
var d4;
var d5;
var d6;

var docking = 0;

var startengine;
var stopengine;
var audioconfig;

var fuel;

// import dependencies
import { loadingScreen } from "../loadingscreen.js";import textScene from "./textScene.js";

