---
slug: custom-pwm-input-rangetravel-in-multiwii
title: Custom pwm input range/travel in MultiWii
authors: mifi
tags:
  - multicopter
  - tips
---
I use MultiWii for my quadcopter. But I had a problem. My transmitter was not able to send values in the full range (1000-2000), so i had to scale the value from the center point (1500) up, and down.

Replace the fraction `22/20` with whatever scaling value you want, and replace `THROTTLEPIN` with whatever pin you want to scale.

Here are the changes I made (`RX.ino` in MultiWii 2.2):
```c
@@ -110,8 +114,13 @@
           rcValue[rc_value_pos] = dTime;                             \
           if((rc_value_pos==THROTTLEPIN || rc_value_pos==YAWPIN ||   \
               rc_value_pos==PITCHPIN || rc_value_pos==ROLLPIN)       \
-              && dTime>FAILSAFE_DETECT_TRESHOLD)                     \
-                GoodPulses |= (1<<rc_value_pos);                     \
+              && dTime>FAILSAFE_DETECT_TRESHOLD) {                   \
+            GoodPulses |= (1<<rc_value_pos);                         \
+            if (rc_value_pos == THROTTLEPIN) {                       \
+              tmp = ((int16_t)dTime-1500)*22/20+1500;                \
+              rcValue[rc_value_pos] = tmp;                           \
+            }                                                        \
+          }                                                          \
         }                                                            \
       } else edgeTime[pin_pos] = cTime;                              \
     }
@@ -133,6 +142,7 @@
     uint8_t mask;
     uint8_t pin;
     uint16_t cTime,dTime;
+    int16_t tmp;
     static uint16_t edgeTime[8];
     static uint8_t PCintLast;
   #if defined(FAILSAFE) && !defined(PROMICRO)
```
