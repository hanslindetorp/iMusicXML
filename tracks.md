## Tracks

In each [Arrangement](Sections.md) there can be any number of Tracks playing back simultaneously in sync.

i.e.
```XML
<?xml version="1.0" encoding="UTF-8"?>
<imusic version="1.0" tempo="60" timeSign="4/4" audioPath="audio" suffix="mp3" loopLength="4">
	<arrangement>
		<track src="bass" />
		<track src="drums" />
		<track src="keyboard" />
	</arrangement>
</imusic>
```

Note: This creates one long region on each track. If you rather want to use several regions on a track, please check out [Regions](regions.md)


### Looping
To specify different loop lengths for different tracks; use the "loopLength"-property (It is with the number of bars to be repeated:

i.e.
```XML
<?xml version="1.0" encoding="UTF-8"?>
<imusic version="1.0" tempo="60" timeSign="4/4" audioPath="audio" suffix="mp3">
	<arrangement>
		<track loopLength="2" src="bass" />
		<track loopLength="1" src="drums" />
		<track loopLength="4" src="keyboard" />
	</arrangement>
</imusic>
```




### Select Groups with tracks
If you want to have different variations of a track (similar to the concept of Scenes in [Ableton Live](https://www.ableton.com) or Levels in [Elias Studio](https://eliassoftware.com) you can create a "Select Group":
A Select Group makes only one of the tracks play at a time. If one track in the group is selected in XML, it will be the active track by default.


```XML
<?xml version="1.0" encoding="UTF-8"?>
<imusic version="1.0" tempo="60" timeSign="4/4" audioPath="audio" suffix="mp3" quantize="1/8" loopLength="1" fadeTime="0">
	
	<arrangement>
		<track select-group="intensity" select-value="1" src="bass1" selected="true" />
		<track select-group="intensity" select-value="2" src="bass2" />
		<track select-group="intensity" select-value="3" src="bass3" />
		<track select-group="intensity" select-value="4" src="bass4" />
  	</arrangement>
</imusic>
```

To solo a track in the group (= muting the others), just call iMusic.select() with the select-group name and value.
Note: The change happens at the next barline if nothing else is specified.

```javascript
iMusic.select("intensity", "2");
```
