# iMusic
Javascript framework for interactive music

iMusic lets you arrange, loop, randomize and playback any number of sections, stems and Motifs in perfect sync using simple Javascript syntax. iMusic is built upon Web Audio API and is developed by Hans Lindetorp in an iterative process with students at the Royal College of Music in Stockholm. 
All rights belongs to Hans Lindetorp. Feel free to use it. The code will change a lot during the next next years and will serve as a platform for studies related to music production in interactive media.

## Getting started:

### Step 1:
Bounce your tracks from your DAW into separate files. Include audio tail to preserve reverb and sustained notes. Use logical names:
* All files in a TrackGroup shall share at least one part of the name
* All files on a LoopTrack shall share at least one part of the name
* All files in a Motif or LeadIn shall share at least one part of the name

Use underscore to separate logical parts of your file name

i.e.
simple: 
- "trackGroupA_track1.mp3"
- or shorter: "tgA_tr1.mp3"

more complex:
- "sectionA_trackGroupA_track1_bar1_version1.mp3"
- or shorter: "sA_tgA_tr1_b1_v1.mp3"


### Step 2:
Put your files in a folder called ”audio” in your HTML-project.

### Step 3:
Make sure iMusic is included in your HTML-document. Download it from https://github.com/hanslindetorp/imusic 

i.e.
```html
<script src="interactivemusic.min.js"></script>
```

### Step 4:
Setup iMusic in your script. If you don’t, your time signature is supposed to be 4/4, the tempo is supposed to be 120 and the file type is supposed to be mp3. Add the lines on top of your script. Before any other iMusic commands.

i.e.
```javascript
iMusic.set("tempo", 90);
iMusic.set("timeSign", "3/4");
```

### Step 5:
Create LoopTracks and group them. A TrackGroup makes only one of the tracks play at a time. You don’t need to write the file suffix (mp3/wav/ogg). It’s expecting mp3 by default.

i.e.
```javascript
iMusic.addLoopTrack("tgA_tr1");
iMusic.addLoopTrack("tgA_tr2");
iMusic.addLoopTrack("tgA_tr3");
iMusic.addTrackGroup("tgA");
```

### Step 6:
Create Motifs. Typically short phrases expected to be triggered in musical time. By setting ”quantize”, you can define how the phrase is triggered:

```javascript
iMusic.set("quantize", "1/4"); // triggers the Motif on the next quarter note
iMusic.addMotif("motif1");
iMusic.addMotif("motif2");
iMusic.addMotif("motif3");
```

### Step 7:
Create LeadIns. Typically phrases/fill ins/sounds leading up to the next bar. By setting ”quantize” to the same value as the time signature and ”upbeat” to half the time signature, the phrase will be placed to play before the next barline. Note: The audio file needs to be exported with the starting point exactly at that point (i.e. 2 beats before the barline) and it’s often a good idea to include an audio tail after the barline.

i.e.
```javascript
iMusic.set("quantize", "4/4");
iMusic.set("upbeat", "2/4");
iMusic.addLeadIn("leadin1");
```

To take advantage of this feature, you might find it useful to create a LeadIn with different files for different length of the upbeat:

i.e.
```javascript
iMusic.set("quantize", "4/4");
iMusic.addLeadIn([
	{upbeat: "1/4", url: "leadin_1-4"},
	{upbeat: "2/4", url: "leadin_2-4"},
	{upbeat: "3/4", url: "leadin_3-4"}
]);
```

### Step 8
Now it's time to make calls to iMusic to define WHEN a specific LoopTrack, Motif or LeadIn should play. You refer to the music by adressing them with their full name (without suffix):

```javascript
function init(){
    iMusic.play("tgA_tr1");
}
```

or ONE part of the name:
```javascript
function init(){
    iMusic.play("tr1");
}
```

If you trigger a Motif or LeadIn with several audio files (like the LeadIn-example above), ONE of the files will be triggered depending on the settings for upbeat and the time remaining to the position defined by quantize.


```javascript
function init(){
    iMusic.play("leadin");
}
```

Please follow my research journey at http://hans.arapoviclindetorp.se and https://www.facebook.com/hanslindetorpresearch/
Enjoy!

hans.lindetorp@kmh.se
