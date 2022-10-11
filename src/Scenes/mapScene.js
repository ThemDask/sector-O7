import { loadingScreen } from "../loadingscreen.js";
import combatScene from "./combatScene.js";
import mainScene from "./mainScene.js";
import objectivesScene from "./objectivesScene.js";
import radioScene from "./radioScene.js";
import stationScene from "./stationScene.js";
import textScene from "./textScene.js";
import UIScene from "./UIScene.js";


export default class mapScene extends Phaser.Scene {
    constructor() {
        super({key: 'mapScene', active: true})
    }

    preload() {
        this.load.image('map', './assets/map.png');
        this.load.image('map_tutorial', './assets/map_tutorial.png');
        this.load.image('lvl1', './assets/lvl1.png');
        loadingScreen(this);

    }

    create() {

        // create world map & clickable levels
        map = this.add.image(960, 540, 'map');

        tutorial_lvl = this.add.image(360, 740, 'map_tutorial').setScale(0.7).setDepth(3);
        tutorial_lvl.setInteractive();
        tutorial_lvl.on('clicked',this.func, this);

        lvl_1 = this.add.image(580, 440, 'lvl1').setScale(0.7);
        lvl_1.setInteractive();
        //lvl_1.on('clicked',this.func, this);

        // emit the 'clicked' event on the level images
        this.input.on('gameobjectup', function (pointer, gameObject)
        {
            gameObject.emit('clicked', gameObject);
        }, this);


        //const line1 = new Phaser.Geom.Line(tutorial_lvl.x, tutorial_lvl.y, lvl_1.x, lvl_1.y);

        //this.scene.bringToTop(this.mapScene);

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

    func() {
        
        console.log("click")

        this.scene.resume('mainScene');
        this.scene.resume('combatScene');
        this.scene.resume('objectivesScene');
        this.scene.resume('radioScene');
        this.scene.resume('stationScene');
        this.scene.resume('textScene');
        this.scene.resume('UIScene');

        this.scene.setVisible(false, this.mapScene);
        

    }
}

var tutorial_lvl;
var lvl_1;

var map;