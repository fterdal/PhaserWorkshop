/* global Phaser */
import Player from '../entity/Player';
import Enemy from '../entity/Enemy';
import Gun from '../entity/Gun';
import Laser from '../entity/Laser';
import Ground from '../entity/Ground';

export default class FgScene extends Phaser.Scene {
  constructor() {
    super('FgScene');
    this.collectGun = this.collectGun.bind(this);
    this.fireLaser = this.fireLaser.bind(this);
    this.hit = this.hit.bind(this);
  }

  preload() {
    // Sprites
    this.load.image('ground', 'assets/sprites/ground.png');
    this.load.spritesheet('josh', 'assets/spriteSheets/josh.png', {
      frameWidth: 340,
      frameHeight: 460,
    });
    this.load.image('brandon', 'assets/sprites/brandon.png');
    this.load.image('gun', 'assets/sprites/gun.png');
    this.load.image('laserBolt', 'assets/sprites/laserBolt.png');

    // Sounds
    this.load.audio('jump', 'assets/audio/jump.wav');
  }

  create() {
    // Create the ground
    this.createGroups();
    // We're going to create a group for our lasers
    this.lasers = this.physics.add.group({
      classType: Laser,
      maxSize: 40,
      runChildUpdate: true,
      allowGravity: false
    });

    // Josh. The player. Our sprite is a little large, so we'll scale it down
    this.player = new Player(this, 60, 400, 'josh').setScale(0.25);
    this.enemy = new Enemy(this, 600, 400, 'brandon').setScale(0.25);
    this.gun = new Gun(this, 200, 400, 'gun').setScale(0.25);
    this.physics.add.collider([
      this.player,
      this.enemy,
      this.gun,
    ], this.groundGroup);
    // this.physics.add.collider(this.lasers, this.enemy);
    this.physics.add.collider(this.enemy, this.player);

    // When the laser collides with the enemy
    this.physics.add.overlap(
      this.lasers,
      this.enemy,
      this.hit,
      null,
      this
    );

    // When the player collides with the gun
    this.physics.add.overlap(
      this.player,
      this.gun,
      this.collectGun,    // Our callback function that will handle the collision logic
      null,               // processCallback. Can specify a function that has custom collision
      // conditions. We won't be using this so you can ignore it.
      this                // The context of 'this' for our callback. Since we're binding
      // our callback, it doesn't really matter.
    );

    // Assign the cursors
    this.cursors = this.input.keyboard.createCursorKeys();

    // Create sounds
    this.jumpSound = this.sound.add('jump');

    // Create player's animations
    this.createAnimations();

  }

  collectGun(player, gun) {
    // << ADD GAME LOGIC HERE >>
    this.player.armed = true;
    this.gun.disableBody(true, true);
  }

  hit(enemy, laser) {
    laser.setActive(false);
    laser.setVisible(false);
  }

  // time: total time elapsed (ms)
  // delta: time elapsed (ms) since last update() call. 16.666 ms @ 60fps
  update(time, delta) {
    this.player.update(this.cursors, this.jumpSound); // Add a parameter for the jumpSound
    this.gun.update(
      time,
      this.player,
      this.cursors,
      this.fireLaser  // Callback fn for creating lasers
    );
  }

  // Callback fn. We implement it here b/c our scene has references to the lasers group and the player
  fireLaser(x, y, left) {
    // These are the offsets from the player's position that make it look like
    // the laser starts from the gun in the player's hand
    const offsetX = 56;
    const offsetY = 14;
    const laserX =
      this.player.x + (this.player.facingLeft ? -offsetX : offsetX);
    const laserY = this.player.y + offsetY;

    // Get the first available laser object that has been set to inactive
    let laser = this.lasers.getFirstDead();
    // Check if we can reuse an inactive laser in our pool of lasers
    if (!laser) {
      // Create a laser bullet and scale the sprite down
      laser = new Laser(
        this,
        laserX,
        laserY,
        'laserBolt',
        this.player.facingLeft
      ).setScale(0.25);
      this.lasers.add(laser);
    }
    // Reset this laser to be used for the shot
    laser.reset(laserX, laserY, this.player.facingLeft);
  }

  // Make the ground
  createGround(x, y) {
    this.groundGroup.create(x, y, 'ground');
  }

  // Make all the groups
  createGroups() {
    this.groundGroup = this.physics.add.staticGroup({ classType: Ground });
    //add ground to group
    this.createGround(160, 540);
    this.createGround(600, 540);
  }

  createAnimations() {
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('josh', { start: 17, end: 20 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'jump',
      frames: [{ key: 'josh', frame: 17 }],
      frameRate: 20,
    });
    this.anims.create({
      key: 'idleUnarmed',
      frames: [{ key: 'josh', frame: 11 }],
      frameRate: 10,
    });
    this.anims.create({
      key: 'idleArmed',
      frames: [{ key: 'josh', frame: 6 }],
      frameRate: 10,
    });
  }

}
