## Regions

A track can consist of any number of regions. There are some advantages using several shorter parts on a track compared to a long single part:

* Reuse an audio file in several parts to save memory and download time
* Make seamless transitions for instruments with transients and audio tails i.e. drums
* Make random patterns using Parts and [Random features](random.md)

Use this syntax to create a loopTrack with four regions:

```XML
<?xml version="1.0" encoding="UTF-8"?>
<imusic version="1.0" tempo="60" timeSign="4/4" audioPath="audio" suffix="mp3" loopLength="4" fadeTime="0">
	
	<arrangement>
		
		<track>
			<region src="dr_bar1" />
			<region src="dr_bar2" />
			<region src="dr_bar3" />
			<region src="dr_bar4" />
		</track>
		
		
	</arrangement>
	
</imusic>
```

### Length
A region is one bar by default one bar long but this can be changed with "partLength" on the track element or "length" on the region element.

i.e. every region is two bars:
```XML
		<track partLength="2">
			<region src="dr_bar1" />
			<region src="dr_bar3" />
			<region src="dr_bar5" />
			<region src="dr_bar7" />
		</track>
```


Different parts with different length
```XML
		<track>
			<region length="1" src="dr_bar1" />
			<region length="2" src="dr_bar2" />
			<region length="2" src="dr_bar4" />
			<region length="1" src="dr_bar6" />
		</track>
```

### Position
A region can be placed on any position. The format is bar.beat.division.

i.e. 
"1" = bar 1
"1.3" = bar 1, beat 3
"1.3.50" = bar 1, beat 3, second eight note (50% of a beat if the time signature is set to quarter notes)

```XML
<region pos="1.3" src="SN" />
```


### Upbeat and audio tail
A region can contain any audio before the barline (upbeat) and any data after the length (audio tail). The best result for a drum track is to make sure the decay of the drum sound from the last beat is inluded in the audio file.
To make sure the audio tail is played back correctly, please set the fadeTime to 0

i.e. a track with four parts (three repeats plus a fill) with a preroll of 1/16th note and the audio tail being played back correctly (without crossfading):

```XML
		<track loopEnd="4">
			<region upbeat="1/8" src="dr_bar1" />
			<region src="dr_bar2" />
			<region src="dr_bar3" />
			<region src="dr_bar4" />
		</track>
```


