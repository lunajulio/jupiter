import { useEffect } from 'react';
import Phaser from 'phaser';

function Create() {

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: 'phaser-container',
            scene: {
                preload: preload,
                create: create
            }
        };

        const game = new Phaser.Game(config);

        function preload() {
            // Usamos `this.load` en lugar de `this.load`
            // `this` debe pasarse explícitamente a través de la función de flecha
            this.load.atlas('bird', '../../assets/jupiter.png');
        }

        function create() {
            // Usamos `this.add` en lugar de `this.add`
            // `this` debe pasarse explícitamente a través de la función de flecha
            this.add.text(400, 32, 'Click to get the next sprite', { color: '#00ff00' }).setOrigin(0.5, 0);

            var animConfig = {
                key: 'walk',
                frames: this.anims.generateFrameNames('bird', { prefix: 'frame', end: 9 }),
                repeat: -1,
                showOnStart: true
            };

            this.anims.create(animConfig);

            // Create a bunch of random sprites
            const rect = new Phaser.Geom.Rectangle(64, 64, 672, 472);

            const group = this.add.group();
            group.createMultiple({ key: 'bird', frame: 0, quantity: 64, visible: false, active: false });

            // Randomly position the sprites within the rectangle
            Phaser.Actions.RandomRectangle(group.getChildren(), rect);

            this.input.on('pointerdown', () => {
                const bird = group.getFirstDead();

                if (bird) {
                    bird.active = true;
                    bird.setDepth(bird.y);

                    // As soon as we play the animation, the Sprite will be made visible
                    bird.play('walk');
                }
            });
        }

        return () => {
            game.destroy(true);
        };
    }, []); // Ejecutar solo una vez al montar el componente

    return (
        <div id="phaser-container"></div>
    );
}

export default Create;
