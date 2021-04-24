# NFC Terminal

Requirements:

- Raspberry Pi 3 or better, the Zero W is just to slow for web stuff
- PN532 Chip https://www.amazon.com/gp/product/B01I1J17LC/
  - You do need to solder the 4 pins to the board.
  - UART works best as the node-i2c library is not complete

Tools:

Really tried to keep this as basic as possible.
- Express for handling requests.
- Plain HTML + JS + CSS... one `index.html` file.
- `Consolas.ttf` Font, but not required.