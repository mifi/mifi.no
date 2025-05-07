---
slug: use-apple-homekit-to-control-cheap-telldus-devices
title: Use Apple HomeKit to control cheap 433 MHz devices
authors: mifi
tags:
  - open source
  - apple
---

[homebridge-telldus](https://github.com/jchnlemon/homebridge-telldus) is a plugin for [homebridge](https://github.com/nfarina/homebridge) which allows you to control cheap 433MHz devices like wireless light switches and dimmers from Apple's Home integration. This is done through [Telldus Live](https://live.telldus.com/), which provides a free service and API integration for people who bought their devices like TellStick Net and TellStick ZNet Lite. It provides a very cheap way to control your house with Siri and Apple Home.

<!--truncate-->

![](https://static.mifi.no/dist/2017/IMG_2777.jpg)

See compatible hardware here:
https://old.telldus.com/products/compability

v1 of the `homebridge-telldus` plugin now also supports local communiation directly with devices that support this, like the TellStick ZNet Lite.

For instructions on how to set up the system, see:
https://github.com/jchnlemon/homebridge-telldus
