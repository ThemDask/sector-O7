import { loadingScreen } from "../loadingscreen.js";

export default class mapScene extends Phaser.Scene {
    constructor() {
        super({key: 'mapScene', active: false})
    }

    preload() {
        this.load.image('map', './assets/map.png');
        this.load.image('map_tutorial', './assets/map_tutorial.png');
        this.load.image('lvl1', './assets/lvl1.png');
        loadingScreen(this);

    }

    create() {

        // create world map & clickable levels
        this.add.image(960, 540, 'map').setDepth(0);

        tutorial_lvl = this.add.image(360, 740, 'map_tutorial').setScale(0.7);
        tutorial_lvl.setInteractive();
        tutorial_lvl.on('clicked',this.func, this);

        lvl_1 = this.add.image(580, 440, 'lvl1').setScale(0.7);
        lvl_1.setInteractive();
        lvl_1.on('clicked',this.func, this);

        // emit the 'clicked' event on the level images
        this.input.on('gameobjectup', function (pointer, gameObject)
        {
            gameObject.emit('clicked', gameObject);
        }, this);

    }

    update() {
        
    }

    func() {
        console.log("clicked!" );
    }
}

var tutorial_lvl;
var lvl_1;
