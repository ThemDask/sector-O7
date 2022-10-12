import { loadingScreen } from "../loadingscreen.js";

export default class radioScene extends Phaser.Scene {
    constructor() {
        super({key: 'radioScene', active: true})
    }

    preload () {
        this.load.image('radioHUD', './assets/radioHUD.png');

        loadingScreen(this);
    }

    create () {


        this.add.image(200, 27, 'radioHUD');

        radioText =  this.add.text(100, 20, '',
        { font: '20px Roboto', fill: '#ffffff' }).setDepth(0);

        crop_x = 290;
        radioText.text = "Good Morning Everyone!   You're listening to Space FM 102.3.   All the alien jams from outer space right here, right now!    No brakes, no games.    Just music for your soul! ";
        radioText.setCrop(0,0,crop_x,50);  
    }

    update () {
        radioText.x -= 0.6;
        crop_x +=0.6;

        //console.log(radioText.x)
        radioText.setCrop(0,0,crop_x,50); 

        if (radioText.x <= -1500) { //repeat radio text
            radioText.x = 100
            crop_x = 290
        }
    }

}
var cropRectangle;
var cropR;
var radioText;
var crop_x;