

// scene to handle weapon fire & bullet collisions
export default class combatScene extends Phaser.Scene  {
    constructor(){
        super({key: 'combatScene', active: true})
    };

    preload(){
        this.load.image('laser', './assets/redlaser.png');
        this.load.image('bluelaser', './assets/bluelaser.png');
        this.load.audio("explosionsound", "./assets/sounds/Explosion_Medium_2.wav");
        this.load.audio("laseraudio", "./assets/sounds/fire.wav");
        this.load.audio("bluelaseraudio", "./assets/sounds/bluefire.wav");

        //loadingScreen(this);
    }

    create() {
        // transfer debris from mainScene
        var debris = transferdebris();

        // add audio
        explosionsound = this.sound.add('explosionsound');
        lasersound = this.sound.add("laseraudio", { loop: false });
        bluelasersound = this.sound.add("bluelaseraudio", { loop: false });
        // add laser                                                        
        laser = this.physics.add.group({
            defaultKey: 'laser',
            maxSize: 10
        }); 

        // add blue laser
        bluelaser = this.physics.add.group({
            defaultKey: 'bluelaser',
            maxSize: 30
        }); 

        // add colliders
        this.physics.add.collider(laser, debris, this.bulletcollision, null, this);

        this.physics.add.collider(bluelaser, debris, this.bulletcollision, null, this);
        //this.physics.add.collider(bluelaser, debris, this.bulletcollision, null, this); -- mine collisions

    }

    update(time) {
        // update player object from mainScene
        var player = transferplayer();

        // keymapping
        const shoot = this.input.keyboard.addKey('W');
        const key1 = this.input.keyboard.addKey('ONE');
        const key2 = this.input.keyboard.addKey('TWO');

        // player changes weapons 
        if (key1.isDown && time > weapon_switch_time) {
            weapon = 'laser';
            weapon_switch_time = time + 1000;
        } else if (key2.isDown) {
            weapon = 'bluelaser';
            weapon_switch_time = time + 1000;
        }
        
        
            // FIRING //
        // call fire class when 'w' is down
        if (shoot.isDown && time > lastfired  ){
            if (weapon == 'laser') {
                lasersound.play()
                // get bullet velocity, speed and direction
                const vec = this.physics.velocityFromAngle(player.angle -90, 1);
                var vx = vec.x * 300;   
                var vy = vec.y * 300;

                this.fire(vx,vy, player.angle, player.x,player.y, weapon);

                // rate of fire
                lastfired = time + 2000;
            }
            else if (weapon == 'bluelaser') {
                bluelasersound.play()
                
                const vec = this.physics.velocityFromAngle(player.angle -90, 1);
                var vx = vec.x * 400;   
                var vy = vec.y * 400;
                
                this.fire(vx,vy, player.angle, player.x+5,player.y, weapon);
                this.fire(vx,vy, player.angle, player.x-5,player.y, weapon);
                // rate of fire
                lastfired = time + 1000;
            }   
        } 

        // destroy bullets when they reach the end of screen 
        laser.children.each(function(b) {
            if (b.active) {
                if (b.y < 0 || b.x < 0 || b.x > 1900 || b.y > 1050) {
                    b.setActive(false);
                } 
            }
        }.bind(this));

        console.log(debris_num);
        
    }


    // HELPER FUNCTIONS
    // fire weapon function
    fire(vx, vy, myangle, x, y, weapon){
        if (weapon == 'laser') {
            laserbullet = laser.get(x, y-20);
        }
        else if (weapon == 'bluelaser') {
            laserbullet = bluelaser.get(x, y-20);
        }
        if (laserbullet) {
            laserbullet.setActive(true);
            laserbullet.setVisible(true);
            laserbullet.angle = myangle;
            laserbullet.body.velocity.y = vy;
            laserbullet.body.velocity.x = vx;
        }
    }

    // bullet collision function
    bulletcollision(laserbullet, debris){
        explosionsound.play();
        laserbullet.destroy();
        debris.destroy();
        debris_num -= 1;
    }
    

}

//declare global variables
var explosionsound;
var lastfired = 0;

var debris_num = transferdebris().length;

var laser;
var bluelaser;

var laserbullet;
var lasersound;
var bluelasersound;

var weapon;
var weapon_switch_time = 0;


export function get_debris_num() {
    return debris_num;
}

// import dependencies
import { transferplayer, transferdebris } from "./mainScene.js";
import { loadingScreen } from "../loadingscreen.js";