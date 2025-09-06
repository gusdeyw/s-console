import { defineConfig } from 'vite';
import UnoCSS from 'unocss/vite';

export default defineConfig(({ command }) => ({
    plugins: [UnoCSS()],
    ...(command === 'serve' ? { root: 'src/dev' } : {}),
    server: {
        open: true,
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
}));
