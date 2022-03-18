import Terminal from './terminal.js';

const canvas = document.getElementById("canvas");

const terminal = new Terminal(canvas, 1024, 768);

// Get Examples
fetch('/examples')
    .then((req) => {
        return req.json();
    })
    .then((examples) => {
        const select = document.getElementById('examples');
        examples.forEach((example) => {
            const option = document.createElement('option');
            option.innerText = example.name;
            option.value = example.name;
            select.appendChild(option);
        });
        select.addEventListener('change', (e) => {
            const { target } = e;
            selectExample(target.value);
        });
        selectExample(examples[0].name);
    });

function selectExample(name) {
    const write = document.getElementById('textarea');
    fetch(`/example/${name}`)
        .then((req) => {
            return req.json();
        })
        .then((records) => {
            write.value = records[4];
        });
}

const run = document.getElementById('run');
run.addEventListener('click', () => {
    const write = document.getElementById('textarea');
    terminal.load([
        'javascript',
        '1',
        '',
        '',
        write.value
    ]);
});

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
    switch (e.target.dataset.program) {
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