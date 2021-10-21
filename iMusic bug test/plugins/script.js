
console.log("Mall 2021. Version 1.1");
iMus.debug = true;

window.addEventListener("load", e => {

    let transitionTime = 1000;
    let navigateOnVideoEnd = e => {
        location.href = e.target.dataset.url;
    }

    // auto stop videos playing after `transitionTime` in current section
    // and remove any onended function
    document.querySelectorAll("a").forEach(el => {
        el.addEventListener("click", e => {
            let targetVideos = document.querySelectorAll(`${location.hash} video`);
            targetVideos.forEach(video => {
                video.removeEventListener("onended", navigateOnVideoEnd);
            });
            setTimeout(() => {
                targetVideos.forEach(video => {
                    video.pause();
                });
            }, transitionTime);   
        });
    });

    // play specified video at specified time and navigate to 
    // specified target onended
    document.querySelectorAll("a[data-video-play]").forEach(el => {
        let target = el.dataset.videoPlay.split(",");
        let url = target.pop();
        let pos = target.pop();
        let floatPos = parseFloat(pos);

        let videos = document.querySelectorAll(target.join(","));
        videos.forEach(video => {
            video.dataset.url = url;
            video.addEventListener("ended", navigateOnVideoEnd);
        });

        el.addEventListener("click", e => {
            videos.forEach(video => {
                video.pause();
                video.currentTime = floatPos;
                video.play();
            });
        });
    });

    // stop specified video directly
    document.querySelectorAll("a[data-video-stop]").forEach(el => {
        el.addEventListener("click", e => {
            document.querySelectorAll(e.target.dataset.videoStop).forEach(video => {
                video.stop();
            });
        });
    });

});