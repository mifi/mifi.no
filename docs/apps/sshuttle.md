---
tags: [tips, apps, macos, linux, coding]
---
# `sshuttle` - VPN over SSH

There is a cute litte program called sshuttle for shuttling IP subnet traffic over and SSH connection, like a VPN but doesn't require any setup on the remote end. (Mac and Linux).

As far as i understand, it will add a firewall rule to the client saying which destinations to tunnel (the specified netmask), and will forward these packets using a python script through an ssh pipe to a python script in the other end that will spit out the packets into the target network.

Turns out in Yosemite Apple removed ipfw and moved over to pf, so in order to get it to work you need the newest version of sshuttle, from here (which supports `pf`):

[github.com/sshuttle](https://github.com/sshuttle/sshuttle)

...or install via `homebrew`

## Examples

```bash
# All traffic through the server, and DNS too
sshuttle -v --dns -r user@server 0/0
# Only the networks the server is on (-N: ask the server for its subnets, -H: also its hostnames)
sshuttle -vNHr user@server
# Only one subnet, with a specific SSH key
sshuttle -v -e "ssh -i ~/.ssh/my_key" -r user@server 10.0.0.0/16
# Through a jump host
sshuttle -v -e 'ssh -J user@jump-host' -r user@server 10.0.0.0/24
```

UDP doesn't go through sshuttle (only TCP and DNS), except with `--method=tproxy` on Linux. On a Mac, use a real VPN like WireGuard or OpenVPN for UDP.

Sources:
[vpn-too-complicated-use-a-ip-over-ssh-tunnel-instead](https://ariejan.net/2012/07/11/vpn-too-complicated-use-a-ip-over-ssh-tunnel-instead/)
