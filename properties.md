## Properties

Any object in iMusic can have any property set with the command 'set'. All child-objects inherits the value from their parent objects i.e. tracks inherits from arrangements/sections and arrangements inherits from the main iMusic object. Even if a value might be set on a higher level it might just affect child-objects i.e. 'quantize' applies only to Motifs but can be set the Motifs' parent object to apply to many Motifs.
Properties can only be set on imusic, arrangements, tracks and motifs.

Properties can be set using the XML attributes or javascript syntax:

```XML

<imusic version="1.0" tempo="60" timeSign="4/4" audioPath="audio" suffix="mp3" quantize="1/8" loopLength="2" fadeTime="0">
  <arrangement select-group="section" select-value="A" selected="true">  
    <track src="A_bg_1_1a" volume="0.5" />
  </arrangement>
</imusic>

```


```javascript

iMusic.set("tempo", 100);
iMusic.set("timeSign", "4/4");
iMusic.set("loopLength", "4");

```


Or one/several objects:

```javascript

iMusic("A").set("partLength", "2");

```

Here are all possible properties and their default values:

### Master settings (applies to the imusic-object and arrangements/sections)

```XML

audioPath = "audio";  // Name of the folder with all audio files. Could be changed to anything. Even on a remote server 
suffix = "mp3";       // The file type
tempo = "120";        // bpm - the tempo is always refering to the denominator set by timeSign.
timeSign = "4/4";     // Time Signature

```

### Selection settings (applies to Arrangements, Tracks and Motifs)
Read more about selecting: [Selecting](selecting.md)
```XML

select-group = ""       // Specifies an (optional) variable to control the mute-state of this object
select-value = ""       // Specifies an (optional) value or several comma-separated values to control the mute-state

```

### Track and Motif settings

```XML

volume = "1" or "0dB"   // Audio is played back with normal volume. With multiple files you might need to decrease the volume.
pan = "0.5";            // 0.5 is center
retrig = "shuffle";     // ...to control the order of random selection for a part on a track or Motif ("shuffle", "next", "other"). This require multiple source-files to be specifed for the part/region or Motif. 

```

### Track settings

```XML

upbeat = "0/4";         // Can be set in seconds or musical values like "1/4" to specify the preroll of a file before a the barline
partLength = "1/1";     // The part length controls two things; the legal point to make a musical jump after a play()-call and the position of the next part if multiple parts are used on a track
fadeTime = "10";        // The fadeTime when iMusic makes a crossfade between two files. Use longer fadeTime for textures and short for rhytmic loops. Set to zero if the files are supposed to play its full audio-tail when before the track are muted.
active = "1";           // The likeliness for a part on a track to play (by reducing the value you can cause random pauses on a track i.e. a value of 0.5 sets the likeliness for a specific part to play to 50%)
loopActive = "1";       // The likeliness for a track to play each loop (i.e. a value of 0.5 sets the likeliness for a track to play on a loop to 50%)

```

### Motif settings

```XML

blockRetrig = "0";      // ...to avoid double-trigging.
repeat = "1";           // ...to control the number of loops it will play
release = "0";          // The time for a track to fade out on stop (it uses fadeTime if not specified)

```


