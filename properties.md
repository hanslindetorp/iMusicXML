## Properties

### Any object in iMusic can have any property set with the command 'set'. It can either be used procedural to affect the following objects:

```javascript

iMusic.set("tempo", 100);

```


Or one/several objects:

```javascript

iMusic("A").set("tempo", 100);

```

Here are all possible properties and their default values:

```javascript

volume = 1            // Audio is played back with normal volume. With multiple files you might need to decrease the volume.
pan = 0.5;            // 0.5 is center
tempo = 120;          // bpm - the tempo is always refering to the denominator set by timeSign
audioPath = "audio";  // Name of the folder with all audio files. Could be changed to anything. Even on a remote server 
upbeat = 0;           // Can be set in seconds or musical values like "1/4" to specify the preroll of a file before a the barline
partLength = "1/1";   // The part length controls two things; the legal point to make a musical jump after a play()-call and the position of the next part if multiple parts are used on a track
timeSign = "4/4";     // Time Signature
fadeTime = 10;        // The fadeTime when iMusic makes a crossfade between two files
release = 0;          // The time for a track to fade out on stop (it uses fadeTime if not specified)
offset = 0;           // The position of the first part on a track
suffix = "mp3";       // The file type
loopActive = 1;       // The likeliness for a part on a track to play (by reducing the value you can cause random pauses on a track)


// Used for Motifs...
blockRetrig = 0;      // ...to avoid double-trigging
repeat = 1;           // ...to control the number of loops it will play
retrig = "shuffle";   // ...to control the order of random selection ("shuffle", "next", "other")

```


