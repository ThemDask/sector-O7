import { transferplayer,transferfuel,transferhealth, transfercombat } from "./mainScene.js";
import { loadingScreen } from "../loadingscreen.js";

// Scene to handle HUD & UI
export default class UIScene extends Phaser.Scene {
    constructor() {
        super({key: 'UIScene', active: true})
    }
    preload(){
        // load HUDs
        //this.load.image('hud', '../assets/hud2.png');
        this.load.image('fuelhud', '../assets/fuelhud.png');
        this.load.image('barhud', '../assets/barhud.png');
        this.load.image('combathud', '../assets/weaponhud.png');

        this.load.image('speedhud', '../assets/speedhud.png');
        this.load.image('speedhud_b', '../assets/speedhud_boost.png');


        this.load.image('fuelbar', '../assets/fuelbar.png');
        this.load.image('healthbar', '../assets/healthbar.png');
        this.load.image('speedbar', '../assets/speedbar.png');

        this.load.image('angleship', './assets/ship_black.png');
        this.load.image('anglehud_box', './assets/anglehud_box.png');


        loadingScreen(this);
    }

    create(){
        // create HUDs in x, y of scene
        //this.add.image(99,47,'hud');
        this.add.image(1860,1000,'combathud');
        this.add.image(75,955,'barhud');
        this.add.image(1700,1030,'speedhud');

        // create bars for HUDs
        fuelbar = this.add.image(35,975,'fuelbar');
        healthbar = this.add.image(105,975,'healthbar');
        speedbar = this.add.image(1626,1145,'speedbar');

        // create ship model for HUD
        this.add.image(225,1000,'anglehud_box');
        ship_model = this.add.image(220, 1010,'angleship').setScale(0.7);

        // HUD texts
        speedtext = this.add.text(1715, 998, '', { font: '18px Oswald', fill: '#0000ff' }).setDepth(0);
        angletext = this.add.text(180, 940, '', { font: '18px Oswald', fill: '#000000' }).setDepth(0);
        weapontext = this.add.text(1810, 965, 'NONE', { font: '18px Courier', fill: '#ff0000' });
        combattext = this.add.text(1810, 1047, 'DEACTIVATED', { font: '14px Courier', fill: '#00ff00' }).setDepth(0);

    
    }

    update(){


        // transfer player instance to get speed & angle
        player = transferplayer();
        fuel = transferfuel();
        health = transferhealth();
        var combat = transfercombat()
        
        // update health & fuel bars 
        this.move_fuelbar(fuel);
        this.move_healthbar(health);
        this.move_speedbar(player.body.speed);

        // update ship model depending on player's angle
        ship_model.angle = player.angle;

        // show text in screen
        speedtext.setText(player.body.speed.toFixed(3));
        angletext.setText('ANGLE: ' + player.angle.toFixed(1)); 

        // update combat text
        if (combat) {
            
            combattext.setFill('#ff0000');
            combattext.setText('ACTIVATED');
        }

    }

    // UI helper functions
    move_fuelbar(fuel, ){
        var pos = 1175;
        fuelbar.y = pos - (fuel/10);
    }

    move_healthbar(health){
        var h_pos = 1175;
        healthbar.y = h_pos - (health*2)
    }

    move_speedbar(speed){
        var s_pos = 1135;
        speedbar.y = s_pos - (speed);
    }

}

// declare global variables
var text;
var angletext;
var weapontext;
var fueltext;
var speedtext;
var combattext;

var player;
var fuel;
var health;

var fuelbar;
var healthbar;
var speedbar;

var ship_model;