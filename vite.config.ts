import { defineConfig } from 'vite';

export default defineConfig({
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
