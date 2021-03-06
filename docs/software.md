# Software

**Goal:** Develop applications that can be written to a cartridge.

## Sample App

### Hello World

```javascript
canvas.fillStyle = '#9CDCFE';
canvas.fillText('Hello World!', 10, 10);
```

With global helper methods.

```javascript
text(10, 10, 'Hello World!');
```

[hello_world.js](examples/hello_world.js)

## Helper

### Properties

Several basic properties are provided.

| Property | Description |
|----------|-------------|
| `canvas` | Canvas Context |
| `width`  | Width |
| `height` | Height |
| `charWidth` | Character Width |
| `charHeight` | Character Height |
| `background` | Background |
| `foreground` | Foreground Text Color |

### Methods

Many helper methods are provided for quicker coding of applications.

| Method | Description |
|--------|-------------|
| `log(message)` | Log to console |
| `clear(color = background)` | Clear canvas |
| `text(x, y, text, color = foreground)` | Draw Text |
| `rect(x, y, width, height, color)` | Draw Rectangle |
| `roundedRect(x, y, width, height, radius, color)` | Draw Rectangle |
| `circle(x, y, radius)` | Draw Circle |
| `key(key, callback)` | Handle Key |
| `await write(key, value)` | Write key, value, null removes key |
| `await read(key)` | Write key; return value |
| `frames(callback)` | Call every frame. |
| `await delay(ms)` | Wait milliseconds. |