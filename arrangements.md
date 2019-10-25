## Arrangements
As we learned in [Getting Started](README.md), iMusic consists of any number of "Arrangments". One Arrangement is like a "Live set" in [Ableton Live](https://www.ableton.com) or a "Theme" in [Elias Studio](https://eliassoftware.com) and can have its own [properties](properties.md) and [tracks](tracks.md).

The easies way of creating a section and adding a loop is this syntax:
```XML
<arrangement src="loop1" />
```

You can add different attributes to an arrangement. Please read more on [Variables](variables.md):
```XML
<arrangement select-group="section" select-value="A" src="loop1" selected="true" />
```

Every Arrangement can have its own tempo and time-signature
```XML
<arrangement tempo="110" timeSig="3/4" src="loop1" />```
```


Please follow my research journey at http://hans.arapoviclindetorp.se and https://www.facebook.com/hanslindetorpresearch/
