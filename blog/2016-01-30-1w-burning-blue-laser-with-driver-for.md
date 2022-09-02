---
slug: 1w-burning-blue-laser-with-driver-for
title: '1W burning blue laser with driver for <$36'
authors: mifi
tag:
  - hardware
---
![](https://static.mifi.no/uploads/2016/01/laser.jpg)

## Items
* M140 laser diode (&lt;$30 on ebay)
* Aixiz module (&lt;$3 on ebay)
* LED driver supplying 1-1.25A. I used this one (&lt;$3): http://www.dx.com/p/18v-5w-cree-circuit-board-for-flashlights-16-8mm-5-5mm-26110

## Instructions
1. Unscrew line/cross filter in front of lens on Aixiz module, if present.
2. Remove existing red laser diode from Aixiz module by using a vise, some cloth and screws for pushing it out.
3. Carefully insert new m140 laser diode using a vise and some cloth and screws for pushing it in by its base.
4. Google "m140 pinout" to figure out the pins
5. Solder the outputs from the LED driver module to the m140 + and - pins.
5. Connect some voltage source to the module's input, i used a 3S LiPo.

## Important notes
* Use laser safety goggles for the correct wavelength.
* Laser diodes are very sensitive to voltage transients and static electricity. This means that when handling and soldering the diode, keep the two pins shorted until it is completely soldered to the driver circuit, then disconnect the short. I used some tiny connector probes that clamped on to each pin.
* Keep the soldering quick. They don't want high temperatures. Preferable mount the diode in a module before soldering (to ensure heatsinking)
http://club.dx.com/reviews/26110
