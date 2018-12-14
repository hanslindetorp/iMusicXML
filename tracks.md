# Tracks

In each [Section](Sections.md) there can be any number of Tracks playing back simultaneously in sync.

i.e.
```javascript
iMusic("A").addLoopTrack("drums");
iMusic("A").addLoopTrack("keys");
iMusic("A").addLoopTrack("bass");
```

Note: This creates one long part on each track. If you rather want to use several parts on a track, please check out [Parts](parts.md)


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
Note: The change happens at the next barline.
If you want a track to be muted by default you can add a stop command att creation:

```javascript
iMusic("A").addLoopTrack("drums").set("loopEnd", "5.1").stop();
```


### Track Groups
If you want to have different variations of a track (similar to the concept of Scenes in [Ableton Live](https://www.ableton.com) or Levels in [Elias Studio](https://eliassoftware.com) you can create a "Track Group":
A TrackGroup makes only one of the tracks play at a time. The first track in the group will be active by default.
Note: All the tracks in a track group need to share a part of their name. In this example all filenames contains "keys" which makes it possible to group them with addTrackGroup(). Read more about [Naming conventions](naming_conventions.md) to use the power of tagging musical objects.

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
