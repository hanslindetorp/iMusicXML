# iMusic
Javascript framework for interactive music

iMusic lets you arrange, loop, randomize and playback any number of sections, stems and Motifs in perfect sync using simple Javascript syntax. iMusic is built upon Web Audio API and is developed by Hans Lindetorp in an iterative process with students at the Royal College of Music in Stockholm. 
All rights belongs to Hans Lindetorp. Feel free to use it. The code will change a lot during the next next years and will serve as a platform for studies related to music production in interactive media.

## Content
* [Sections](sections.md)
* [Tracks](tracks.md)
* [Parts](parts.md)
* [Motifs](motifs.md)
* [Lead-Ins](lead-ins.md)
* [Properties](properties.ms)
* [Naming conventions](naming_conventions.md)

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

i.e.
```html
<script src="interactivemusic.min.js"></script>
```

### Configuration:
Setup iMusic in your script. Add the lines on top of your script. Before any other iMusic commands.

i.e.
```javascript

// Specify tempo in bpm (default is 120)
iMusic.set("tempo", 60);

// Specify the time signature (default is "4/4")
iMusic.set("timeSign", "4/4");

// Specify the position in "bar" and "beat" where the tracks should loop (default is "2.1")
iMusic.set("loopEnd", "5.1");
```

### Implementation
Create one section for each loop. Note that you don't need to specify the folder ("audio") or the file extension (".mp3"). They are both default values.

```javascript
iMusic.addSection("A1");
iMusic.addSection("A2");
iMusic.addSection("A3");
iMusic.addSection("A4");
```
Each section will now contain one single track. See [Tracks](tracks.md) if you want to add more.


Make calls to iMusic:

```javascript
function myFunction1(){
    iMusic("A1").play();
}

function myFunction2(){
    iMusic("A2").play();
}

// etc..
```

### On load
If you want to wait for the preloading of all audio files use this syntax:
```javascript

// Specify which function to run when all audio files are loaded
iMusic.set("onLoadComplete", init);

function init(){
   // auto play section "A1" when all files are loaded
   iMusic("A1").play();
}
```

Please follow my research journey at http://hans.arapoviclindetorp.se and https://www.facebook.com/hanslindetorpresearch/
Enjoy!

hans.lindetorp@kmh.se
