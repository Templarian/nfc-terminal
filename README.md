# NFC Terminal

**Goal:** Vintage cartridge computer that stores data via NFC.

[Image Here]

## Hardware

- Raspberry Pi 3 or better
  - Tested on Raspberry Pi 4
- PN532 Chip
  - https://www.amazon.com/gp/product/B01I1J17LC/
  - You do need to solder the 4 pins to the board.
  - UART works best as the node-i2c library is not complete
- 1024x600 7" HDMI Display.
  - https://www.amazon.com/gp/product/B07Y889J3X/
- MIFARE DESFire EV1 2k/4k/8k Fobs
  - https://www.amazon.com/gp/product/B07D925N54/
  - Not using security stuff, but EV2 would work also.

## Software

Really tried to keep this as basic as possible.
- Express for handling requests.
- Plain HTML + JS + CSS... one `index.html` file.
- `Consolas` is assumed to be installed.

## Shell

The files are optimized for a SLA Resin printer.

## NFC Lifecycle

- Ready
  - Cartridge slot LED solid
  - Wait for cartridge
    - Cartridge Inserted
      - Cartridge slot LED pulses
      - Read cartridge data
      - Data modification is written
    - Cartridge Removed
  - Repeat Wait for Cartridge