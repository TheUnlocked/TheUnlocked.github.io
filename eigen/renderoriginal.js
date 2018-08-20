let original = sketch => {
    sketch.setup = () => {
        sketch.createCanvas(tiles_r * 2 * tile_size + 1, tiles_r * 2 * tile_size + 1);
    }

    sketch.draw = () => {
        sketch.clear();
        sketch.scale(1, -1);
        sketch.translate(0, -(tiles_r * 2 * tile_size + 1));

        // Transformed
        sketch.strokeWeight(1);
        sketch.stroke(150);
        let p1, p2;

        for (let i = 0; i <= tiles_r * 2; i++){
            p1 = [-tiles_r, i - tiles_r];
            p2 = [tiles_r, i - tiles_r];
            sketch.line((p1[0] + tiles_r) * tile_size, (p1[1] + tiles_r) * tile_size, (p2[0] + tiles_r) * tile_size, (p2[1] + tiles_r) * tile_size);
        }
        for (let i = 0; i <= tiles_r * 2; i++){
            p1 = [i - tiles_r, -tiles_r];
            p2 = [i - tiles_r, tiles_r];
            sketch.line((p1[0] + tiles_r) * tile_size, (p1[1] + tiles_r) * tile_size, (p2[0] + tiles_r) * tile_size, (p2[1] + tiles_r) * tile_size);
        }
        sketch.stroke(0);

        p1 = [-tiles_r, 0];
        p2 = [tiles_r, 0];
        sketch.line((p1[0] + tiles_r) * tile_size, (p1[1] + tiles_r) * tile_size, (p2[0] + tiles_r) * tile_size, (p2[1] + tiles_r) * tile_size);

        p1 = [0, -tiles_r];
        p2 = [0, tiles_r];
        sketch.line((p1[0] + tiles_r) * tile_size, (p1[1] + tiles_r) * tile_size, (p2[0] + tiles_r) * tile_size, (p2[1] + tiles_r) * tile_size);

        let color = 0;

        let eigenVectors = getNormalizedEigenVectors();

        if (targetedPoint && eigenVectors.length == 2){
            let px = targetedPoint[0], py = targetedPoint[1],
                v1x = eigenVectors[0][0], v1y = eigenVectors[0][1], 
                v2x = eigenVectors[1][0], v2y = eigenVectors[1][1];
            let a = (py - (v2y * px / v2x)) / (v1y - (v2y * v1x / v2x));
            let b = (px - (a * v1x)) / v2x;
            
            sketch.strokeWeight(4);

            sketch.stroke(255, 200, 0);

            p1 = [0, 0];
            p2 = [v1x * a, v1y * a];
            sketch.line((p1[0] + tiles_r) * tile_size, (p1[1] + tiles_r) * tile_size, (p2[0] + tiles_r) * tile_size, (p2[1] + tiles_r) * tile_size);

            sketch.stroke(0, 255, 255);

            p1 = p2;
            p2 = [v2x * b, v2y * b];
            p2 = [p1[0] + p2[0], p1[1] + p2[1]];
            sketch.line((p1[0] + tiles_r) * tile_size, (p1[1] + tiles_r) * tile_size, (p2[0] + tiles_r) * tile_size, (p2[1] + tiles_r) * tile_size);

            sketch.stroke(0, 255, 255);

            p1 = [0, 0];
            p2 = [v2x * b, v2y * b];
            sketch.line((p1[0] + tiles_r) * tile_size, (p1[1] + tiles_r) * tile_size, (p2[0] + tiles_r) * tile_size, (p2[1] + tiles_r) * tile_size);

            sketch.stroke(255, 200, 0);

            p1 = p2;
            p2 = [v1x * a, v1y * a];
            p2 = [p1[0] + p2[0], p1[1] + p2[1]];
            sketch.line((p1[0] + tiles_r) * tile_size, (p1[1] + tiles_r) * tile_size, (p2[0] + tiles_r) * tile_size, (p2[1] + tiles_r) * tile_size);

            sketch.stroke(255, 0, 255);
            p1 = [0, 0];
            sketch.line((p1[0] + tiles_r) * tile_size, (p1[1] + tiles_r) * tile_size, (p2[0] + tiles_r) * tile_size, (p2[1] + tiles_r) * tile_size);
        }

        sketch.strokeWeight(3);
        for (let vector of eigenVectors){
            switch(color){
                case 0:
                    sketch.stroke(255, 0, 0);
                    break;
                case 1:
                    sketch.stroke(0, 0, 255);
                    break;
                case 2:
                    sketch.stroke(0, 255, 0);
                    break;
            }

            sketch.strokeWeight(3);
            p1 = transformPoint([0, 0]);
            p2 = transformPoint(vector);
            sketch.line((p1[0] + tiles_r) * tile_size, (p1[1] + tiles_r) * tile_size, (p2[0] + tiles_r) * tile_size, (p2[1] + tiles_r) * tile_size);


            switch(color){
                case 0:
                    sketch.stroke(255, 0, 0, 200);
                    break;
                case 1:
                    sketch.stroke(0, 0, 255, 200);
                    break;
                case 2:
                    sketch.stroke(0, 255, 0, 200);
                    break;
            }

            sketch.strokeWeight(1);
            sketch.line((tiles_r * tile_size) + vector[0] * -1000, (tiles_r * tile_size) + vector[1] * -1000, (tiles_r * tile_size) + vector[0] * 1000, (tiles_r * tile_size) + vector[1] * 1000);
            color = color + 1 % 3;
        }
    }

    sketch.mouseClicked = () => {
        if (0 < sketch.mouseY && sketch.mouseY < tiles_r * 2 * tile_size && 0 < sketch.mouseX && sketch.mouseX < tiles_r * 2 * tile_size){
            targetedPoint = [sketch.mouseX / tile_size - tiles_r, tiles_r - (sketch.mouseY / tile_size)];
        }
    }

    sketch.mouseDragged = sketch.mouseClicked;
}

let originalCanvas = new p5(original, 'original');