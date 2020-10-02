# Lead-Ins

iMusic offers a feature to make transitions between different [arrangements](sections.md). You add a lead-in as a track without loop to an arrangement.

The following example shows two arrangements with one looped track each. Both tracks contains two regions.
In addition both arrangements contain one track each that are not looped. It will only be played once, when the arrangement gets selected and the playback moves from one arrangement to the other.

By using the attribute 'upbeat' on the different options, it's possible to have different files selected depending on the time left to the downbeat. iMusic will select the option with the longest possible upbeat after the selection in triggered.

It's possible to use select-group and select-value on those lead-in-tracks as you do with standard looped tracks.

```XML

<?xml version="1.0" encoding="UTF-8"?>
<imusic version="1.0" tempo="60" timeSign="4/4" audioPath="audio" suffix="mp3" loopLength="4">
  
  <arrangement select-group="section" select-value="A" selected="true">
    
    <track>
      <region src="A_bg_1_1a"></region>
      <region src="A_bg_1_1a"></region>
    </track>
    
    
    
    <track loop="off">
      <region>
        <option src="toA_up-1" upbeat="1/4"></option>
        <option src="toA_up-2" upbeat="2/4"></option>
        <option src="toA_up-3" upbeat="3/4"></option>
      </region>
    </track>
        
    
  </arrangement>
  
  <arrangement select-group="section" select-value="B">
    
    <track>
      <region src="B_bg_1_1a"></region>
        <region src="B_bg_1_2a"></region>
    </track>
    
    
    
    <track loop="off">
      <region>
        <option src="toB_up-1" upbeat="1/4"></option>
        <option src="toB_up-2" upbeat="2/4"></option>
        <option src="toB_up-3" upbeat="3/4"></option>
      </region>
    </track>
    
  </arrangement>
    
  
</imusic>
```
