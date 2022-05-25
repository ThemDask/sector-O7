import { transferplayer } from "./mainScene.js";
import { loadingScreen } from "../loadingscreen.js";

// Scene to handle space stations & interactions with player
export default class stationScene extends Phaser.Scene {
    constructor() {
        super({key: 'stationScene', active: true})

    }

    preload() {
        this.load.image('spacestation', './assets/spacestation.png');
        this.load.image('spacestation2', './assets/spacestation_2.png');

        loadingScreen(this);
    }
    create() {
        
        // add space stations on screen 
        station = this.physics.add.image(565,780, 'spacestation').setScale(1.5);
        station.setImmovable(true);
        station.setDepth(0);

        station2 = this.physics.add.image(1600,300, 'spacestation2').setScale(0.5);
        station2.setImmovable(true);
        station2.setDepth(0);
        
    }
    update() {
        station2.rotation += 0.0004

        var player = transferplayer();
        this.physics.add.collider(player, station, this.stationdock, null, this);
    }

    // station collision function
    stationdock(player) {
        this.physics.velocityFromAngle(player.angle - 90,
            0.1, player.body.velocity);
        
        if (player.fuel < 2000){
            player.fuel += 4; // refuel
        } 
    }

}

var station;
var station2;