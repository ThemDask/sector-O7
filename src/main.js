import mainScene from "./Scenes/mainScene.js";
import textScene from "./Scenes/textScene.js";
import combatScene from "./Scenes/combatScene.js";

// configuration of the game
var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 1024,
    physics: {
        default: 'arcade',
        arcade: {
            fps: 60,
            gravity: { y: 0, x:0 },
            debug: false
        }
    },
    scene: [mainScene, textScene, combatScene]
};

// init
var game = new Phaser.Game(config);

