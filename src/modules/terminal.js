export default class Terminal {
    colorBackground = '#1E1E1E';
    colorForeground = '#9CDCFE';

    c = null;
    focus = null;
    type = '';
    types = {
        'text': 'editor',
        'markdown': 'editor',
        'javascript': 'program'
    };

    constructor(canvas, width, height) {
        this.c = canvas.getContext("2d");
        canvas.width = width;
        canvas.height = height;
        this.width = width;
        this.height = height;
        this.c.textBaseline = 'top';
        this.updateFont();
        document.addEventListener('keydown', this.keyDown.bind(this));
        this.loadAssets();
    }

    get canvas() {
        return this.c;
    }

    _assets = [];
    get assets() {
        if (this.isLoaded) {
            return this._assets;
        }
        return [
            './assets/holotape.png',
            './assets/z.png'
        ];
    }

    isLoaded = false;
    
    loadAssets() {
        const { assets } = this;
        const promises = assets.map((asset) => {
            const image = new Image();
            const promise = new Promise((resolve) => {
                image.onload = function() {
                    resolve({
                        image: this,
                        width: this.naturalWidth,
                        height: this.naturalHeight
                    });
                };
            });
            image.src = asset;
            return promise;
        });
        Promise.all(promises).then((data) => {
            this.isLoaded = true;
            this._assets = data;
            this.render();
        });
    }

    load(records) {
        const {
            types
        } = this;
        const [
            type,
            count,
            created,
            modified,
            text
        ] = records;
        if (type in types) {
            this.type = type;
            this.created = created;
            this.modified = modified;
            this.text = text;
            this.count = count;
            import(`./types/${types[type]}.js`).then((module) => {
                module.default(this);
            });
        } else {
            this.renderError(`Invalid type (records[1] = ${type})`);
        }
    }

    updateFont() {
        this.c.font = `${this.fontSize}px ${this.font}`;
        const rect = this.c.measureText('0');
        this.charWidth = rect.width;
        this.charHeight = rect.fontBoundingBoxAscent + rect.fontBoundingBoxDescent;
        this.charOffset = rect.fontBoundingBoxAscent;
    }

    _x = 0;
    set x(value) {
        this._x = value;
    }
    get x() {
        return this._x;
    }

    _y = 0;
    set y(value) {
        this._y = value;
    }
    get y() {
        return this._y;
    }

    charWidth = 0;
    charHeight = 0;
    charOffset = 0;

    width = 1024;
    height = 768;

    _displayLineNumbers = true;
    set displayLineNumbers(value) {
        this._displayLineNumbers = value;
    }
    get displayLineNumbers() {
        return this._displayLineNumbers;
    }

    get startColumn() {
        return 4;
    }

    get columns() {
        return Math.floor(this.width / this.charWidth);
    }

    get rows() {
        return Math.floor(this.height / this.charHeight);
    }

    get offsetX() {
        const diffWidth = this.width % this.charWidth;
        return Math.ceil(diffWidth / 2);
    }

    get offsetY() {
        const diffHeight = this.height % this.charHeight;
        return Math.ceil(diffHeight / 2) + 2;
    }

    _font = 'Consolas';
    set fontSize(value) {
        this._font = `${value}px`;
        this.c.font = `${this._fontSize} ${this._font}`;
        this.updateFont();
    }
    get fontSize() {
        return this._font;
    }

    _fontSize = 38;
    set fontSize(value) {
        this._fontSize = `${value}px`;
        this.c.font = `${this._fontSize} ${this._font}`;
        this.updateFont();
    }
    get fontSize() {
        return this._fontSize;
    }

    _text = '';
    set text(value) {
        this._text = value;
    }
    get text() {
        return this._text;
    }

    get lines() {
        return this._text.split(/\n/);
    }

    keyDown(e) {
        const {
            focus
        } = this;
        if (focus === null) {
            return;
        }
        console.log(e.key);
        if (e.ctrlKey && e.key == 'p') {
            console.log('Commands');
            e.preventDefault();
            return;
        }
        if (e.ctrlKey) {
            return;
        }
        switch(e.key) {
            case 'ArrowUp':
                this.y--;
                break;
            case 'ArrowRight':
                this.x++;
                break;
            case 'ArrowDown':
                this.y++;
                break;
            case 'ArrowLeft':
                this.x--;
                break;
            case 'Tab':
                this.tab();
                e.preventDefault();
                break;
            case 'Backspace':
                this.backspace();
                break;
            default:
                this.insert(e.key);
        }
        this.render();
        document.getElementById('textarea').value = this._text;
    }

    tab() {
        // Tab
    }

    insert(char) {
        const { x, y, lines } = this;
        lines[y] += '.';
        this._text = lines.join('\n');
    }

    backspace() {
        const { x, y, lines } = this;
        const chars = lines[y].split('');
        chars.pop();
        lines[y] = chars.join('');
        this._text = lines.join('\n');
    }

    lineNumber(i) {
        const s = `000${i + 1}`;
        return s.substring(s.length - 3, s.length);
    }

    renderEditor() {
        this.focus = 'editor';
        this.render();
    }

    renderError(message) {
        const {
            c
        } = this;
        this.renderBlank();
        c.fillStyle = '#CC5A5A';
        c.fillText(message, 10, 10);
    }

    render() {
        const {
            c,
            x,
            y,
            width,
            height,
            charWidth,
            charHeight,
            charOffset,
            offsetX,
            offsetY,
            lines,
            colorForeground,
            lineNumber
        } = this;
        this.renderBlank();
        if (!this.isLoaded) {
            this.c.fillStyle = colorForeground;
            const loading = 'Loading...';
            this.c.fillText(
                loading,
                width - (charWidth * (loading.length + 3)),
                height - (charHeight * 2)
            );
            return;
        }
        // Caret
        /*this.c.fillStyle = '#CC0000';
        this.c.fillRect(
            offsetX + (this.x * charWidth),
            offsetY + (this.y * charHeight) - charOffset,
            charWidth,
            charHeight
        );*/
        c.fillStyle = '#AEAFAD';
        c.fillRect(
            offsetX + (this.x * charWidth) - 2,
            offsetY + (this.y * charHeight) - charOffset,
            4,
            charHeight
        );
        // Line Numbers
        c.globalAlpha = 0.5;
        c.fillStyle = colorForeground;
        for (let i = 0; i < this.rows; i++) {
            c.fillText(
                lineNumber(i),
                offsetX,
                offsetY + (i * charHeight)
            );
        }
        // Line
        c.globalAlpha = 1;
        c.fillStyle = '#282828';
        c.fillRect(
            0,
            offsetY + (charHeight * y) - charOffset,
            width,
            2
        );
        c.fillRect(
            0,
            offsetY + (charHeight * (y + 1)) - charOffset,
            width,
            2
        );
        // Text
        c.globalAlpha = 1;
        c.fillStyle = colorForeground;
        lines.forEach((line, i) => {
            this.c.fillText(
                line,
                offsetX + (charWidth * 4),
                offsetY + (i * charHeight)
            );
        });
    }

    renderBlank() {
        const {
            width,
            height,
            colorBackground
        } = this;
        // Clear Arrow
        clearInterval(this.arrowClearTimeout);
        // Background
        this.c.fillStyle = colorBackground;
        this.c.fillRect(
            0,
            0,
            width,
            height
        );
    }

    slotWidth = 288;
    slotHeight = 62;

    renderSlot() {
        const {
            c,
            width,
            height,
            slotWidth,
            slotHeight,
            colorBackground,
            colorForeground
        } = this;
        let x = (width - slotWidth) / 2,
            y = ((height - slotHeight) / 2) - 158,
            i = 0,
            total = 14;
        c.fillStyle = colorForeground;
        const f = setInterval(() => {
            c.fillRect(x + 6 + (i * 20), y + 6, 16, 50);
            i++;
            if (i == total) {
                clearInterval(f);
            }
        }, 50);
    }

    arrowClearTimeout;
    renderEmpty() {
        const {
            c,
            assets,
            width,
            height,
            slotWidth,
            slotHeight,
            colorForeground,
            colorBackground
        } = this;
        const {
            image: insert,
            width: insertWidth,
            height: insertHeight
        } = assets[0];
        this.renderBlank();
        // Draw Image
        let x = (width - slotWidth) / 2,
            y = ((height - slotHeight) / 2) - 158;
        c.fillStyle = colorForeground;
        c.fillRect(x, y, slotWidth, slotHeight);
        c.fillStyle = colorBackground;
        c.fillRect(x + 2, y + 2, slotWidth - 4, slotHeight - 4);
        // Draw Holotape
        c.drawImage(
            insert,
            (width - insertWidth) / 2,
            ((height - insertHeight) / 2) + 65
        );
        // Insert Triangle
        this.arrow();
        this.arrowClearTimeout = setInterval(() => {
            this.arrow();
        }, 1000);
    }

    arrowBlink = true;
    arrow() {
        const {
            c,
            width,
            height,
            colorForeground,
            colorBackground
        } = this;
        let tW = 34,
            tH = 14,
            tX = (width - tW) / 2,
            tY = ((height - tH) / 2) - 78;
        c.fillStyle = colorBackground;
        c.fillRect(tX - 2, tY - tH - 2, tW + 4, tH + 4);
        c.fillStyle = colorForeground;
        c.strokeStyle = colorForeground;
        c.lineJoin = 'round';
        c.lineWidth = 2;
        c.beginPath();
        c.moveTo(tX, tY);
        c.lineTo(tX + tW, tY);
        c.lineTo(tX + (tW / 2), tY - tH);
        c.closePath();
        if (this.arrowBlink) {
            c.fill();
        }
        c.stroke();
        this.arrowBlink = !this.arrowBlink;
    }

    renderSleep() {
        const {
            c,
            width,
            height,
            charWidth,
            charHeight,
            colorForeground
        } = this;
        // Clear Canvas
        this.renderBlank();
        // Time
        const time = '5 Minutes';
        c.fillStyle = colorForeground;
        c.fillText(
            time,
            charWidth * 3,
            height - (charHeight * 2)
        );
        // Instructions
        c.globalAlpha = 0.5;
        const text = 'Press any key...';
        const r = c.measureText(text);
        c.fillStyle = colorForeground;
        c.fillText(
            text,
            width - Math.floor((charWidth * 3) + r.width),
            height - Math.floor((charHeight * 2))
        );
        this.renderZ();
    }

    renderZ() {
        const {
            c,
            assets,
            width,
            height,
            colorForeground
        } = this;
        const {
            image: z,
            width: zWidth,
            height: zHeight
        } = assets[1];
        const x = (width / 2) - zWidth,
            y = (height / 2) - zHeight;
            
        c.globalAlpha = 0.75;
        c.drawImage(z, x, y, zWidth, zHeight);
        c.globalAlpha = 0.5;
        c.drawImage(z, x - zWidth - 20, y + 48, zWidth, zHeight);
        c.globalAlpha = 1;
        c.drawImage(z, x + zWidth + 20, y - 48, zWidth, zHeight);
    }

    _close = null;
    /**
     * Listen for cartridge removal.
     * @param {Function} callback Called on removal of cartridge.
     */
    onClose(callback) {
        this._close = callback;
    }
}