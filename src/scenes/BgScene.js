/* global Phaser */
import 'phaser';

export default class BgScene extends Phaser.Scene {
  constructor() {
    super('BgScene');
  }

  preload() {
    // Preload Sprites
    // << LOAD SPRITE HERE >>
    // console.log('this.load', this.load)
    this.load.path = 'assets/backgrounds/'
    this.load.image('sky', 'sky.png')
    this.load.image('logo', 'fullBlastLogo.png')
    // this.scene.scene.load('/assets/backgrounds/sky.png')
    // this.scene.load('/assets/backgrounds/sky.png')
    // this.scene.load('/assets/backgrounds/fullBlastLogo.png')
  }

  create() {
    // Create Sprites
    // << CREATE SPRITE HERE >>
    this.add.image(-160, 0, 'sky').setOrigin(0).setScale(0.5)
    this.add.image(380, 80, 'logo').setScale(5)
  }
}
