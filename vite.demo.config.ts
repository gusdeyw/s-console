import { defineConfig } from 'vite';
import UnoCSS from 'unocss/vite';

export default defineConfig({
    plugins: [UnoCSS()],
    root: 'src/dev',
    base: '/s-console/', // GitHub Pages base path (replace with your repo name)
    build: {
        outDir: '../../dist-demo',
        emptyOutDir: true,
        rollupOptions: {
            input: 'src/dev/index.html',
        },
    },
    server: {
        open: true,
    },
});