import { loadingScreen } from "../loadingscreen.js";


export default class menuScene extends Phaser.Scene {
    constructor() {
        super({key: 'menuScene', active: true})
    }

    preload() {
        this.load.image('map', './assets/map.png');
        this.load.image('menubox', './assets/menubox.png');
        this.load.image('controls', './assets/controls.png');
        this.load.image('x', './assets/x.png')
        loadingScreen(this);

    }

    create() {

        // create world map & clickable levels
        map = this.add.image(960, 540, 'map');

        button1 = this.add.image(900, 340, 'menubox').setInteractive().setDepth(3);
        button1.on('clicked',this.startGame, this);

        button2 = this.add.image(900, 390, 'menubox').setInteractive().setDepth(3);
        button2.on('clicked',this.controls, this);

        button3 = this.add.image(900, 440, 'menubox').setInteractive().setDepth(3);
        button3.on('clicked',this.credits, this);

        button4 = this.add.image(900, 490, 'menubox').setInteractive().setDepth(3);
        button4.on('clicked',this.exit, this);

        red_x = this.add.image(1230, 170, 'x').setInteractive().setDepth(-1).setScale(0.15);
        red_x.on('clicked',this.close, this);

        var startGameText =  this.add.text(840, 330, 'START GAME',
        { font: '20px Roboto', fill: '#ffffff' }).setDepth(4);

        var controlsText = this.add.text(848, 380, 'CONTROLS',
        { font: '20px Roboto', fill: '#ffffff' }).setDepth(4);

        var creditsText = this.add.text(860, 430, 'CREDITS',
        { font: '20px Roboto', fill: '#ffffff' }).setDepth(4);

        var exitText = this.add.text(845, 480, 'EXIT GAME',
        { font: '20px Roboto', fill: '#ffffff' }).setDepth(4);

        infoText =  this.add.text(580, 730, '- FOR AN OPTIMAL EXPERIENCE, PRESS F11 FOR FULLSCREEN MODE -',
        { font: '20px Roboto', fill: '#00ffff' }).setDepth(4);

        // emit the 'clicked' event on the level images
        this.input.on('gameobjectup', function (pointer, gameObject)
        {
            gameObject.emit('clicked', gameObject);
        }, this);



        this.scene.pause('mainScene');
        this.scene.pause('combatScene');
        this.scene.pause('objectivesScene');
        this.scene.pause('radioScene');
        this.scene.pause('stationScene');
        this.scene.pause('textScene');
        this.scene.pause('UIScene');
        
    }

    update() { 

    }

    // Helper Function Declarations
    startGame() {

        this.scene.resume('mainScene');
        this.scene.resume('combatScene');
        this.scene.resume('objectivesScene');
        this.scene.resume('radioScene');
        this.scene.resume('stationScene');
        //this.scene.resume('textScene');
        this.scene.resume('UIScene');

        setTimeout(() => {
            this.scene.wake('textScene');
          }, 1500);
        this.scene.setVisible(false, this.mapScene);
    }

    controls() {
        controls_img = this.add.image(960, 540, 'controls').setDepth(4);
        red_x.setDepth(5);
    }

    credits() {
        //window.location.href = "/https://github.com/ThemDask/sector-O7";
        window.location.replace('https://github.com/ThemDask/sector-O7');
    }

    exit() {
        this.game.destroy(true, false);
    }

    close() {
        console.log("closed");
        controls_img.destroy();
        red_x.setDepth(-1)
    }

}

var button1;
var button2;
var button3;
var button4;

var controls_img;
var red_x;
var infoText;

var map;

var timer = 0;