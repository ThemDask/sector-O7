import { transferplayer, transferdebris } from "./mainScene.js";

// scene to handle weapon fire & bullet collisions
export default class combatScene extends Phaser.Scene  {
    constructor(){
        super({key: 'combatScene', active: true})
    };

    preload(){
        this.load.image('laser', './assets/redlaser.png');
        this.load.audio("explosionsound", "./assets/sounds/Explosion_Medium_2.wav");
        this.load.audio("laseraudio", "./assets/sounds/Rebel_Laser_2.wav");
    }

    create() {
        // transfer debris from mainScene
        var debris = transferdebris();

        // add audio
        explosionsound = this.sound.add('explosionsound');

        // add laser                                                        
        laser = this.physics.add.group({
            defaultKey: 'laser',
            maxSize: 100
        }); 

        // add collider
        this.physics.add.collider(laser, debris, this.bulletcollision, null, this);
    }

    update(time) {
       
        // update player object from mainScene
        var player = transferplayer();
        
        // keymapping
        var shoot = this.input.keyboard.addKey('W');

        // load audio
        var lasersound = this.sound.add("laseraudio", { loop: false });

            // FIRING //
        // call fire class when 'w' is down
        if (shoot.isDown && time > lastfired ){
            lasersound.play()
            // get bullet velocity, speed and direction
            const vec = this.physics.velocityFromAngle(player.angle -90, 1);
            var vx = vec.x * 800;   
            var vy = vec.y * 800;
            //fire bullet
            this.fire(vx,vy, player.angle, player.x,player.y);

            // rate of fire
            lastfired = time + 500;
        } 

        // destroy bullets when they reach the end of screen
        laser.children.each(function(b) {
            if (b.active) {
                if (b.y < 0 || b.x < 0 || b.x > 1200 || b.y > 1000) {
                    b.setActive(false);
                } 
            }
        }.bind(this));

    }


    // HELPER FUNCTIONS
    // fire weapon function
    fire(vx, vy, myangle, x, y){
            laserbullet = laser.get(x, y-20);
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
    }

}

//declare global variables
var explosionsound;
var lastfired = 0;
var laser;
var laserbullet;





