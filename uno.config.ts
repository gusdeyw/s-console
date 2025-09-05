// uno.config.ts
import { defineConfig } from 'unocss';
import presetAttributify from '@unocss/preset-attributify';
import presetIcons from '@unocss/preset-icons';
import presetWind4 from '@unocss/preset-wind4';

export default defineConfig({
    content: {
        filesystem: [
            'src/**/*.{js,ts,html}',
            'src/dev/**/*.{js,ts,html}',
            '**/*.html'
        ],
    },
    presets: [
        presetWind4(),
        presetAttributify(),
        presetIcons(),
    ],
    // Add safelist for all classes used in sConsole.ts template literals
    safelist: [
        'p-5', 'rounded-lg', 'border-2', 'border-solid', 'border-#1e1e1e',
        'text-gray-700', 'text-sm', 'font-bold', 'my-2', 'px-3',
        'flex', 'justify-between', 'bg-#1e1e1e', 'cursor-pointer',
        'p-1', 'text-white', 'rounded-md', 'h-56', 'overflow-y-auto',
        'w-full', 'focus:outline-none', 'text-red-500'
    ]

});
