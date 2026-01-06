---
tags: [tesla]
---
# Tesla

Here's some tips I gathered mostly for my 2023 (pre-highland) *Tesla Model 3*, and information about the inner workings of the car (much of which is not officially documented).

## WiFi / Cellular

Tesla can connect to a WiFi network, setup using its in-car UI.

### On battery

- The car will auto disconnect from WiFi after a while when the car is idle and goes to sleep (and not plugged in).
- The car can then be woken up over cellular - it will then connect to WiFi, and sleep again after a while. Other than that, the car will not wake up by itself and connect to WiFi (in my experience).
- If the car has gone to sleep, and has no cellular (but within WiFi range, e.g. underground parking garage), there's no way of connecting to the car.
- Sentry Mode seems to keep the car connected to WiFi ([but only for 1-2 days](https://teslamotorsclub.com/tmc/threads/how-to-keep-m3-attached-to-wifi.143990/#post-7482609) or maybe [indefinitely](https://www.reddit.com/r/TeslaModel3/comments/11k1bxk/will_sentry_mode_use_wifi_for_camera_feeds/jb5r01o/)?)

### Plugged in and charging

TODO: Document this scenario.

### Plugged in and not charging (charging limit reached)

TODO: Document this scenario.

## [Sentry Mode](https://www.tesla.com/ownersmanual/model3/en_us/GUID-56703182-8191-4DAE-AF07-2FDC0EB64663.html)

Sentry mode keeps the cameras and computer running to process image data to trigger events to your phone.

### Power consumption

The computer and electronics draws a baseline of about 300W. For a Model 3 with a 60kWh LFP battery that is about  **0.5% per hour** (`300/1000/60=0.005`), or **12% per day**.

### Sentry Mode Live Camera

Sentry Mode Live Camera View lets you view a live camera feed from the car anytime while Sentry Mode is enabled. [Evidence](https://www.reddit.com/r/TeslaLounge/comments/16msrdb/issue_with_sentry_mode/k1a6d88/) suggests that the Live View will try to use WiFi when possible (and fallback to cellular). So if there is no cellular, it will use WiFi for the live view. But Live View will not work (even WiFi) if Premium Connectivity is not paid for.

There is a max limit of [1 hour (?) per day (country dependent)](https://www.reddit.com/r/TeslaModel3/comments/11k1bxk/will_sentry_mode_use_wifi_for_camera_feeds/jb5jel9/) or [X MB per month](https://www.reddit.com/r/TeslaModel3/comments/r1qil3/live_sentry_view_only_works_over_wifi_anyone_else/hm0r0c4/) of cellular for the live view.

## 12V

There is a 12V outlet (cigarette plug). Tesla will turn off 12v power when the car goes to sleep. There are ways to prevent the car from sleeping: Sentry mode or Camp Mode.

### Peltier fridge box

Small and light weight. I have one of these.

### Compressor fridge box

A compressor fridge box is much more efficient than a peltier fridge box, and it can produce much lower temperatures, however it's heavy and takes up a lot more space.

- https://www.aliexpress.com/item/1005005707509076.html
- https://eur.vevor.com/car-refrigerator-c_10723/portable-mini-refrigerator-compressor-quick-cooling-20l-car-freezer-fridge-p_010862402439
- https://www.jula.no/catalog/fritid/friluftsliv-og-camping/kjolebokser/kjolebokser/fryse-kjoleboks-024100/
- https://www.amazon.com/EUHOMY-Refrigerator-Electric-110-240V-Portable/dp/B0BYZNH4NX/
- https://www.amazon.com/Refrigerator-35Liter-120-240V-Freezer-Camping/dp/B08N63CSH5/
- https://www.jula.no/catalog/hjem-og-husholdning/kjokkenmaskiner/hvitevarer/kjoleskap-og-frysere/minikjoleskap-022595/
- [F40C4TMP (US only shipping :()](https://www.amazon.com/F40C4TMP-Portable-Refrigerator-7-6%E2%84%89-50%E2%84%89-Compressor/dp/B08VHT4RTR)
- [150$ + import fee shipping](https://www.rpmtesla.com/collections/new-items-add-on-parts/products/draft-tesla-refrigerator-cooler?variant=40669651009590)

### Fridge in your Tesla on road trips

In my experience when on road trips leaving a 12V (peliter) fridge box in the car (and putting sun shades on the windscreen) with Camp Mode works great. It will drain 300W+ due to the Tesla's idle current draw. It can be left for days without problems. This is only possible because electric cars have such a large battery. It would not be possible on a gas car (a fridge would drain the 12V battery very fast).
