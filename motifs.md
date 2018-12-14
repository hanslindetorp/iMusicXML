## Motifs
Like in film music, adaptive music often uses Motifs to play a certain phrase or sound triggered by an event in the game. In iMusic, these Motifs can be synchronised with other music, like a loop playing in the background.
The Motifs are dependent on the current tempo and time signature used by the current loop. You can either restrict a Motif to be used only for a certain [section](sections.md) or have it available all the time.

Please check [Getting started](README.md) to learn how to set tempo, time signatures and att loops.


i.e. add a Motif available for all sections
```javascript
iMusic.addMotif("motif1");

function myFunction(){
  iMusic("motif1").play();
}
```


i.e. add a Motif restricted to be used only when section "A" is playing
```javascript
iMusic("A").addMotif("motif1");

function myFunction(){
  iMusic("motif1").play();
}
```

To make Motif use different files selected randomly, just add a list with different files:

```javascript
iMusic("A").addMotif(["motif1_v1", "motif1_v2", "motif1_v3"]);
```



Motifs are by default played on the next beat in the music. If you want to change that, you set the quantize property:

```javascript
// to eight note
iMusic.set("quantize", "1/8");

// or bar
iMusic.set("quantize", "bar");

// or sixteenth note
iMusic.set("quantize", "1/16");
```

