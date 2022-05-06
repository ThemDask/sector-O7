import { transferplayer } from "./mainScene.js";
import { transferfuel } from "./mainScene.js";

// Scene to handle HUD & UI
export default class UIScene extends Phaser.Scene {
    constructor() {
        super({key: 'UIScene', active: true})
    }
    preload(){
        // load HUDs
        this.load.image('hud', '../assets/hud2.png')
        this.load.image('combathud', '../assets/combathud.png')
        this.load.image('fuelhud', '../assets/fuelhud.png')
    }

    create(){
        // creat HUDs in x, y of scene
        this.add.image(99,47,'hud');
        this.add.image(99,110,'fuelhud');
        this.add.image(1179,47,'combathud');

        // HUD texts
        text = this.add.text(10, 17, '', { font: '16px Courier', fill: '#00ff00' });
        angletext = this.add.text(10, 55, '', { font: '16px Courier', fill: '#00ff00' });
        fueltext = this.add.text(10, 105, '', { font: '16px Courier', fill: '#000000' });
        weapontext = this.add.text(1090, 17, 'equipped weapon:\n\nmining laser', { font: '16px Courier', fill: '#ff0000' });
    
    }

    update(){
        // transfer player instance to get speed & angle
        player = transferplayer();
        fuel = transferfuel();
        
        // show text in screen
        text.setText('Speed: ' + player.body.speed.toFixed(5));
        angletext.setText('Angle: ' + player.angle.toFixed(1)); 
        fueltext.setText('Fuel: ' + fuel); 
    }

}

// declare global variables
var text;
var angletext;
var weapontext;
var fueltext;
var player;

var fuel;
