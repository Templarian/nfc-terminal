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
        wait: (milliseconds) => {
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
            '    clear,',
            '    wait',
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