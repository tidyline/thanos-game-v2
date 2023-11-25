import Typed from "typed.js";

import optionJson from "./assets/options.json";
import memberJson from "./assets/members.json";

let originLength = null;
let data = null;
let particleOptions = null;
let gameStep = ["start", "particle"].values();

function shuffle(array) {
  var j, x, i;
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
  return array;
}

function loadParticles() {
  const options = optionJson;
  const list = memberJson.list;

  if (list.length) {
    originData = data = list;
    originLength = list.length;

    console.log(list);

    options.particles.shape.images = list.map((k) => ({
      src: `./${k}`,
      width: 100,
      height: 125,
    }));

    options.particles.number.value = list.length;
    particleOptions = options;

    renderCount(list.length);
    window.particlesJS("particles-js", options);
  }
}

function toggleFinger(isShow) {
  document.getElementById("game-finger").style.display = isShow
    ? "flex"
    : "none";
}

function renderCount(count) {
  document.getElementById("game-count").innerText = count;
}

function playMusic() {
  var el = document.getElementById("audio");

  el.play();
}

function game(step) {
  const item = step.next();

  playMusic();

  if (item.done) {
    return "done";
  } else {
    switch (item.value) {
      case "start":
        var options = {
          strings: ["THE<br/>THANOS<br/>GAME"],
          typeSpeed: 100,
          showCursor: false,
        };
        new Typed(".game-title", options);
        break;

      case "particle":
        document.getElementById("game-start").style.display = "none";
        document.getElementById("particles-js").style.display = "block";
        loadParticles();
        break;
    }
  }
}

function play() {
  var percent = Math.round((data.length / originLength) * 100);
  var isOver25Percent = percent > 25;
  renderCount([`${data.length} 명`].join(" "));

  window.particlesJS("particles-js", {
    ...particleOptions,
    particles: {
      ...particleOptions.particles,
      number: {
        ...particleOptions.particles.number,
        value: data.length,
      },
      shape: {
        ...particleOptions.particles.shape,
        images: data.map((v) => ({
          ...v,
          src: `./${v}`,
          width: 100,
          height: 125,
        })),
      },
      size: {
        ...particleOptions.particles.size,
        value: Math.min(
          Math.max(Math.round(originLength / data.length) * 10, 50),
          70
        ),
        random: isOver25Percent,
      },
      move: {
        ...particleOptions.particles.move,
        enable: !!percent,
        speed: (100 / percent || 1) * 0.1,
      },
    },
  });
}

const init = () => {
  document.getElementById("game-start-btn").addEventListener("click", () => {
    game(gameStep);
  });

  document.addEventListener("click", () => {
    playMusic();
  });

  document.addEventListener("keydown", (e) => {
    if (data && data.length > 1) {
      if (e.code === "Enter") {
        data = shuffle(data).slice(0, data.length / 2);
        toggleFinger(true);
        setTimeout(function () {
          play();
          toggleFinger(false);
        }, 950);
      }
    }
  });
};

init();
