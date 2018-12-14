# Sections
As we learned in [Getting Started](README.md), iMusic consists of any number of "Sections". One section is like a "Live set" in [Ableton Live](https://www.ableton.com) or a "Theme" in [Elias Studio](https://eliassoftware.com) and can have its own [properties](properties.md) and [tracks](tracks.md).

The easies way of creating a section and adding a track with a loop is this syntax:
```javascript
iMusic.addSection("A1");
```

But if you need to specify separate proerties and tracks you have to use this syntax:
```javascript

// Create and specify properties for section A 
iMusic("A").set("tempo", 100);
iMusic("A").set("timeSign", "3/4");
iMusic("A").set("loopEnd", "5.1");

// add a looped track
iMusic("A").addLoopTrack("A_track1");



// Create and specify properties for section B
iMusic("B").set("tempo", 120);
iMusic("B").set("timeSign", "5/4");
iMusic("B").set("loopEnd", "3.1");

// add a looped track
iMusic("B").addLoopTrack("B_track1");
```


Please follow my research journey at http://hans.arapoviclindetorp.se and https://www.facebook.com/hanslindetorpresearch/
