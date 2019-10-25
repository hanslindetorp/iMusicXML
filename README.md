# iMusic
Javascript framework for interactive music

iMusic lets you arrange, loop, randomize and playback any number of sections, stems and Motifs in perfect sync using simple Javascript syntax. iMusic is built upon Web Audio API and is developed by Hans Lindetorp in an iterative process with students at the Royal College of Music in Stockholm. 
All rights belongs to Hans Lindetorp. Feel free to use it. The code will change a lot during the next next years and will serve as a platform for studies related to music production in interactive media.

## Content
* [Arrangements](arrangements.md)
* [Tracks](tracks.md)
* [Parts/Regions](parts.md)
* [Motifs](motifs.md)
* [Lead-Ins](lead-ins.md)
* [Properties](properties.md)
* [Selecting](selecting.md)
* [Naming conventions](naming_conventions.md)
* [Reverb](reverb.md)
* [Mixing](mixing.md)

## Getting started:
Learn how to install iMusic and implement four loops that can alternate by a javascript call.

### Prepare the audio loops
* Create a folder called ”audio” in your HTML-project.
* Put your audio loops (mp3) in the folder. 
  * There is an audio-folder in this directory including four loops, but if you rather make your own files then...
  * Bounce your tracks from your DAW into separate (mp3) files
  * Include audio tail to preserve reverb and sustained notes.


### Installation:
Make sure iMusic is included in your HTML-document. Download it from https://github.com/hanslindetorp/imusic
and specify a XML-file with your musical structure.

i.e.
```html
<script src="interactivemusic.min.js" data-music-structure="imusic.xml"></script>
```

### Configuration:
Open your XML-document and write the structure of your interactive music.

i.e.
```XML

```

### Implementation
Create one section for each loop. Note that you don't need to specify the folder ("audio") or the file extension (".mp3"). They are both default values.

```javascript
<?xml version="1.0" encoding="UTF-8"?>
<imusic version="1.0" tempo="60" timeSign="4/4" audioPath="audio" suffix="mp3" loopLength="4" >
	
	<arrangement select-group="section" select-value="A" src="A" selected="true" />
	<arrangement select-group="section" select-value="B" src="B" />		
	<arrangement select-group="section" select-value="C" src="C" />		
	<arrangement select-group="section" select-value="D" src="D" />		
	
</imusic>
```
The Arrangements belongs to the same "select-group" with different values. This is the base for iMusic to play one Arrangement at a time.
Each Arrangement will now contain one single track. They will all have 4 bars loops. See [Tracks](tracks.md) if you want to add more tracks.


Use Javascript for playing, stopping and selecting different Arrangements:

```javascript
iMusic.play();

iMusic.stop();

iMusic.select("section", "B");
```

Please follow my research journey at http://hans.arapoviclindetorp.se and https://www.facebook.com/hanslindetorpresearch/
Enjoy!

hans.lindetorp@kmh.se
