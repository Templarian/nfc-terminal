# Computer

This guide will step you through building the computer.

## Raspberry Pi OS

Install [Raspberry Pi OS](https://www.raspberrypi.com/software/) to a Micro SD card.

## Solder PN

## Connect Cables

Wiring Guide

## Enable Serial UART

1. In the Terminal `sudo raspi-config`
2. Arrow down to "Interface Options" press Enter
3. Arrow down to "Serial Port" press Enter
4. "Would you like a login shell to be accessible over serial?" **No**
5. "Would you like the serial port hardware to be enabled?" **Yes**
6. Press enter to confirm these settings
7. Right Arrow twice to "Finish"
8. Select Reboot

## Install libnfc

```bash
sudo apt-get update
sudo apt-get install git autoconf libtool libusb-dev
git clone https://github.com/nfc-tools/libnfc
```

## Install NodeJS

```
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```

## Wire Diagram

4 Cables to required to...

## 3D Print Computer Case