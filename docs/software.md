# Software

> Note: 

Goal: Write your own software. Full JavaScript or write simple applications with helper functions.

## Sample App

### Hello World

```javascript
canvas.fillStyle = '#9CDCFE';
canvas.fillText('Hello World!', 10, 10);
```

With global helper methods.

```javascript
text(10, 10, 'Hello World!', 10, 10);
```

## Helper

### Properties

Several basic properties are provided.

| Property | Description |
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
| `log(message)` | Log to console |
| `clear(color = background)` | Clear canvas |
| `text(x, y, text, color = foreground)` | Draw Text |
| `rect(x, y, width, height, color)` | Draw Rectangle |
| `roundedRect(x, y, width, height, radius, color)` | Draw Rectangle |
| `circle(x, y, radius)` | Draw Circle |
| `key(key, callback)` | Handle Key |