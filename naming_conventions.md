## Naming conventions
It's often useful to use a structured naming system when working with adaptive music production. iMusic is built upon the concept of using filenames to tag the audiofiles with meaningful information.
The metaphore is a bit similar to how HTML-elements are tagged with "classes" to make it possible for javascript to address it:


### HTML
i.e.
```html
<div class="myclass myselector mytag"></div>
```

```javascript
var myelement = document.querySelector(".myclass");
```

### iMusic
In iMusic you use the filename to specify the tags. In this example, the track will get the tags used in all filenames.

filenames:
```html
sectionA_drums.mp3
sectionA_bass.mp3
sectionA_keys.mp3
sectionA_perc_conga.mp3
sectionA_perc_shaker.mp3
```

```javascript
iMusic("A").addLoopTrack("sectionA_drums");
iMusic("A").addLoopTrack("sectionA_bass");
iMusic("A").addLoopTrack("sectionA_keys");
iMusic("A").addLoopTrack("sectionA_perc_conga");
iMusic("A").addLoopTrack("sectionA_perc_shaker");

// set the volume for both percussion tracks
iMusic("perc").set("volume", 0.5);
```

In a more complex situation including trackgroups, parts on tracks and random variations it could look like:


filenames:
```html
sectionA_drums_dyn1_part1_v1.mp3
sectionA_drums_dyn1_part1_v2.mp3
sectionA_drums_dyn1_part2_v1.mp3
sectionA_drums_dyn1_part2_v2.mp3

sectionA_drums_dyn2_part1.mp3
sectionA_drums_dyn2_part2.mp3

sectionA_drums_dyn3_part1.mp3
sectionA_drums_dyn3_part2.mp3

sectionA_bass_dyn1.mp3
sectionA_bass_dyn2.mp3
sectionA_bass_dyn3.mp3

sectionA_keys_dyn1.mp3
sectionA_keys_dyn1.mp3
sectionA_keys_dyn1.mp3
```

```javascript
iMusic("A").addLoopTrack([["sectionA_drums_dyn1_part1_v1", "sectionA_drums_dyn1_part1_v2"], ["sectionA_drums_dyn1_part2_v1", "sectionA_drums_dyn1_part2_v2"]]);
iMusic("A").addLoopTrack(["sectionA_drums_dyn2_part1", "sectionA_drums_dyn2_part2"]);
iMusic("A").addLoopTrack(["sectionA_drums_dyn3_part1", "sectionA_drums_dyn3_part2"]);

// all drum tracks get the tag "drums" and can therefor be grouped
iMusic.addTrackGroup("drums");



iMusic("A").addLoopTrack("sectionA_bass_dyn1");
iMusic("A").addLoopTrack("sectionA_bass_dyn2");
iMusic("A").addLoopTrack("sectionA_bass_dyn3");

// all bass tracks get the tag "bass" and can therefor be grouped
iMusic.addTrackGroup("bass");



iMusic("A").addLoopTrack("sectionA_keys_dyn1");
iMusic("A").addLoopTrack("sectionA_keys_dyn2");
iMusic("A").addLoopTrack("sectionA_keys_dyn3");

// all keys tracks get the tag "keys" and can therefor be grouped
iMusic.addTrackGroup("keys");

```

Because all track groups contain tracks with the tags "dyn1", "dyn2" and "dyn3", they can be refered to directly to make all track groups shift to the specified track:

```javascript
iMusic("dyn2").play();
