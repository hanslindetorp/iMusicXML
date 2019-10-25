##Random selection

Every [Region](regions.md) or [Motif](motif.md) can consist of any number or randomly selected files. Just add sources to the element:


i.e. for [Tracks](tracks.md):

```XML
<track>
  <region>
    <source src="var1" />
    <source src="var2" />
    <source src="var3" />
    <source src="var4" />
    <source src="var5" />
  </region>
</track>	

```


Or for [Motifs](motifs.md)

```XML
<motif>
  <source src="var1" />
  <source src="var2" />
  <source src="var3" />
  <source src="var4" />
</motif>
```


###Control the random selection
You can control how the random selection function shall work with the attribute "retrig".

retrig = "next" - everytime the element is triggered it will play the next file in the list. When it reaches the end, it starts all over again.

retrig = "shuffle" - any file could be selected next time (including the one just played)

case "other" - another file than the one just played is selected randomly next time 

retrig = "repeat" - the same file is played until a command is called


i.e.
```XML
<track retrig="other">
```


### The active-property
The propery "active" can be set on a track determining the likeliness for a region on the track to play. If "active" is set to "0.5" for a track, there is an even chance for the regions on the track to either play or not.

```XML
<track active="0.5">
  <region src="bar1" />
  <region src="bar2" />
  <region src="bar3" />
  <region src="bar4" />
</track>
```

