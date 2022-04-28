import { transferplayer } from "./mainScene.js";

// Scene to handle UI
export default class UIScene extends Phaser.Scene {
    constructor() {
        super({key: 'UIScene', active: true})
    }
    preload(){

    }

    create(){
    // main text in screen
    text = this.add.text(10, 10, '', { font: '16px Courier', fill: '#00ff00' });
    angletext = this.add.text(10, 50, '', { font: '16px Courier', fill: '#00ff00' });
    
    }

    update(time){
    var player = transferplayer();
    //console.log(player.angle);
    // show text in screen
     text.setText('Speed: ' + '');
     angletext.setText('Angle: ' + ''); 
    }

}

// declare global variables
var text;
var angletext;




