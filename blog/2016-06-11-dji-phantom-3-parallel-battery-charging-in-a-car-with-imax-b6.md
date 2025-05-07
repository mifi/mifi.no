---
slug: dji-phantom-3-parallel-battery-charging-in-a-car-with-imax-b6
title: DJI Phantom 3 parallel battery charging in a car with iMax B6
authors: mifi
tags:
  - tip
  - hardware
---
I bought a "Multi Battery Parallel Charging Board For DJI phantom3" on ebay, and I soldered on a deans female connector for connecting it to my iMax B6 charger.

![](https://static.mifi.no/dist/2016/06/s-l1600.jpg)
Since the Phantom 3 battery is intelligent and has its charging circuitry in the battery itself, the iMax will just work as a voltage booster with an output of 18V. This is 0.5V more than the DJI charger provides but it seems to work. So anything that can output &gt;3A ~17.5V should be able to replace the iMax.

![](https://static.mifi.no/dist/2016/06/IMG_4578.jpg)


1. Connect iMax input to car cigarette connector
2. Connect iMax output to the multi-charging board.
3. Connect the Phantom battery to the board
4. Choose Pb charge, 5.0A, 18.0V (9P)
5. Turn the battery on right before long-pressing start on the iMax (by using the short-then-long-press sequence on the Phantom battery.)
6. When the battery is full it will say CONNECTION BREAK, but this is because the intelligent battery circuit will disconnect itself when fully charged.

[Demo video](https://youtu.be/dwvNmm8RDU8)

In the next version i will be using a cheap boost converter from ebay, like this:
[http://www.ebay.com/itm/150W-DC-DC-Boost-Converter-10-32V-to-12-35V-6A-Step-Up-Voltage-Charger-Power-/171907240597](http://www.ebay.com/itm/150W-DC-DC-Boost-Converter-10-32V-to-12-35V-6A-Step-Up-Voltage-Charger-Power-/171907240597)

References:
- [http://www.phantompilots.com/threads/imax-b6ac-charging-for-phantom-3-batteries.73523/](http://www.phantompilots.com/threads/imax-b6ac-charging-for-phantom-3-batteries.73523/)
- [http://www.ebay.com/itm/381638038289](http://www.ebay.com/itm/381638038289)
- [https://www.youtube.com/watch?v=QzI4wmgrd5E](https://www.youtube.com/watch?v=QzI4wmgrd5E)
