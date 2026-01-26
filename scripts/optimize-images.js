
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';


// We need to use glob to find files recursively. 
// Since glob might not be installed, we can use recursive readdir or just install glob.
// Let's assume we can use fs.readdirSync recursively.

const PUBLIC_DIR = path.join(process.cwd(), 'client/public');

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", file));
        }
    });

    return arrayOfFiles;
}

async function optimizeImages() {
    const files = getAllFiles(PUBLIC_DIR);
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png)$/i.test(file));

    console.log(`Found ${imageFiles.length} images to optimize.`);

    for (const file of imageFiles) {
        const ext = path.extname(file);
        const newFile = file.replace(new RegExp(`${ext}$`), '.webp');

        if (fs.existsSync(newFile)) {
            console.log(`Skipping ${path.basename(file)}, webp already exists.`);
            continue;
        }

        try {
            console.log(`Converting ${path.basename(file)} to WebP...`);
            await sharp(file)
                .webp({ quality: 80 })
                .toFile(newFile);

            // Optional: Remove original? The user asked to "convert". 
            // Keeping original is safer for fallback, but user wants "load faster".
            // If I update the code to use .webp, original is dead weight.
            // I will keep originals for safety unless explicitly asked to delete.
            // Wait, "convert the files in to webp". Usually implies replacement.
            // But if I delete, I can't go back. I'll keep them for now.
        } catch (err) {
            console.error(`Error converting ${file}:`, err);
        }
    }
}

optimizeImages();
