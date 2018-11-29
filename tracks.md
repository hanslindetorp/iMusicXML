## Tracks

In each Section (see [Sections.md](Sections.md) to learn more about sections) there can be any number of Tracks playing back simultaneously in sync.

i.e.
```javascript
iMusic("A").addLoopTrack("drums");
iMusic("A").addLoopTrack("keys");
iMusic("A").addLoopTrack("bass");
```

### Looping
To specify different loop lengths for different tracks; use the "loopEnd"-property (It is specified as a string with the syntax "bar.beat":

i.e.
```javascript
iMusic("A").addLoopTrack("drums").set("loopEnd", "5.1");
iMusic("A").addLoopTrack("keys").set("loopEnd", "3.1");
iMusic("A").addLoopTrack("bass").set("loopEnd", "9.1");
```

When you play section A, all three tracks will play in sync and loop according to their settings.

```javascript
iMusic("A").play();
```

### Mute and unmute
To stop (mute) and start (unmute) tracks individually you can address them using the following syntax:

```javascript
iMusic("drums").stop();

iMusic("drums").play();
```
Note: The change happens at the next barline if nothing else is specified.
If you want a track to be muted by default you can add a stop command att creation:

```javascript
iMusic("A").addLoopTrack("drums").set("loopEnd", "5.1").stop();
```


### Track Groups
If you want to have different variations of a track (similar to the concept of Scenes in [Ableton Live](https://www.ableton.com) or Levels in [Elias Studio](https://eliassoftware.com) you can create a "Track Group":

A TrackGroup makes only one of the tracks play at a time. The first track in the group will be active by default.

i.e.
```javascript
iMusic.addLoopTrack("keys_v1");
iMusic.addLoopTrack("keys_v2");
iMusic.addLoopTrack("keys_v3");
iMusic.addTrackGroup("keys");
```

When a track in a group is called to play, the others are muted. 
Note: The change happens at the next barline if nothing else is specified.

```javascript
iMusic("keys_v2").play();
```
