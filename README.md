# NFC Terminal

**Goal:** Vintage cartridge computer that stores data via NFC key fobs.

| Holotape | Computer |
| -------- | -------- |
| [<img src="docs/assets/holotape-thumb.jpg" width="480">](docs/assets/holotape.jpg) | ... |

## Guides

| Guide | Description |
| ----- | ----------- |
| [Holotape](docs/holotape.md) | Step by step guide for making a Holotape cartridge. |
| [Computer](docs/computer.md) | Step by step guide for building the computer. |
| [Software](docs/software.md) | Customization / development instructions. |
| [FAQ](docs/faq.md) | Troubleshooting and general answers. |

## Hardware

- Raspberry Pi Zero 2 W
- PN532 Chip
  - https://www.amazon.com/gp/product/B01I1J17LC/
  - You do need to solder the 4 pins to the board.
  - UART works best as the node-i2c library is not complete
- 1024x768 8" HDMI Non-Touch Display.
  - https://chicagodist.com/products/hdmi-8-ips-lcd-screen-kit-1024x768
- 1024x768 8" HDMI Touch Display.
  - ???
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

## NFC Lifecycle

- LED Off
- Ready
  - Cartridge slot LED Solid
  - Wait for cartridge
    - Cartridge Inserted
      - Cartridge slot LED Pulses
      - Read cartridge data
      - Data modification is written
    - Cartridge Removed
  - Repeat Wait for Cartridge

## Data

All records must exist for the cartridge to be properally read.

> All 5 records are written in order.

- Type
  - `text`
- Total Writes
  - `42`
- Created Date (20 chars)
  - `2021-05-09T19:31:31Z`
- Modified Date (20 chars)
  - `2021-05-09T19:31:31Z`
- Text (~2k/4k/8k minus 70 chars)
  - All text data.