## Parts

A track can consist of any number of parts. There are some advantages using several shorter parts on a track compared to a long single part:

* Reuse an audio file in several parts to save memory and download time
* Make seamless transitions for instruments with transients and audio tails i.e. drums
* Make random patterns using Parts and [Random features](random.md)

Use this syntax to create a loopTrack with four parts:

```javascript
iMusic("A").addLoopTrack(["A1", "A2", "A3", "A4"]);
```

### Length
A part is one bar by default one bar long but this can be changed with set("barLength") before the loopTrack is created.

i.e. two bars:
```javascript
iMusic("A").set("barLength", "2/1");
iMusic("A").addLoopTrack(["A1", "A2", "A3", "A4"]);
```

### Upbeat and audio tail
A Part can contain any audio before the barline (upbeat) and any data after the partLength (audio tail). The best result for a drum track is to make sure the decay of the drum sound from the last beat is inluded in the audio file.
To make sure the audio tail is played back correctly, please set the fadeTime to 0

i.e. a track with four parts (three repeats plus a fill) with a preroll of 1/16th note and the audio tail being played back correctly (without crossfading):

```javascript
iMusic("A").set("upbeat", "1/16");
iMusic("A").set("fadeTime", 0);
iMusic("A").addLoopTrack(["dr", "dr", "dr", "drfill"]);
```


