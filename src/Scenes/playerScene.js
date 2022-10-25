import { loadingScreen } from "../loadingscreen.js";
import { transferdebris } from "./mainScene.js";
import { transfermines} from "./mainScene.js";

// Scene to handle player
export default class playerScene extends Phaser.Scene {
    constructor() {
        super({key: 'playerScene', active: true})
    }


    preload() {
        this.load.image('ship', './assets/ship.png');
        this.load.image('shipmove', './assets/shipmove.png');
        this.load.image('shipboost', './assets/shipboost.png');
        this.load.image('deadship', './assets/ship_black.png');

        this.load.audio("engine", "./assets/sounds/engine.wav");
        this.load.audio("startengine", "./assets/sounds/startengine.wav");
        this.load.audio("stopengine", "./assets/sounds/stopengine.wav");

        loadingScreen(this);
    }

    create() {
        var debris = transferdebris();
        var mines = transfermines();
        // add audio
        startengine = this.sound.add("startengine",audioconfig);
        stopengine = this.sound.add("stopengine",audioconfig);

        audioconfig = {
            mute: false,
            volume: 1,
            rate: 1,
            loop: false
        }


        // add player (spaceship)
        player = this.physics.add.image(633, 800, 'ship').setDepth(-1);
        player.setDamping(true);
        player.setDrag(0.999);
        player.setBounce(0.2);
        player.setMaxVelocity(200); 
        player.setCollideWorldBounds(false);
        player.fuel = 2000;
        player.health = 100;

        //colliders 
        this.physics.add.collider(player, debris);
        this.physics.add.collider(player, mines, this.minecollision, null, this);  

        player.body.collideWorldBounds=true;

    }

    update(time) {
        //add keymapping    
        var cursors = this.input.keyboard.createCursorKeys();
        var spaceBar = this.input.keyboard.addKey('Space');
        var R = this.input.keyboard.addKey('R');

        if (R.isDown && time > mode_timer ) {
            if(!isCombatMode) {
                // start combatScene 
                this.scene.run('combatScene');
                isCombatMode = true          
                mode_timer += 1000;
            }
            else {
                this.scene.stop('combatScene');
                isCombatMode = false
                mode_timer += 1000;
            }

        }

            // MOVEMENT //
        // up cursor
        if (cursors.up.isDown && player.body.speed < 50) {
            //  START/STOP SCENE
            this.scene.stop("textScene");
            player.body.acceleration.setToPolar(player.rotation+55, 30);
        }   
        else {
            player.setAcceleration(0);
            player.setDrag(0.999);
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
            player.setDrag(0.999);
        }
        
        // thrusters show on movement
        if (player.body.speed > 10) {
            player.setTexture('shipmove')
            isEngineOn = true;
        } else {
            player.setTexture('ship')
            isEngineOn = false;
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
        if (player.fuel == 0 ){
            player.setDrag(0.7);
            player.setAcceleration(0);
            player.setTexture('ship')
        } else if (player.fuel > 0 && player.body.speed > 9.9){
            player.fuel -=0.5;
        }

        //manage player health
        if (player.health <= 0) {
            this.gameover();
            
        }
        
    }

    //helper functions
    //mine collision function
    minecollision(player, mine) {
        player.health -= 50;
        mine.destroy();
    }

    //game over function
    gameover() {
        player.setTexture('deadship');
        gameover_text.setText('GAME OVER');
        this.input.keyboard.enabled = false;
        
    }
}

//transfer player (& fuel) to other scenes
export function transferplayer() {
    return player;
}

export function transfercombat() {
    return isCombatMode;
}


var player;
var startengine;
var stopengine;
var audioconfig;

var mode_timer = 0;
var isEngineOn = false;
var isCombatMode = false;