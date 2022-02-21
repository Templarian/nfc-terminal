import Terminal from './terminal.js';

// Application
if (window.devicePixelRatio !== 1) {
    document.body.classList.add('debug');
}

const canvas = document.getElementById("canvas");

const terminal = new Terminal(canvas, 1024, 768);
terminal.font = 'Convas';
terminal.fontSize = 38;
terminal.text = 'Hello World!j\nLine 2j\nLine 3';
const renderEmpty = document.getElementById('renderEmpty');
renderEmpty.addEventListener('click', () => {
    terminal.renderEmpty();
});
const renderSlot = document.getElementById('renderSlot');
renderSlot.addEventListener('click', () => {
    terminal.renderSlot();
});
const renderSleep = document.getElementById('renderSleep');
renderSleep.addEventListener('click', () => {
    terminal.renderSleep();
});
const renderEditor = document.getElementById('renderEditor');
renderEditor.addEventListener('click', () => {
    terminal.renderEditor();
});
const programs = document.getElementById('programs');
programs.addEventListener('click', (e) => {
    switch(e.target.dataset.program) {
        case 'text':
            terminal.load([
                'text',
                '42',
                '2021-05-09T19:31:31Z',
                '2021-05-09T19:31:31Z',
                `Hello World!`
            ]);
            break;
        case 'hello_world':
            terminal.load([
                'javascript',
                '42',
                '2021-05-09T19:31:31Z',
                '2021-05-09T19:31:31Z',
                `canvas.fillText('Hello World!', 10, 10);`
            ]);
            break;
        case 'chat_app':
            terminal.load([
                'javascript',
                '42',
                '2021-05-09T19:31:31Z',
                '2021-05-09T19:31:31Z',
                `canvas.fillText('Chat app', 10, 10);`
            ]);
            break;
        case 'invalid':
            terminal.load([
                'invalid',
                '42',
                '2021-05-09T19:31:31Z',
                '2021-05-09T19:31:31Z',
                `Invalid type.`
            ]);
            break;
    }
});