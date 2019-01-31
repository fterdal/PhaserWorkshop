/* global Phaser */
import 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey);

    // << INITIALIZE PLAYER ATTRIBUTES HERE >>
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
    this.facingLeft = false;
    this.armed = false;
  }

  // Check which controller button is being pushed and execute movement & animation
  update(cursors, jumpSound) {
    this.updateMovement(cursors);
    this.updateJump(cursors, jumpSound);
    this.updateInAir()
  }

  updateMovement(cursors) {
    // Move left
    if (cursors.left.isDown) {
      if (!this.facingLeft) {
        this.flipX = !this.flipX;
        this.facingLeft = true;
      }
      this.setVelocityX(-360);
      if (this.body.touching.down) {
        this.play('run', true);
      }
    }
    // Move right
    else if (cursors.right.isDown) {
      if (this.facingLeft) {
        this.flipX = !this.flipX;
        this.facingLeft = false;
      }
      this.setVelocityX(360);

      if (this.body.touching.down) {
        this.play('run', true);
      }
    }
    // Neutral (no movement)
    else {
      this.setVelocityX(0);
      if (this.armed) {
        this.play('idleArmed');
      } else {
        this.play('idleUnarmed');
      }
    }
  }

  updateJump(cursors, jumpSound) {
    if (cursors.up.isDown && this.body.touching.down) {
      this.setVelocityY(-800);
      jumpSound.play();           // Play our jump sound here
    }
  }

  updateInAir() {
    if (!this.body.touching.down) {
      this.play('jump');
    }
  }
}
