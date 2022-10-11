import { transferplayer } from "./mainScene.js";
//import { transferhealth } from "./mainScene.js";
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
        
        // lazy loading
        this.scene.sleep();
        setTimeout(() => {
            this.scene.wake();
          }, 400);

    // add space stations on screen 
    stations = this.physics.add.group({runChildUpdate: true,collideWorldBounds: true});

    station = stations.create(565,780, 'spacestation').setScale(1.5).setImmovable(true).setDepth(0);
    shipyard = stations.create(1600,300, 'spacestation2').setScale(0.5).setImmovable(true).setDepth(0);

    }

    update() {
        shipyard.rotation += 0.0004
        var player = transferplayer();
        this.physics.add.collider(player, station, this.stationdock, null, this);
        this.physics.add.collider(player, shipyard, this.shipyarddock, null, this);
    }

    // station collision functions
    stationdock(player) {
        this.physics.velocityFromAngle(player.angle - 90,
            0.1, player.body.velocity);
        
        if (player.fuel < 2000){
            player.fuel += 4; // refuel
        } 
    }

    shipyarddock(player) {
        if (player.fuel < 2000){
            player.fuel += 4; // refuel
        } 
        if (player.health < 100) {
            player.health += 0.5;    // regenerate hull 
        }

        this.physics.velocityFromAngle(player.angle - 90,
            0.1, player.body.velocity);

        docked = true;
        // player.x = shipyard.x;
        // player.y =shipyard.y;
    }

}

export function is_docked() {
    return docked;
}

var health;
var docked = false;
var stations;
var station;
var shipyard;