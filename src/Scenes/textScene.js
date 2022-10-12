
// Scene to handle textbox
export default class textScene extends Phaser.Scene {
    constructor(){
        super({key: 'textScene', active: true})
    };

    preload(){

        this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');

        loadingScreen(this);
    }

    create(){   
        // 600, 835

        // start textScene after 1 second delay
         this.scene.sleep();
        // setTimeout(() => {
        //     this.scene.wake();
        //   }, 1500);

        // simple dialog config - used in simple dialog cases (no choices)
        simpledialogconfig = {
            x: 840,
            y: 985,
            width: 600,
        
            background: this.rexUI.add.roundRectangle(0, 0, 100, 100, 2, 0x2F2F37, 0x2F2F37),
        
            
            title: createLabel(this, 'Kadd the Engineer'),

            content: createLabel(this, 'So, what do you think?'),

            actions: [ 
                createLabel(this, 'next')
            ],
        
            space: {
                left: 20,
                right: 20,
                top: -20,
                bottom: -20,
        
                title: 20,
                titleLeft: 100,
                content:10,
                description: 25,
                descriptionLeft: 20,
                descriptionRight: 20,
                choices: 25,
        
                toolbarItem: 5,
                choice: 15,
                action: 5,
            },
        
            expand: {
                title: false,
                content: true
            },
        
            align: {
                title: 'left',
                actions: 'right'
            },
        
            click: {
                mode: 'pointerup',
                clickInterval: 100
            }
        }


        // choice dialog config - used in dialog cases where the player
        // has to pick one from a set of dialog choices
        choicedialogconfig = {
            x: 840,
            y: 915,
            width: 600,
        
            background: this.rexUI.add.roundRectangle(0, 0, 100, 100, 2, 0x2F2F37, 0x2F2F37),
        
            title: createLabel(this, '-playername-').setDraggable(),

            choices: [
                createLabel(this, 'Looks good, Kadd.', 1),
                createLabel(this, 'Seems sufficient.', 2),
                createLabel(this, 'Is this the best we could do?', 3)
            ],

            actions: [ 
                createLabel(this, 'confirm')
            ],
        
            space: {
                left: 20,
                right: 20,
                top: -20,
                bottom: -20,
        
                title: 20,
                titleLeft: 100,
                content:10,
                description: 25,
                descriptionLeft: 20,
                descriptionRight: 20,
                choices: 25,
        
                toolbarItem: 5,
                choice: 15,
                action: 5,
            },
        
            expand: {
                title: false,
                choices: true
            },
        
            align: {
                title: 'left',
                choices: 'right'
            },
        
            click: {
                mode: 'release',
                clickInterval: 100
            }
        }

        // create simple dialogue instance
        dialog1 = this.rexUI.add.dialog(simpledialogconfig)
        .setDraggable('background')   
        .layout()
        .setActive(true)
        .setDepth(0)
        .popUp(500);

        // create choice dialogue instance - disabled at start
        dialog2 = this.rexUI.add.dialog(choicedialogconfig)
        .setDraggable('background')   
        .layout()
        .setActive(false)
        .setDepth(0)
        .popUp(500);

        // make smooth dialogue popup 
        var tween = this.tweens.add({
            targets: dialog1,
            scaleX: 1,
            scaleY: 1,
            ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 500,
            repeat: 0, // -1: infinity
            yoyo: false
        });

        //DIALOG 1 CONFIG
        // configure simple dialogue buttons
        dialog1
        // make button glow when hovering
        .on('button.over', function (button) {
            button.getElement('background').setStrokeStyle(1, 0xFFFFFF);
        })

        .on('button.out', function (button) {
            button.getElement('background').setStrokeStyle();
        })
        // on-click action
        .on('button.click', function(button) {
            if (button.text = 'next' ){
                dialog1.setActive(false);
                dialog1.setVisible(false);
                dialog2.setActive(true); //simpledialogconfig.content.text = 'And be careful, you know\nhow difficult it is to find Godmetal around here?';
            }
        }, this);

        //DIALOG 2 CONFIG
        // configure choice dialogue buttons
        dialog2
        // make button glow when hovering
        .on('button.over', function (button) {
            button.getElement('background').setStrokeStyle(1, 0xFFFFFF);
        })

        .on('button.out', function (button) {
                button.getElement('background').setStrokeStyle();
        })

        // on-click action
        .on('button.click', function(button) {
            if (button.name  == 1||button.name  == 2||button.name  == 3){
                button.getElement('background').setStrokeStyle(1, 0x00FF00); 
                clicked = true;
            } else if (clicked){
                dialog2.setActive(false);
                dialog2.setVisible(false);

                simpledialogconfig.content.text = 'Take it for a spin. You’ll start to get the hang of it.';
                dialog1.setActive(true);
                dialog1.setVisible(true);
                objective_started = true;

            }
        }, this);

    }


    update(){
        //console.log(dialog1killed);
        //console.log(times);
    }
}


// text config
var createLabel = function (scene, text, name) {
    return scene.rexUI.add.label({
        width: 40, // Minimum width of Rectangle inside of dialog box
        height: 50, // Minimum height of Rectangle inside of dialog box
      
        // Rectangle inside of dialog box
        background: scene.rexUI.add.roundRectangle(0, 0, 100, 4, 4, 0x01004D),

        text: scene.add.text(0, 0, text, {
            fontSize: '16px'
        }),
        name: name,
        space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
        }
    });
}



// declare global variables
var objective_started = false;
var dialog1;
var dialog2;
var simpledialogconfig;
var choicedialogconfig;
var times=0;
var clicked = false;

export function transferObjectiveState() {
    return objective_started;
}

import { loadingScreen } from "../loadingscreen.js";