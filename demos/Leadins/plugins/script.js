console.log("Mall HT2024. Version 1.4");
//iMus.debug = true;
var pageContainer;


// p5js
function setup() {};
function draw() {};


window.addEventListener("hashchange", (event) => {

    let oldHash, oldPage, newHash, newPage;

    if(event.newURL.includes("#")){
        newHash = `#${event.newURL.split("#").pop()}`;
        newPage = document.querySelector(newHash);
    }
    
    if(event.oldURL.includes("#")){
        oldHash = `#${event.oldURL.split("#").pop()}`;
        oldPage = document.querySelector(oldHash);
    }


    let mediaFiles;
    let transitionTime = 1000;
    if(oldPage){
        mediaFiles = oldPage.querySelectorAll(`video, audio`);
        // auto stop videos playing after `transitionTime` in current section
        if(mediaFiles.length){
            mediaFiles.forEach(media => {
                if(!media.paused){
                    setTimeout(() => {
                        media.pause();
                    }, transitionTime); 
                }
            });
            
        }
    }
    
    if(newPage && newPage != oldPage){

        // auto play indicated media files
        mediaFiles = newPage.querySelectorAll(`video, audio`);
        mediaFiles.forEach(el => {
            if(el.dataset.autoplay){
                el.pause();
                el.currentTime = 0;
                el.play();
            }
        });
    }


});

window.addEventListener("load", e => {

    pageContainer = document.querySelector("main");


    // control navigation
    document.querySelectorAll("a[href]").forEach(el => {
        let href = el.getAttribute("href");

        el.addEventListener("click", e => {
            e.preventDefault();

            switch(href){

                case "prev":
                    window.history.back();
                break;
    
                case "next":
                    let currentPage = pageContainer.querySelector(location.hash);
                    let nextPage = currentPage.nextElementSibling;
                    if(currentPage && nextPage && currentPage != nextPage){
                        window.location = `#${nextPage.getAttribute("id")}`;
                    }
                break;
    
                default:
                window.location = href;
                break;
            }
             

        });
    });

    // play specified video at specified time and navigate to 
    // specified target onended

    [...document.querySelectorAll("*")].forEach( el => {

        [...el.attributes].forEach( attr => {

            let attributeName = attr.localName;
            // start, stop
            if(attributeName.startsWith("data-media-")){

                let attrNameArr = attributeName.split("-");
                let event = attrNameArr[2] || "click";
                let command = attrNameArr[3] || "play";

                switch(command){
                    case "play":
                    case "stop":
                    let target = attr.value.split(",");
                    let nextUrl = target.length >= 3 ? target.pop().trim() : "";
                    let pos = target.length >= 2 ? parseFloat(target.pop()) : -1;
                    let selector = target.join(",");
                    let targetMedia = document.querySelectorAll(selector);
    
                    el.addEventListener(event, e => {
                        targetMedia.forEach(media => {

                            // set target after media ended if applicable
                            if(nextUrl){
                                media.dataset.mediaEndedHref = nextUrl;
                            }
                            // control playback
                            media.pause();
                            media.currentTime = pos;
                            media[command]();
                        });
                    });
                    break;
                }
                
            }
        });
    });

    // init navigation
    let targetPage = pageContainer.querySelector(".init-page") || pageContainer.firstElementChild;
    let targetID = targetPage.getAttribute("id");
    if(targetID){
        window.location = `#${targetID}`;
    }

    let mediaLoaded = 0;
    let allMedia = document.querySelectorAll("video, audio");
    if(allMedia.length){
        // control autoplay for mediafiles
        allMedia.forEach(el => {
            if(el.hasAttribute("autoplay") && el.getAttribute("autoplay") != "false"){
                el.pause();
                el.setAttribute("autoplay", false);
                el.dataset.autoplay = true;
            }
            el.addEventListener("ended", e => {
                if(e.target.dataset.mediaEndedHref){
                    
                    let href = e.target.dataset.mediaEndedHref;
                    let targetPage = pageContainer.querySelector(href);
                    if(targetPage){
                        // goto page if specified
                        location.href = href;
                    } else {
                        // start videos if specified 
                        document.querySelectorAll(`video${href}, audio${href}`).forEach(media => media.play());
                    }
                }
            });
            
            el.addEventListener("loadeddata", e => {
                if(++mediaLoaded == allMedia.length){
                    document.body.classList.remove("media-loading");
                }
            });

            el.load();
        });
        
        document.body.classList.add("media-loading");
    }



    
});