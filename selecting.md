## Selecting Arrangements, Tracks and Motifs

To control the playback arrangement, iMusic provides a selecting feature. To make it work, you should organize your music and connect the different musical elements to a specific "select-group".

### A basic example - horizantal strategy
Add two arrangements/sections and connect them to the same select-group. In this example we use the group "theme". Assign two different values to the different sections.

```XML

<?xml version="1.0" encoding="UTF-8"?>
<imusic version="1.0" tempo="60" timeSign="4/4" audioPath="audio" loopLength="4">
	
    <arrangement select-group="theme" select-value="A" selected="true">
	<track src="themeA" />
    </arrangement>
    
    <arrangement select-group="theme" select-value="B">
        <track src="themeB" />
    </arrangement>
	
</imusic>

```

In javascript you make a select-call, specifying group and value to select theme A or B.

```javascript

iMusic.select("theme", "B");

```


### Selecting tracks - vertical strategy
You can create multiple tracks and have them muted or unmuted depending on a select-group. You can have any number of different mute-groups (select-group) and assign any track to any value or values (just use comma separated values) to make complex structures responding to your environment.

This example shows an arrangement with four tracks, all assigned to the select-group "intensity". They are responding to different values causing them to replace each other when selected.

```XML

<?xml version="1.0" encoding="UTF-8"?>
<imusic version="1.0" tempo="60" timeSign="4/4" audioPath="audio">

    <arrangement>
        <track select-group="intensity" select-value="1" src="int1" selected="true" />
        <track select-group="intensity" select-value="2" src="int2" />
        <track select-group="intensity" select-value="3" src="int3" />
	<track select-group="intensity" select-value="4" src="int4" />	
    </arrangement>
  
</imusic>

```

In javascript you control the playback (muting and unmuting) by sending a select call:

```javascript

iMusic.select("intensity", "2");

```

### Connect iMusic selection to a javascript variable
If you want to connect the music to respond to a variable change in javascript, then change 'select-group' to select-variable'. Then iMusic will watch that variable (it can be a global variable or any property of an object) an update the selection according to the changes. It can refere to window properties like 'window.scrollY' or evaluated expressions like 'document.querySelector("#myElement").offsetLeft'

```XML

<?xml version="1.0" encoding="UTF-8"?>
<imusic version="1.0" tempo="60" timeSign="4/4" audioPath="audio">

    <arrangement>
        <track select-variable="intensity" select-value="1" src="int1" selected="true" />
        <track select-variable="intensity" select-value="2" src="int2" />
        <track select-variable="intensity" select-value="3" src="int3" />
	<track select-variable="intensity" select-value="4" src="int4" />	
    </arrangement>
  
</imusic>

```

### Different ways to specify select-value
The select-value attribute can be specified with single numbers or strings as seen in the examples above, but can also be a range of numeric values:

Expression | Comment
------------ | -------------
select-value="10" | Value equals to numeric value
select-value="11...19" | Value is within the range of (and including) 11-20
select-value="0, 2, 4-5" | Value is 0, 2 or within the range of (and including) 4-5
select-value="Any string value" | Value is equal to the string



### ChangeOnNext
The tracks automatically fades in or out when selected or deselected through select-group or select-variable. The default time is 10ms and the position for the crossfade is at the next barline. It's possible to change both the fadeTime and the musical position for the fade.

This example will crossfade between the tracks at next beat and the crossfade will take 200ms.
```XML

<?xml version="1.0" encoding="UTF-8"?>
<imusic version="1.0" tempo="60" timeSign="4/4" audioPath="audio">

    <arrangement changeOnNext="1/4" fadeTime="200" >
        <track select-variable="intensity" select-value="1" src="int1" selected="true" />
        <track select-variable="intensity" select-value="2" src="int2" />
        <track select-variable="intensity" select-value="3" src="int3" />
	<track select-variable="intensity" select-value="4" src="int4" />	
    </arrangement>
  
</imusic>

```


### Motifs and selecting
Motifs follows their parent arrangement when select. I.e. Motifs are deselected if its parent arrangement is deselected. It can also react to its own select-group or select-variable (like tracks). In the case above, we could therefor have matching motifs to the different intensity levels used for the track selection. Please remember, though, that Motifs do not auto play when selected (as tracks do) but wait for play-call (refering to its tag(s)):

```XML

<?xml version="1.0" encoding="UTF-8"?>
<imusic version="1.0" tempo="60" timeSign="4/4" audioPath="audio">

    <arrangement>
        <track select-group="intensity" select-value="1" src="int1" selected="true" />
        <track select-group="intensity" select-value="2" src="int2" />
        <track select-group="intensity" select-value="3" src="int3" />
	<track select-group="intensity" select-value="4" src="int4" />	
	    
	    
	<motif tags="motif1" select-group="intensity" select-value="1" src="motif1_1" />
        <motif tags="motif1" select-group="intensity" select-value="2" src="motif1_2" />
        <motif tags="motif1" select-group="intensity" select-value="3" src="motif1_3" />
        <motif tags="motif1" select-group="intensity" select-value="4" src="motif1_4" />
    </arrangement>
  
</imusic>

```

In javascript you control the playback setting by sending a select call, but for motifs you also have to call 'play' to trigger the Motif (in this case we refer to the tag "motif" set in XML)

```javascript

iMusic.select("intensity", "2");
iMusic.play("motif1");

```
