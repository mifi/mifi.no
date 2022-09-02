---
slug: how-to-reduce-startup-time-of-grails-while-developing
title: How to reduce startup time of Grails while developing
authors: mifi
---
Large Grails application with lots of domain classes taking very long to start up very time?

Quick tip: Shave off a few seconds instantly by setting `dbCreate` to something **other** than `update` or `validate`. For instance remove it.
