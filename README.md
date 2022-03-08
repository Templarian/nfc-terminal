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
- 1024x768 8" HDMI Non-Touch Display.
  - https://chicagodist.com/products/hdmi-8-ips-lcd-screen-kit-1024x768
  - https://www.adafruit.com/product/4338
- MIFARE DESFire EV1 2k/4k/8k Fobs
  - https://www.amazon.com/gp/product/B07D925N54/
  - EV1 or EV2, no security features are used.

## Software

- Express for handling requests.
- HTML Canvas + JS
- Will try to use `Consolas` font if found.

## NFC Lifecycle

- LED (5 Brightness)
- Ready
  - Cartridge slot LED Solid
  - Wait for cartridge
    - Cartridge Inserted
      - Cartridge slot LED Pulses
      - Read cartridge data
        - Process Data
      - Data Modified
        - Write Data
        - LED (255 Brightness)
    - Cartridge Removed
  - Repeat Wait for Cartridge
- Error
  - Logo Red

## Data

All records must exist for the cartridge to be properally read.

> All 5 records are written in order.

- Type
  - `text`, `javascript`
- Total Writes
  - `42`
- Created Date
  - `2021-05-09T19:31:31Z`
- Modified Date
  - `2021-05-09T19:31:31Z`
- Text (~2k/4k/8k minus)
  - All text data.