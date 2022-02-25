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
    console.log(text);

    terminal.onClose(() => {
        console.log('Run Cleanup');
    });
}