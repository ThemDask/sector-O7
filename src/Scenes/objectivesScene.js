// Scene to handle mission objectives
export default class objectivesScene extends Phaser.Scene {
    constructor() {
        super({key: 'objectivesScene', active: true})
    }

    preload () {

    }

    create () {
        
    }

    update() {
        var objective_started = transferObjectiveState()

        if (!objective_started == true) {
            this.scene.sleep();
        }

        console.log(objective_started);
    }









}

import { transferObjectiveState } from "./textScene.js";