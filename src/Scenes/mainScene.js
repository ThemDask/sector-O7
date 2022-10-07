
// Scene to handle player, debris & movement
export default class mainScene extends Phaser.Scene {
    constructor() {
        super({key: 'mainScene', active: true})
    }

    preload () {
        // load images/sprites
        this.load.image('space', './assets/space.png');

        this.load.image('debris', './assets/debris.png');
        this.load.image('debris2', './assets/debris2.png');

        this.load.spritesheet('mine', './assets/mine_anim.png', {frameWidth:64, frameHeight: 64});
        this.load.image('bomb', './assets/bomb.png');

        this.load.image('ship', './assets/ship.png');
        this.load.image('shipmove', './assets/shipmove.png');
        this.load.image('shipboost', './assets/shipboost.png');
        this.load.image('deadship', './assets/ship_black.png');

        // load audio
        this.load.audio("engine", "./assets/sounds/engine.wav");
        this.load.audio("startengine", "./assets/sounds/startengine.wav");
        this.load.audio("stopengine", "./assets/sounds/stopengine.wav");

        loadingScreen(this);

    }

    create () {  
        // add background 
        this.add.image(960, 540, 'space');

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

        d1 = debris.create(400, 100, 'debris2').setBounce(0.2).setDrag(0.99).setScale(1.5); 
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

        this.anims.create({
            key: 'mine_anim',
            frames: this.anims.generateFrameNumbers('mine'),
            frameRate: 4,
            repeat: -1
        });

        m1 = mines.create(200,100, 'mine').setScale(0.5);
        m2 = mines.create(500,200, 'mine').setScale(0.5);
        m3 = mines.create(870,400, 'mine').setScale(0.5);
        m4 = mines.create(1512,770, 'mine').setScale(0.5);
        m5 = mines.create(1256,312, 'mine').setScale(0.5);

        m1.play('mine_anim');
        m2.play('mine_anim');
        m3.play('mine_anim');
        m4.play('mine_anim');
        m5.play('mine_anim');

        // add player (spaceship)
        player = this.physics.add.image(633, 800, 'ship').setDepth(0);
        player.setDamping(true);
        player.setDrag(0.999);
        player.setBounce(0.2);
        player.setMaxVelocity(200); 
        player.setCollideWorldBounds(false);
        player.fuel = 2000;
        player.health = 100;

        // colliders
        this.physics.add.collider(player, debris);
        
        this.physics.add.collider(debris, debris);         
        this.physics.add.collider(player, mines, this.minecollision, null, this);  
        
        player.body.collideWorldBounds=true;
        debris.collideWorldBounds=true;

        //game over text create TODO: move to UI
        gameover_text = this.add.text(900,520, '', { font: '32px Roboto', fill: '#ff0000' });

        // pause combatScene just after loading to activate later
        this.scene.pause('combatScene');



        
    }   

    update(time) {
        //console.log(isEngineOn);
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

        //manage player health
        if (player.health <= 0) {
            this.gameover();
            
        }
    }

    //   helper functions
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

// export function transferhealth() {
//     return health;
// }

export function transfercombat() {
    return isCombatMode;
}

export function transferdebris() {
    var debristotransfer = [d1,d2,d3,d4,d5,d6, d7, d8, d9, d10]
    return debristotransfer;
}

// declare global variables
var player;
//var health = 100;

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

var mode_timer = 0;

var gameover_text;
var isCombatMode = false;

var isEngineOn = false;

// import dependencies
import { loadingScreen } from "../loadingscreen.js";
import mapScene from "./mapScene.js";
