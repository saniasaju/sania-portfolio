const loadingScreen =
    document.querySelector(".loading-screen");

const loadingVideo =
    document.querySelector(".loading-screen__video");


function finishLoading() {

    if (!loadingScreen) return;

    loadingScreen.classList.add("is-finished");

    document.body.classList.remove("is-loading");

}


if (loadingVideo) {

    loadingVideo.addEventListener(
        "ended",
        finishLoading,
        { once: true }
    );

} else {

    finishLoading();

}