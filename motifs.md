## Motifs
Like in film music, adaptive music often uses Motifs to play a certain phrase or sound triggered by an event in the game. In iMusic, these Motifs can be synchronised with other music, like a loop playing in the background.
The Motifs are dependent on the current tempo and time signature used by the current loop. You can either restrict a Motif to be used only for a certain [Arrangement](arrangement.md) or globally for all arrangements. A Motif has to have a "tag" for javascript to be able to trig it. 

Please check [Getting started](README.md) to learn how to set tempo, time signatures and att loops.


i.e. add a Motif available for all sections:
```XML
<?xml version="1.0" encoding="UTF-8"?>
<imusic version="1.0" tempo="60" timeSign="4/4" audioPath="audio" suffix="mp3" loopLength="4">
	<motif tags="motif1" src="motif1"></motif>
	<arrangement src="loopA"></arrangment>
</imusic>
```

Play the Motif with a call from iMusic:
```javascript
function myFunction(){
  iMusic.play("motif1");
}
```


i.e. add a Motif restricted to be used only when section "A" is playing
Place it INSIDE the &lt;arrangement>-element:
```XML
<?xml version="1.0" encoding="UTF-8"?>
<imusic version="1.0" tempo="60" timeSign="4/4" audioPath="audio" suffix="mp3" loopLength="4">
	
  <arrangement select-group="section" select-value="A" selected="true">
	  <track src="loopA"></track>
	  <motif tags="motif1" src="motif1A"></motif>
  </arrangement>
	
  <arrangement select-group="section" select-value="B">
	  <track src="loopB"></track>
	  <motif tags="motif1" src="motif1B"></motif>
  </arrangement>

</imusic>
```



To make Motif use different files selected randomly, just add a list with different &lt;source>-elements:

```XML
<motif tags="motif1">
	<option src="motif1a"></option>
	<option src="motif1b"></option>
</motif>
```

Read more about random functions: [Random](random.md)

Read more about selecting different files with selection-groups or variables: [Selecting](selecting.md)

Motifs are by default played on the next beat in the music. If you want to change that, you set the quantize property:

```XML
<!-- to eight note -->
<motif quantize="1/8" tags="motif1" src="motif1B"></motif>

<!-- to bar -->
<motif quantize="bar" tags="motif1" src="motif1B"></motif>
```

