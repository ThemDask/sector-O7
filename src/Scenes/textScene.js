// Scene to handle textbox
export default class textScene extends Phaser.Scene {
    constructor(){
        super({key: 'textScene', active: false})
    };
    preload(){
        this.load.image('textbox', './assets/textbox.png');
    }

    create(){   
        box = this.add.image(800, 700, 'textbox');
        box.setScale(0.5);
        box.setVisible(false);
    }

    update(){
        if (box){
            box.setVisible(true);
        }
    }
}


var box;