import { defineConfig } from 'vite';
import UnoCSS from 'unocss/vite';

export default defineConfig({
    plugins: [UnoCSS()],
    // Development server config
    root: 'src/dev', // Set root to dev folder
    server: {
        open: true, // Open index.html automatically
    },
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'sconsole',
            formats: ['es', 'cjs', 'umd', 'iife'],
            fileName: (format) => `s-console.${format}.js`,
        },
        rollupOptions: {
            external: [],
            output: {
                globals: {},
            },
        },
    },
});
