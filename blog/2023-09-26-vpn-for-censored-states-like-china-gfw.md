---
slug: vpn-for-censored-states-like-china-gfw
title: 'VPN for censored state like China (GFW) - 2023'
authors: 'mifi'
tags: [vpn, censorship, gfw, china]
---

After using NordVPN for years, but not really being satisfied, I did some research to find better alternatives. Here's a little (hopefully unbiased) collection of resources on accessing the free internet in heavily censoring states like China.

<!--truncate-->

Apparently most mainstream VPNs like NordVPN, ExpressVPN etc. all *claim* to work in China, but in reality they don't. Because they are so popular, GFW will easily identify and block their servers and protocols very fast (cat/mouse-game). I've personally used NordVPN for a long time, but their app is horribly slow, buggy, freezes and keeps signing me out all the time. Also when I've actually *needed it* to work due to censorship in certain countries, it usually didn't work.

## [Surfshark](https://surfshark.com/)

**Cheap.** Used to work in China but apparently not anymore (2023).

## [Astrill VPN](https://www.astrill.com/)

**Expensive.** Astrill VPN seems to be a go-to-service that kind of *just works* in China most of the time but people say it is slow. They have their own [proprietary obfuscated protocols](https://www.astrill.com/features/vpn-protocols).

- https://www.reddit.com/r/chinalife/comments/13g2l4m/best_vpn_for_china_2023/
- https://www.reddit.com/r/China/comments/1017p4x/vpn_rant_2023/

## [LetsVPN](https://letsvpn.world/)

**Cheap.** Many people report it working. Possibly Chinese owned, local servers. Probably not 100% safe and they might monitor traffic - some reports of people getting [banned from visiting certain sites](https://www.reddit.com/r/vpnreviews/comments/149d55a/working_vpn_in_china/jo6xps5/). Not sure if it works on all sites.

- https://www.reddit.com/r/China/comments/13lhb9n/am_i_able_to_buy_and_use_letsvpn_while_in_china/

## Clodflare WARP+ (aka. 1.1.1.1)

Reportedly this service works well in China because Cloudflare runs the VPN on the same servers of websites that Chinese rely on every day, making it harder to block.

## [Shadowrocket](https://apps.apple.com/ca/app/shadowrocket/id932747118)

Shadowrocket is a **paid** iOS/iPadOS app that also works on Apple Silicon Macs (M1/M2) due to ARM. This app supports most exotic open source tunneling protocols and can also be used with other servers than WannaFlix 👍

For Shadowrocket you need to bring your own servers.

### [WannaFlix](https://wannaflix.com/)

[Great documentation](https://docs.wannaflix.net/), supports many [exotic circumvention protocols](https://docs.wannaflix.net/which-protocol-to-choose). Hong Kong based, so might be risky. They endorse the Shadowrocket app.

Setup: https://docs.wannaflix.net/mac-os/v2ray-shadowsocks/shadowrocket-m1-macs-only

### Free providers

There are many other companies like [sshOcean](https://sshocean.com/), [OpenTunnel](https://opentunnel.net/), [GreenSSH](https://greenssh.com/) that all kind of look the same. They provide free servers for many of the protocols supported by Shadowrocket. Seems to work with the Shadowrocket app. You just copy paste the (TLS) `vmess://`-URI into Chrome and it will launch the Shadowrocket app and add the configuration. They give you a temporary credential for like 7 days. Not sure who they are or how they make money or pay for their costs, but sshOcean's domain name is registered in Reykjavik, Iceland. 🤔

#### [VPN.fail](https://vpn.fail/)

They claim to do it as a [philanthropic](https://vpn.fail/faq) [gesture](https://vpn.fail/about). Considering that they provide a list of their servers as a [JSON file](https://vpn.fail/free-proxy/json), I would think that GFW would easily block all of these servers. Note: `vmess://` URIs are not available in the JSON API, only through the web UI.

- https://vpn.fail/free-proxy
- https://vpn.fail/free-proxy/type/v2ray

#### Parsing `vmess://` URLs

With Node.js:

```js
JSON.parse(Buffer.from('vmess://uri'.replace(/^vmess:\/\//, ''), 'base64').toString())
```

Example output:
```json
{
  add: '198.2.218.26',
  aid: 64,
  host: 'www.51360818.xyz',
  id: '418048af-a293-4b99-9b0c-98ca3580dd24',
  net: 'ws',
  path: '/path/1695204567237',
  port: 443,
  ps: '🇺🇸US-198.2.218.26-0169',
  tls: 'tls',
  type: 'auto',
  security: 'auto',
  'skip-cert-verify': true,
  sni: ''
}
```

### Hosting your own server

Drawbacks: In order to host many different protocols (for redundancy), take a lot of effort setting up. Also if your IP gets banned, there's no fallback. There are many open source protocols like Shadowsocks.

- https://github.com/shadowsocks/shadowsocks-rust

## Other / technical info
- https://github.com/net4people/bbs/issues/129
- https://github.com/klzgrad/naiveproxy

## Links
- https://en.m.wikipedia.org/wiki/Great_Firewall#Methods_for_bypassing_the_firewall
- https://www.reddit.com/r/vpnreviews/comments/149d55a/working_vpn_in_china/
