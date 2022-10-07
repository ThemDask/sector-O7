export default class radioScene extends Phaser.Scene {
    constructor() {
        super({key: 'radioScene', active: true})
    }

    preload () {
        this.load.image('radioHUD', './assets/radioHUD.png');
    }

    create () {

        this.add.image(200, 27, 'radioHUD');

        radioText =  this.add.text(100, 20, '',
        { font: '20px Roboto', fill: '#ffffff' }).setDepth(0);

        crop_x = 290;
        radioText.text = "Did you ever hear the tragedy of Darth Plagueis The Wise? I thought not. It's not a story the Jedi would tell you. It's a Sith legend. Darth Plagueis was a Dark Lord of the Sith, so powerful and so wise he could use the Force to influence the midichlorians to create life… He had such a knowledge of the dark side that he could even keep the ones he cared about from dying...";
        radioText.setCrop(0,0,crop_x,50);  
    }

    update () {
        radioText.x -= 0.5;
        crop_x +=0.5;

        radioText.setCrop(0,0,crop_x,50); 
    }

}
var cropRectangle;
var cropR;
var radioText;
var crop_x;