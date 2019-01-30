/* global Phaser */
import Player from '../entity/Player';
import Ground from '../entity/Ground';

export default class FgScene extends Phaser.Scene {
  constructor() {
    super('FgScene');
  }

  preload() {
    // Sprites
    this.load.image('ground', 'assets/sprites/ground.png');
    this.load.spritesheet('josh', 'assets/spriteSheets/josh.png', {
      frameWidth: 340,
      frameHeight: 460,
    });

  }

  create() {
    // Create the ground and lasers
    this.createGroups();

    // Josh. The player. Our sprite is a little large, so we'll scale it down
    this.player = new Player(this, 20, 400, 'josh').setScale(0.25);
    this.physics.add.collider(this.player, this.groundGroup);
    // Assign the cursors
    this.cursors = this.input.keyboard.createCursorKeys();

    // Create player's animations
    this.createAnimations();
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
  }

}
