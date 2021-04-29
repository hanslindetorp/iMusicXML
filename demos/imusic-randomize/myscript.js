
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
	iMusic("track").on("playFile", e => hiLight(e));
};

function hiLight(url){
	let targetID = url.split("/").pop();
	let target = document.querySelector(`[data-imusic-play="${targetID}"]`);
	if(target){
		if(target.timeout){clearTimeout(target.timeout)}
		target.classList.add("imusic-playing");
		//target.style.backgroundColor = "#66ff66";
		target.timeout = setTimeout(e => target.classList.remove("imusic-playing"), 200);
	}
}
