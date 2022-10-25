
// Scene to handle stage, debris & movement
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

        loadingScreen(this);
    }

    create () {          
        // add background 
        this.add.image(960, 540, 'space').setDepth(0);

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

        // colliders
        this.physics.add.collider(debris, debris);         
        debris.collideWorldBounds=true;

        //game over text create TODO: move to UI
        gameover_text = this.add.text(900,520, '', { font: '32px Roboto', fill: '#ff0000' });

        // pause combatScene just after loading to activate later
        this.scene.pause('combatScene');

    }   

    update() {
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
    }
}

export function transferdebris() {
    var debristotransfer = [d1,d2,d3,d4,d5,d6, d7, d8, d9, d10]
    return debristotransfer;
}

export function transfermines() {
    var minestotransfer = [m1,m2,m3,m4,m5]
    return minestotransfer;
}

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

var gameover_text;

// import dependencies
import { loadingScreen } from "../loadingscreen.js";
import menuScene from "./menuScene.js";
