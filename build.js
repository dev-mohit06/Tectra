import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { minify } from 'minify';  // Changed from "import minify" to "import { minify }"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration for your specific folder structure
const config = {
    input: {
        html: './src/index.html',
        css: './src/assets/css/index.css',
        js: {
            dir: './src/assets/js',
            files: [
                'jquery-3.7.1.min.js',
                'main.js',
                'scrollreveal.min.js',
                'swiper-bundle.min.js'
            ]
        },
        imgs: './src/assets/imgs',
    },
    output: {
        root: './dist',
        assets: './dist/assets',
        css: './dist/assets/css',
        js: './dist/assets/js',
        imgs: './dist/assets/imgs'
    },
    minifyOptions: {
        html: {
            removeComments: true,
            removeEmptyAttributes: true,
            collapseWhitespace: true
        },
        css: {
            compatibility: '*'
        },
        js: {
            ecma: 5,
            compress: true,
            mangle: true
        }
    }
};

async function createDirectories() {
    // Create all necessary directories
    await fs.mkdir(config.output.root, { recursive: true });
    await fs.mkdir(config.output.assets, { recursive: true });
    await fs.mkdir(config.output.css, { recursive: true });
    await fs.mkdir(config.output.js, { recursive: true });
    await fs.mkdir(config.output.imgs, { recursive: true });
}

async function buildProject() {
    try {
        // Create directory structure
        await createDirectories();

        // Process HTML
        console.log('Processing HTML...');
        const minifiedHtml = await minify(config.input.html, config.minifyOptions);
        await fs.writeFile(join(config.output.root, 'index.html'), minifiedHtml);

        // Process CSS
        console.log('Processing CSS...');
        const minifiedCss = await minify(config.input.css, config.minifyOptions);
        await fs.writeFile(join(config.output.css, 'index.css'), minifiedCss);

        // Process JS files
        console.log('Processing JavaScript...');
        for (const jsFile of config.input.js.files) {
            const inputPath = join(config.input.js.dir, jsFile);
            const outputPath = join(config.output.js, jsFile);
            
            // If file is already minified (.min.js), copy directly
            if (jsFile.includes('.min.js')) {
                await fs.copyFile(inputPath, outputPath);
                console.log(`Copied: ${jsFile}`);
            } else {
                const minifiedJs = await minify(inputPath, config.minifyOptions);
                await fs.writeFile(outputPath, minifiedJs);
                console.log(`Minified: ${jsFile}`);
            }
        }

        // Copy images and SVGs
        console.log('Copying images and SVGs...');
        const imgFiles = await fs.readdir(config.input.imgs);
        for (const file of imgFiles) {
            const inputPath = join(config.input.imgs, file);
            const outputPath = join(config.output.imgs, file);
            await fs.copyFile(inputPath, outputPath);
            console.log(`Copied: ${file}`);
        }

        console.log('Build completed successfully!');
    } catch (error) {
        console.error('Build failed:', error);
        console.error(error.stack);
    }
}

buildProject();