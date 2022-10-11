// Scene to handle mission objectives
export default class objectivesScene extends Phaser.Scene {
    constructor() {
        super({key: 'objectivesScene', active: true})
    }

    // preload () {

    // }

    create () {
        //this.scene.sleep();
        
        objectiveText = this.add.text(1650, 820, '',
         { font: '16px Roboto', fill: '#ffffff' }).setDepth(0);

        finishText =  this.add.text(900, 520, '',
        { font: '32px Roboto', fill: '#00ff00' }).setDepth(0);
    }

    update() {
        var asteroid_num = get_debris_num(); 
        var objective_started = transferObjectiveState()

        if (objective_started == true) {
            objectiveText.text =  obj1State + ' Destroy the asteroids. (remaining: ' + asteroid_num + ' )\n' + obj2State + ' Reach the nearest space station.';
            if (asteroid_num == 0) {
                obj1State = "☑";
            }
            if (is_docked()) {
                obj2State = "☑";
            }
        }

        if (obj1State == "☑" && obj2State == "☑") {
            console.log('finished');
            finishText.text = "MISSION COMPLETE";

            //this.scene.wake(mapScene);

        }

        
    }

}

var objectiveText;
var finishText;
var obj1State = "☐";
var obj2State = "☐";

import { transferObjectiveState } from "./textScene.js";
import { get_debris_num } from "./combatScene.js";
import { is_docked } from "./stationScene.js";
import mapScene from "./mapScene.js";
