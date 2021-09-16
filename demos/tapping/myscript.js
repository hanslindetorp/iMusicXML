var dataPoints = 0;
var sum = 0;
var latencyTotal = 0;
var latency = 0;
var intervalID;

window.onload = e => {
    let touchpad = document.querySelector("#touchpad");
    let output = document.querySelector("#output");
    let avg = document.querySelector("#avg");
    let latencyDisplay = document.querySelector("#latency");

    touchpad.addEventListener("pointerdown", e => {
        if(iMusic.isPlaying()){
            let pos = iMusic.getPosition(iMusic.getPosition().time - latency);
            let distToBeat = pos.distToBeat;
            dataPoints++;
            if(dataPoints < 9){
                touchpad.innerHTML = 9 - dataPoints;
                latencyTotal += distToBeat;
            } else if(dataPoints == 9){
                latency = latencyTotal / 8;
                latencyDisplay.innerHTML = "Latency: " + latency.toFixed(3);
                touchpad.innerHTML = "";
            } else {
                let diff = Math.abs(distToBeat);
                sum += diff;
                output.innerHTML = distToBeat.toFixed(3) + "<br/>" + output.innerHTML;
                avg.innerHTML = "Avg diff: " + (sum / dataPoints).toFixed(3);

                if(intervalID){clearInterval(intervalID)}
                let maxDiff = pos.beatDuration / 2;
                let r = Math.min(255, diff / maxDiff * 255);
                let g = Math.max(0, 255 - 2 * diff / maxDiff * 255);
                let b = 20;
                touchpad.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

                intervalID = setInterval(e => {
                    r = Math.max(0, r - 5);
                    g = Math.max(0, g - 5);
                    touchpad.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
                }, 20);
            }
            
        }
    });
}