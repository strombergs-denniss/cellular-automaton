    /*
        for (let a = 0; a < data.length / 3; a++) {
            let b = textureWidth * textureHeight;

            let neighbourCount =
                (data[(a - 1) % b * 3] == 255) +
                (data[(a + 1) % b * 3] == 255) +
                (data[(a + textureWidth) % b * 3] == 255) +
                (data[(a - textureWidth) % b * 3] == 255) +
                (data[(a + textureWidth - 1) % b * 3] == 255) +
                (data[(a + textureWidth + 1) % b * 3] == 255) +
                (data[(a - textureWidth - 1) % b * 3] == 255) +
                (data[(a - textureWidth + 1) % b * 3] == 255);


            if (data[a * 3] == 0) {
                if (neighbourCount == 3) {
                    data[a * 3 + 1] = 255;
                }
            }

            if (data[a * 3] == 255) {
                if (neighbourCount < 2 || neighbourCount > 3) {
                    data[a * 3 + 1] = 0;
                }
            }
        }

        for (let a = 0; a < textureWidth * textureHeight; a++) {
            data[a * 3] = data[a * 3 + 1];
            data[a * 3 + 2] = data[a * 3 + 1];
        }
    */
