import mainScene from "./Scenes/mainScene.js";
import textScene from "./Scenes/textScene.js";
import combatScene from "./Scenes/combatScene.js";
import UIScene from "./Scenes/UIScene.js";
import stationScene from "./Scenes/stationScene.js";
import objectivesScene from "./Scenes/objectivesScene.js";
import radioScene from "./Scenes/radioScene.js";


// configuration of the game
var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1076,
    physics: {
        default: 'arcade',
        arcade: {
            fps: 60,
            gravity: { y: 0, x:0 },
            debug: false
        }
    },
    scene: [mainScene, textScene, combatScene, UIScene, stationScene, objectivesScene, radioScene]
};

// init
var game = new Phaser.Game(config);