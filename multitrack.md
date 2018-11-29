Use logical names:
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



### Step 5:
Create LoopTracks and group them. A TrackGroup makes only one of the tracks play at a time. You don’t need to write the file suffix (mp3/wav/ogg). It’s expecting mp3 by default.

i.e.
```javascript
iMusic.addLoopTrack("trackGroupA_track1");
iMusic.addLoopTrack("trackGroupA_track2");
iMusic.addLoopTrack("trackGroupA_track3");
iMusic.addTrackGroup("trackGroupA");
```
