import sharp from "sharp";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Setup __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const imgPng = (dir, file,image) => {
    return Promise.all([
        sharp(file.buffer)
            .rotate()
            .png()
            .resize(1024)
            .toFile(path.join(__dirname, dir, image))
    ]);
}


export default imgPng
