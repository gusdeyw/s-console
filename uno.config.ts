// uno.config.ts
import { defineConfig } from 'unocss';
import presetAttributify from '@unocss/preset-attributify';
import presetIcons from '@unocss/preset-icons';
import transformerCompileClass from '@unocss/transformer-compile-class';
import presetWind4 from '@unocss/preset-wind4';

export default defineConfig({
    content: {
        filesystem: [
            '../../src/**/*.{js,ts,html}',
            '../**/*.{js,ts,html}',
            './**/*.{js,ts,html}',
            './**/**/*.{js,ts,html}',
            '*.{js,ts,html}'
        ],
    },
    presets: [
        presetWind4(),
        presetAttributify(),
        presetIcons(),
    ],
    transformers: [
        transformerCompileClass(),
    ],
});
