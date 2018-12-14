# Lead-Ins

iMusic offers a feature to make transitions between different [sections](sections.md) or [tracks](tracks.md). You attach a lead-in to a section and trigger it at the same time as you trigger the new section/track. The lead-in file is played together with the looped files.

### 1. Add two sections

```javascript
iMusic("A").addLoopTrack("A_loop");
iMusic("B").addLoopTrack("B_loop");
```

### 2. Add a lead-in from A to B and one from B to A
In this example the files should contain sound starting one beat (1/4) before the barline:
```javascript
iMusic("A").set("upbeat", "1/4");
iMusic("A").addLeadIn("toB");
iMusic("B").addLeadIn("toA");
```

### 3. Auto-select a lead-in that matches the time to the next barline
iMusic uses a file naming convention to markup the number of upbeats leading up to the barline. If you use three different files starting one, two and three beats before the barline and name them with "up-1", "up-2" and "up-3" respectively and separated from the rest of the filename with underscore ( _ ), iMusic will automatically pick the file that suites the remaining time to the next barline when the function is called.

```javascript
iMusic("A").addLeadIn(["toB_up-1", "toB_up-2", "toB_up-3"]);
iMusic("B").addLeadIn(["toA_up-1", "toA_up-2", "toA_up-3"]);
```

### 4. Trigger the lead-in
When we trigger the leadins, we omit the upbeat-markups and use the shared part of the file-names within one lead-in, in this case "toA" and "toB" respectively.

```javascript
function playSectionA(){
	iMusic("toA").play();
	iMusic("A").play();
}


function playSectionB(){
	iMusic("toB").play();
	iMusic("B").play();
}
```
