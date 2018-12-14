## Reverb
If you want to add a reverb (or another effect) to a [loopTrack](tracks.md), [Motif](motifs.md) or [Lead-in](lead-ins.md) you can use any convolve-file. You put it together with your audio files in the "audio" folder in your project. iMusic also provides some files to use. Their URL begins with

http://momdev.se/interactivemusic/audio/convolve/

Here are the files you can try out:

block-inside.wav
cement-blocks-1.wav
conic-long-echo-hall.wav
deep-space.wav
french-18th-century-salon.wav
going-home.wav
large-bottle-hall.wav
large-long-echo-hall.wav
large-wide-echo-hall.wav
st-nicolaes-church.wav
trig-room.wav
vocal-duo.wav


i.e.

```javascript
// create a [loopTrack](Tracks.md)
iMusic("A").addLoopTrack("drums");

// add a reverb
iMusic("drums").addReverb("st-nicolaes-church.wav");
```

To change the amount of reverb, you need access to the reverb gain controller:
```javascript
var reverb = iMusic("drums").get("bus").sends["st-nicolaes-church.wav"];
```

Now you can set the reverb level:
```javascript
reverb.gain.value = 0.3;
```
