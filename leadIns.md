# Lead-Ins

iMusic offers a feature to make transitions between different sections or tracks

iMusic("A").addLoopTrack("A_loop");
iMusic("B").addLoopTrack("B_loop");


// LEAD INs
// Ett leadIn spelas (precis som Motifs) tillsammans med bakgrunden

// om man bara har en enda variation på ett leadIn skriver man så här:
//iMusic("A").addLeadIn("toB");


// om man har olika variationer som ska slumpas skriver man t.ex. så här:
//iMusic("A").addLeadIn(["toB_v1", "toB_v2", "toB_v3"]);

// men om man vill göra det lite genomarbetat kan man använda olika 
// med olika lång upbeat kommer (bouncade med olika längd till nästa takt)
// iMusic väljer sedan automatiskt den version som passar bäst när den triggas
// berodende på hur lång tid det är kvar till taktstrecket.

// Varje ljudfil innehåller informationen om hur många beats den har före nästa takt: "up-1", "up-2", "up-3"
// OBS! Det är just beteckningen "up-" som gör att iMusic förstår att siffran efter anger upbeat

iMusic("A").addLeadIn(["toB_up-1", "toB_up-2", "toB_up-3"]);
iMusic("B").addLeadIn(["toA_up-1", "toA_up-2", "toA_up-3"]);



//iMusic("B").addLeadIn("leadInToA");


iMusic.onload = init;


function init(){
	
	// välj vilken sida som ska visas när sidan laddas
	location.href = "#page1"; 
	iMusic("A").play();
	
}



// ##############################
// Här kan du börja fylla på med egna funktioner


function toPage1(){

	location.href = "#page1";
	iMusic("toA").play();
	iMusic("A").play();
}


function toPage2(){

	location.href = "#page2";
	iMusic("toB").play();
	iMusic("B").play();
}
