import { Key } from './utils/key.js';

// Documented in software.md
export default function(terminal) {
    const {
        canvas,
        colorBackground,
        colorForeground,
        width,
        height,
        text
    } = terminal;
    const scope = {
        canvas,
        width,
        height,
        Key,
        text: (x, y, text, color = colorForeground) => {
            canvas.fillStyle = color;
            canvas.fillText(text, x, y);
        },
        clear: () => {
            canvas.fillStyle = colorBackground;
            canvas.fillRect(
                0,
                0,
                width,
                height
            );
            canvas.fillStyle = colorForeground;
        },
        delay: (milliseconds) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, milliseconds);
            })
        }
    };
    (async () => {
      await new Function([
            '(async () => {',
            'const {',
            '    canvas,',
            '    width,',
            '    height,',
            '    Key,',
            '    text,',
            '    clear,',
            '    delay',
            '} = this;',
            '// Clear Canvas',
            'clear();',
            '// Start Application Code',
            text,
            '// End Application Code',
            '})()'
        ].join('\n')).call(scope);
    })();
}