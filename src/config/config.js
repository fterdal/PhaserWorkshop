/* global Phaser */
export default {
  type: Phaser.AUTO,  // Specify the underlying browser rendering engine (AUTO, CANVAS, WEBGL)
                      // AUTO will attempt to use WEBGL, but if not available it'll default to CANVAS
  width: 800,   // Game width in pixels
  height: 600,  // Game height in pixels
  // physics: { ... },   // Will be explained in more detail later
  // This option is to turn off the default behavior of images being automatically sharpened.
  // Since we'll be using pixel art, we want every beautiful pixel untouched!
  render: {
    pixelArt: true,
  }
};
