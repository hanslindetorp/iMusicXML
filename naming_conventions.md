## Naming conventions
It's often useful to use a structured naming system when working with adaptive music production. iMusic is built upon the concept of using filenames to tag the audiofiles with meaningful information. There are a set of predefined markup rules aimed for speeding up the implementation process.

ex:
```html
// This file belongs to section "A", loopTrack "drums"
sc-A_tr-drums.mp3

// These two files belongs to section "A", loopTrack "keys"
// and is positioned in bar 1 on the first beat as two variations on the same part
// They will be randomly selected when their part is being played.
sc-A_tr-keys_p-1.1_v-1.mp3
sc-A_tr-keys_p-1.1_v-2.mp3
```

There is an "importer" available at http://momdev.se/interactivemusic/import/. The importer takes the information from the file names and generates all code needed to build the musical structure. The default mode would genarate the following code for the two files:

```javascript
iMusic.loadFiles([
	'sc-A_tr-keys_p-1.1_v-1',
	'sc-A_tr-keys_p-1.1_v-2'
]);
```

### Syntax
The following markup rules is supported:


| Parameter   | syntax   | Values   | Example  |
| Section     | sc       | 

There is also a mode for getting more detaild data. This allows for further editing of the data, including repeating, copying and moving files between your sections and tracks. This example shows the detailed data for the two files:

```javascript
iMusic.loadData(
{
	"sections": [
		{
			"id": "A",
			"tracks": [
				{
					"id": "keys",
					"parts": [
						{
							"pos": "2.3",
							"url": [
								"sc-A_tr-keys_p-1.1_v-1",
								"sc-A_tr-keys_p-1.1_v-2"
							]
						}
					]
				}
			]
		}
	]
});
```

By using this naming convention, you can later refer to a section, track, motif or sound through the keywords in the filename. The ewxample above will create a section named "A" and a track named "keys" and can therefor be targeted in this way:_

By using this naming convention, you can later refer to a section, track, motif or sound through the keywords in the filename. The ewxample above will create a section named "A" and a track named "keys" and can therefor be targeted in this way:

```javascript
// play section "A"
iMusic("A").play();

// set the volume for the track named "keys"
iMusic("keys").set("volume", 0.5);
```
