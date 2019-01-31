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
    this.load.image('laser', 'assets/sprites/laserBolt.png');
  }

  create() {
    // Create the ground and lasers
    this.createGroups();

    // Josh. The player. Our sprite is a little large, so we'll scale it down
    this.player = new Player(this, 20, 400, 'josh').setScale(0.25);
    this.enemy = new Enemy(this, 600, 400, 'brandon').setScale(0.25);
    this.gun = new Gun(this, 200, 400, 'gun').setScale(0.25);
    this.physics.add.collider([
      this.player,
      this.enemy,
      this.gun,
    ], this.groundGroup);
    this.physics.add.collider(this.enemy, this.player);

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

    // Create player's animations
    this.createAnimations();

  }

  collectGun(player, gun) {
    // << ADD GAME LOGIC HERE >>
    this.player.armed = true;
    this.gun.disableBody(true, true);
  }

  // time: total time elapsed (ms)
  // delta: time elapsed (ms) since last update() call. 16.666 ms @ 60fps
  update(time, delta) {
    this.player.update(this.cursors);
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
