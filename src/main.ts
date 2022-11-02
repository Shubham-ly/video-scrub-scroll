import "./style.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import v1 from "./assets/v1.mp4";
import v3 from "./assets/v3.mp4";
import v4 from "./assets/v4.mp4";

console.clear();

const videoPlayer: HTMLVideoElement = document.querySelector("#video-player")!;
videoPlayer.setAttribute("src", v3);

function once(el: HTMLElement, event: string, fn: Function, opts = {}) {
  var onceFn = function () {
    el.removeEventListener(event, onceFn);
    fn.apply(this, arguments);
  };
  el.addEventListener(event, onceFn, opts);
  return onceFn;
}

once(document.documentElement, "touchstart", () => {
  videoPlayer.play();
  videoPlayer.pause();
});

gsap.registerPlugin(ScrollTrigger);

let t1 = gsap.timeline({
  defaults: { duration: 1 },
  scrollTrigger: {
    trigger: "#app",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
  },
});

once(videoPlayer, "loadedmetadata", () => {
  t1.fromTo(
    videoPlayer,
    { currentTime: 0 },
    { currentTime: videoPlayer.duration || 1 }
  );
});

setTimeout(() => {
  if (window["fetch"]) {
    fetch(v3)
      .then((res) => res.blob())
      .then((res) => {
        const url = URL.createObjectURL(res);
        const t = videoPlayer.currentTime;
        once(document.documentElement, "touchstart", () => {
          videoPlayer.play();
          videoPlayer.pause();
        });
        videoPlayer.setAttribute("src", url);
        videoPlayer.currentTime = t + 0.01;
      });
  }
}, 1000);
