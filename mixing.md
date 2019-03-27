### VOLUME

Set the overall output volume for your project:

```
iMusic.master.output.gain.value = 0.5;
```

Set the volume for one loopTrack or motif

```
iMusic("motif").set("volume", 0.5);
```

NOTE: To decrease the volume, try to set the volume to 50% of the current value. Avoid setting the volume above 1. It might cause digital distortion





### Output


Route a loopTrack or motif to a specified output channel. 

```
/*
NOTE:
0. channel 1
1. channel 2
2. channel 3 
etc.
*/

iMusic("motif").set("output", 1);
```

Route a loopTrack or motif to output channel 1 & 6
```
iMusic("motif").set("output", [0,5]);
```


Route the channels separately in a stereo file i.e. route the left channel to output channel 3 and the right channel to output channel 4
```
iMusic("motif").set("output", [0,1], [2,3]);
```

If the number of output channels are more than the number of files in the audio file, they will be routed sequentially.

i.e.
route the left channel to output channel 3 and 7 and the right channel to output channel 4 and 8
```
iMusic("motif").set("output", [0,1], [2,3,6,7]);
```



### PAN

 Set the pan value for a loopTrack or motif
```
iMusic("motif").set("pan", 0.2);
```

pan from the current value to the specified value over 1000ms
```
iMusic("motif").set("pan", 0.2, 1000);
```

NOTE:
Set the pan value between 0-1. (equals left-right)
If the music is routed to multiple output channels. The sound will pan through the array of channels

i.e. 
```
iMusic("motif").set("output", [0,1,2]);

// this pans the sound to output channel 1
iMusic("motif").set("pan", 0);


// this pans the sound to output channel 2
iMusic("motif").set("pan", 0.5);


// this pans the sound to output channel 3
iMusic("motif").set("pan", 1);
```



### REVERB

Add a convolution reverb to a loopTrack or motif The convolution file is supposed to be in a folder named "audio" in the project folder. Value is the amount of reverb.
```
iMusic("motif").addReverb({url: "st-nicolaes-church.wav", value: 0.5});
```

If you want to send the reverb to other output channels but L+R you need to create a bus with specified channel numbers

```
var reverbBus = iMusic.createBus();

// This example routes the left channel to output channel 1
// and the right channel to output channel 6

reverbBus.setOutput([0,1], [0,5]);


// This example routes the left channel to output 1, 3 & 5
// and the right channel to output 2, 4 & 6

reverbBus.setOutput([0,1], [0,1,2,3,4,5]);
iMusic("motif").addReverb({url: "st-nicolaes-church.wav", output: reverbBus.output});
```




### DELAY

Add a delay to a loopTrack or reverb
```
iMusic("motif").addDelay();
```

If you don't want to use the default values, you can (optionally) set the following parameters:
```
// five eight note delay bouncing through output channel 1-6, decreasing volume with 3dB for 
// each bounce
iMusic("kick").addDelay({delay: "1/8", feedBack: 5, volume: 0.5, decrease: 0.5, outputs: [0,1,2,3,4,5]});

// or with a specified list of possible delay time values:
iMusic("kick").addDelay({delay: "1/8", delayTimes: ["1/32", "1/24", "1/16", "1/12", "1/8", "1/6"], volume: 0.8, decrease: 0.8});
```
* delay - the time between the bounces expressed as note values (strings) or milliseconds (numbers)(default = 250ms)
* delayTimes - array of possible values (any number or strings)
* feedBack - the number of bounces (default = 10)
* volume - the total level of the effect (0 - 1)
* decrease - the rate with which the volume decreases for each bounce (0.5 equals 3dB per bounce)
* outputs - a serie of outputs through which the bounces are traveling (a list of numbers corresponding to the outputs)

It's possible to dynamically change some of the values:
```
iMusic("kick").set("delay", {volume: 0.3});
iMusic("kick").set("delay", {delay: "1/4"});
iMusic("kick").set("delay", {decrease: 0.3});

// If the value is not an object but a number or string,
// it's supposed to be the delay time
iMusic("kick").set("delay", "1/8");


NOTE:
If delayTimes is provided, then set the delay to any of those values using:

```
// if delayTimes is set to ["1/8", "1/16", "1/32"]
// then 
iMusic("kick").set("delay", 0);   // selects "1/8"
iMusic("kick").set("delay", 0.5); // selects "1/16"
iMusic("kick").set("delay", 0.1); // selects "1/32"
```





### CUTOFF

Set the cutoff frequency for the low pass filter at 1000Hz
```
iMusic("motif1").set("filter", 1000);
```

To make more changes to the filter, use get("bus").filter
```

iMusic("drums").get("bus");

