
var intensity;

window.onload = () => location.href = "#start";

document.querySelector("button#play").addEventListener("click", e => iMusic.play());
document.querySelector("button#stop").addEventListener("click", e => iMusic.stop());

document.querySelectorAll(".slider").forEach(el => {
	el.addEventListener("input", e => {
		iMusic(e.target.parentNode.id).setActive(e.target.value / 100);
	});
});


iMusic.onload = e => {
	iMusic("tr1").on("playFile", e => hiLight(e));
	iMusic("tr2").on("playFile", e => hiLight(e));
	iMusic("tr3").on("playFile", e => hiLight(e));

	iMusic("tr4").on("playFile", e => hiLight(e));
	iMusic("tr5").on("playFile", e => hiLight(e));
	iMusic("tr6").on("playFile", e => hiLight(e));
};

function hiLight(url){
	let targetID = url.split("/").pop();
	let target = document.querySelector("#"  + targetID);
	if(target){
		if(target.timeout){clearTimeout(target.timeout)}
		target.style.backgroundColor = "#66ff66";
		target.timeout = setTimeout(e => target.style.backgroundColor = "white", 200);
	}
}
