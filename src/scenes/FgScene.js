/* global Phaser */
import Player from '../entity/Player'
import Ground from '../entity/Ground'

export default class FgScene extends Phaser.Scene {
  constructor() {
    super('FgScene');
  }

  preload() {
    // Preload Sprites
    // << LOAD SPRITES HERE >>
    // this.load.path = 'assets/'
    this.load.spritesheet('josh', 'assets/spriteSheets/josh.png', {
      frameWidth: 340,
      frameHeight: 460,
    })
    this.load.image('ground', 'assets/sprites/ground.png')
    // this.load.spritesheet('josh')

    // Preload Sounds
    // << LOAD SOUNDS HERE >>
  }

  create() {
    // Create game entities
    // << CREATE GAME ENTITIES HERE >>
    this.player = new Player(this, 80, 400, 'josh').setScale(0.25)
    // this.ground = new Ground(this, 80, 400, 'ground')
    // this.groundGroup = this.physics.add.staticGroup({ classType: Ground });
    this.createGroups(160, 540);
    // this.createGround(600, 540);


    // Create sounds
    // << CREATE SOUNDS HERE >>

    // Create collisions for all entities
    // << CREATE COLLISIONS HERE >>
  }

  createGround(x, y) {
    this.groundGroup.create(x, y, 'ground');
  }

  createGroups() {
    this.groundGroup = this.physics.add.staticGroup({ classType: Ground });
    //add ground to group
    this.createGround(160, 540);
    this.createGround(600, 540);
    this.lasers = this.physics.add.group({
      classType: Laser,
      maxSize: 40,
      runChildUpdate: true,
      allowGravity: false
    });
  }

  // createGround(x, y) {
  //   console.log('CREATING Groups')
  //   this.groundGroup.create(x, y, 'ground');
  // }

  // time: total time elapsed (ms)
  // delta: time elapsed (ms) since last update() call. 16.666 ms @ 60fps
  update(time, delta) {
    // << DO UPDATE LOGIC HERE >>
  }

}
