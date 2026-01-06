---
slug: ios-web-app-cache-manifest-self-signed-ssl-problem
title: iOS Web App cache manifest + self-signed SSL problem
authors: mifi
tags:
  - ios
---
So I am making a HTTPS HTML5 Web App, and I was having problems getting HTML5 Application Cache working on iOS when adding the App to home screen. In Chrome and Safari Mobile everything was working fine, but when i added the App to the Home Screen, NETWORK resources stopped working. After hours of de-hairing, I figured out that the problem was that I was using a self-signed SSL certificate.
Since this is just an internal web app for controlling my home, I didn't want to pay for an SSL certificate for each of my subdomains, so I created my own CA-certificate. I linked this with my server SSL certificate for my web app server and added the CA certificate to my profiles on the iPhone. Now safari accepts my server SSL cert, and the Home Screen web app does too. Success!
