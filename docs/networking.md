---
tags: [networking, ssh, tips, macos, linux]
---
# Networking tricks

See also [sshuttle](apps/sshuttle.md) for a VPN over SSH.

## Capture packets on a remote machine, live in your local Wireshark

Runs `tcpdump` over SSH and pipes the packets straight into Wireshark on your Mac, so you get the GUI without installing anything but `tcpdump` on the remote (excluding SSH itself, so you don't capture your own capture):

```bash
ssh user@remote-host 'sudo tcpdump -U -n -w - -i eth0 -s 65535 not port 22' \
  | /Applications/Wireshark.app/Contents/MacOS/Wireshark -k -i -
```

## Forward a port through two SSH hops

Reach a service on a machine that's only reachable from a jump host (here NFS, port 2049, on `192.168.1.10` behind `jump-host`). Then connect to `localhost:2049`:

```bash
ssh -t -L 2049:localhost:2049 user@jump-host ssh -N -L 2049:localhost:2049 root@192.168.1.10
```

## Find live hosts on the network

```bash
# Hosts your Mac has talked to recently (fast, no scan)
arp -a
# Ping scan a subnet
sudo nmap -sn 192.168.1.0/24
# More thorough: ARP, TCP SYN/ACK and UDP probes, fastest timing
sudo nmap -n -sn -PR -PS -PA -PU -T5 192.168.1.0/24
# Hosts with SSH open, with the server version
nmap -p 22 --open -sV 192.168.1.0/24
```

## List listening ports

With the process that owns each port:

```bash
# macOS (-n and -P skip slow name lookups)
lsof -nP -iTCP -sTCP:LISTEN
# or, also on macOS
netstat -anv -p tcp | grep LISTEN
# Linux
sudo ss -ltnp
```

## Resume a big file copy with rsync

```bash
rsync -avP --append src/file user@host:dest/file
```

`--append` continues where an interrupted transfer stopped, instead of starting over. Use `--append-verify` to also check the result (on a Mac, that needs a newer rsync: `brew install rsync`, since the built-in one doesn't support it).
