## Selecting Arrangements, Tracks and Motifs

To control the playback arrangement, iMusic provides a selecting feature. To make it work, you should organize your music and connect the different musical elements to specific "select-keys".

### A basic example - horizantal strategy
Add two arrangements/sections and connect them to the same select-key. In this example we use the key "theme". Assign two different values to the different sections.

```XML

<?xml version="1.0" encoding="UTF-8"?>
<imusic version="1.0" tempo="60" timeSign="4/4" audioPath="audio">
	
    <arrangement select-key="theme" select-value="A" src="themeA" selected="true" />
    <arrangement select-key="theme" select-value="B" src="themeB" />		
	
</imusic>

```

In javascript you make a select-call, specifying key and value to select theme A or B.

```javascript

iMusic.select("theme", "B");

```


### Selecting tracks - vertical strategy
You can create multiple tracks and have them muted or unmuted depending on a select-key. You can have any number of different mute-groups (select-key) and assign any track to any value or values (just use comma separated values) to make complex structures responding to your environment.

This example shows an arrangement with four tracks, all assigned to the select-key "intensity". They are responding to different values causing them to replace each other when selected.

```XML

<?xml version="1.0" encoding="UTF-8"?>
<imusic version="1.0" tempo="60" timeSign="4/4" audioPath="audio">

    <arrangement>
        <track select-key="intensity" select-value="1" src="int1" selected="true" />
        <track select-key="intensity" select-value="2" src="int2" />
        <track select-key="intensity" select-value="3" src="int3" />
	<track select-key="intensity" select-value="4" src="int4" />	
    </arrangement>
  
</imusic>

```

In javascript you control the playback (muting and unmuting) by sending a select call:

```javascript

iMusic.select("intensity", "2");

```
