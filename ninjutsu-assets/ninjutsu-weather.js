(function () {
  "use strict";

  var STORAGE_ENABLED = "ninjutsuWeatherEnabled";
  var STORAGE_LAST = "ninjutsuWeatherLastCondition";
  var LAYER_CLASS = "ninjutsu-weather-layer";
  var API_ROOT = "https://api.open-meteo.com/v1/forecast";
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    return;
  }

  injectStyles();
  bindLogoTriggers();
  replayGrantedWeather();

  function bindLogoTriggers() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".ninjutsu-site-link, a.brand[href='/ninjutsu/'], a.brand[href='https://magpiestudios.app/ninjutsu/']"));
    links.forEach(function (link) {
      if (!link.querySelector("img[src*='ninjutsu-logo']")) {
        return;
      }

      link.addEventListener("mouseenter", function () {
        playCondition(readLastCondition() || { type: "petals", wind: 6 }, 1800);
      }, { passive: true });

      link.addEventListener("click", function (event) {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
          return;
        }

        var href = link.href;
        var samePage = normalizeUrl(href) === normalizeUrl(window.location.href);
        var enabled = readStorage(STORAGE_ENABLED) === "1";

        if (!enabled && !samePage) {
          playCondition(readLastCondition() || { type: "petals", wind: 6 }, 2200);
          return;
        }

        event.preventDefault();
        if (!samePage) {
          window.setTimeout(function () {
            window.location.href = href;
          }, 900);
        }

        requestWeatherCondition().then(function (condition) {
          playCondition(condition, samePage ? 6200 : 2600);
        }).catch(function () {
          playCondition({ type: "petals", wind: 6 }, samePage ? 4200 : 1600);
        });
      });
    });
  }

  function replayGrantedWeather() {
    if (readStorage(STORAGE_ENABLED) !== "1") {
      return;
    }

    window.setTimeout(function () {
      requestWeatherCondition().then(function (condition) {
        playCondition(condition, 3800);
      }).catch(function () {
        playCondition(readLastCondition() || { type: "petals", wind: 6 }, 2400);
      });
    }, 900);
  }

  function requestWeatherCondition() {
    if (!navigator.geolocation) {
      return Promise.reject(new Error("Geolocation unavailable"));
    }

    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: false,
        timeout: 7000,
        maximumAge: 900000
      });
    }).then(function (position) {
      return fetchWeather(position.coords.latitude, position.coords.longitude);
    }).then(function (weather) {
      var condition = classifyWeather(weather);
      writeStorage(STORAGE_ENABLED, "1");
      writeStorage(STORAGE_LAST, JSON.stringify(condition));
      return condition;
    });
  }

  function fetchWeather(latitude, longitude) {
    var params = new URLSearchParams({
      latitude: latitude.toFixed(4),
      longitude: longitude.toFixed(4),
      current: "weather_code,precipitation,rain,snowfall,cloud_cover,wind_speed_10m,wind_direction_10m,is_day",
      timezone: "auto",
      forecast_days: "1",
      wind_speed_unit: "mph",
      precipitation_unit: "inch"
    });

    return fetch(API_ROOT + "?" + params.toString(), {
      method: "GET",
      mode: "cors",
      credentials: "omit"
    }).then(function (response) {
      if (!response.ok) {
        throw new Error("Weather request failed");
      }
      return response.json();
    });
  }

  function classifyWeather(payload) {
    var current = payload && payload.current ? payload.current : {};
    var code = Number(current.weather_code || 0);
    var wind = Number(current.wind_speed_10m || 0);
    var cloud = Number(current.cloud_cover || 0);
    var rain = Number(current.rain || 0) + Number(current.precipitation || 0);
    var snow = Number(current.snowfall || 0);
    var isNight = Number(current.is_day) === 0;
    var type = "petals";

    if (code >= 95) {
      type = "storm";
    } else if (snow > 0 || (code >= 71 && code <= 77) || code === 85 || code === 86) {
      type = "snow";
    } else if (rain > 0 || (code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
      type = "rain";
    } else if (code === 45 || code === 48 || cloud >= 82) {
      type = "fog";
    }

    return {
      type: type,
      wind: Math.min(32, Math.max(4, wind)),
      direction: Number(current.wind_direction_10m || 110),
      night: isNight
    };
  }

  function playCondition(condition, duration) {
    var type = condition && condition.type ? condition.type : "petals";
    var layer = document.createElement("div");
    layer.className = LAYER_CLASS + " " + LAYER_CLASS + "--" + type;
    layer.setAttribute("aria-hidden", "true");
    layer.style.setProperty("--weather-wind", ((condition.wind || 6) / 8).toFixed(2));
    document.body.appendChild(layer);

    if (type === "rain" || type === "storm") {
      addRain(layer, type === "storm" ? 78 : 54, condition);
      if (type === "storm") {
        addFog(layer, 1);
      }
    } else if (type === "snow") {
      addSnow(layer, 42, condition);
    } else if (type === "fog") {
      addFog(layer, 3);
      addPetals(layer, 14, condition);
    } else {
      addPetals(layer, 30, condition);
    }

    window.setTimeout(function () {
      layer.classList.add(LAYER_CLASS + "--leaving");
      window.setTimeout(function () {
        if (layer.parentNode) {
          layer.parentNode.removeChild(layer);
        }
      }, 900);
    }, duration || 4200);
  }

  function addPetals(layer, count, condition) {
    for (var i = 0; i < count; i += 1) {
      var petal = document.createElement("span");
      petal.className = "ninjutsu-weather-petal";
      petal.style.left = random(-8, 104) + "vw";
      petal.style.setProperty("--delay", random(-1.2, 2.2).toFixed(2) + "s");
      petal.style.setProperty("--duration", random(5.2, 9.4).toFixed(2) + "s");
      petal.style.setProperty("--drift", signedDrift(condition, random(28, 92)) + "vw");
      petal.style.setProperty("--scale", random(0.58, 1.28).toFixed(2));
      petal.style.setProperty("--spin", random(240, 820).toFixed(0) + "deg");
      layer.appendChild(petal);
    }
  }

  function addRain(layer, count, condition) {
    for (var i = 0; i < count; i += 1) {
      var drop = document.createElement("span");
      drop.className = "ninjutsu-weather-rain";
      drop.style.left = random(-6, 106) + "vw";
      drop.style.setProperty("--delay", random(-0.8, 1.8).toFixed(2) + "s");
      drop.style.setProperty("--duration", random(0.58, 1.05).toFixed(2) + "s");
      drop.style.setProperty("--drift", signedDrift(condition, random(10, 24)) + "vw");
      layer.appendChild(drop);
    }
  }

  function addSnow(layer, count, condition) {
    for (var i = 0; i < count; i += 1) {
      var flake = document.createElement("span");
      flake.className = "ninjutsu-weather-snow";
      flake.style.left = random(-4, 104) + "vw";
      flake.style.setProperty("--delay", random(-1.4, 2.8).toFixed(2) + "s");
      flake.style.setProperty("--duration", random(6.8, 11.8).toFixed(2) + "s");
      flake.style.setProperty("--drift", signedDrift(condition, random(18, 54)) + "vw");
      flake.style.setProperty("--scale", random(0.55, 1.45).toFixed(2));
      layer.appendChild(flake);
    }
  }

  function addFog(layer, count) {
    for (var i = 0; i < count; i += 1) {
      var fog = document.createElement("span");
      fog.className = "ninjutsu-weather-fog";
      fog.style.top = (18 + i * 19) + "vh";
      fog.style.setProperty("--delay", (i * -1.8).toFixed(2) + "s");
      fog.style.setProperty("--duration", (11 + i * 1.7).toFixed(2) + "s");
      layer.appendChild(fog);
    }
  }

  function signedDrift(condition, amount) {
    var direction = Number(condition && condition.direction ? condition.direction : 110);
    var sign = direction > 180 ? -1 : 1;
    var windBoost = Math.max(0.8, Number(condition && condition.wind ? condition.wind : 6) / 8);
    return (sign * amount * windBoost).toFixed(1);
  }

  function readLastCondition() {
    try {
      return JSON.parse(readStorage(STORAGE_LAST) || "null");
    } catch (error) {
      return null;
    }
  }

  function readStorage(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function writeStorage(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {}
  }

  function normalizeUrl(value) {
    var url = new URL(value, window.location.href);
    return url.origin + url.pathname.replace(/\/index\.html$/, "/");
  }

  function random(min, max) {
    return min + Math.random() * (max - min);
  }

  function injectStyles() {
    if (document.getElementById("ninjutsu-weather-styles")) {
      return;
    }

    var style = document.createElement("style");
    style.id = "ninjutsu-weather-styles";
    style.textContent = "" +
      "." + LAYER_CLASS + "{position:fixed;inset:0;z-index:9998;pointer-events:none;overflow:hidden;opacity:1;transition:opacity .8s ease;}" +
      "." + LAYER_CLASS + "--leaving{opacity:0;}" +
      ".ninjutsu-weather-petal,.ninjutsu-weather-rain,.ninjutsu-weather-snow,.ninjutsu-weather-fog{position:absolute;display:block;will-change:transform,opacity;}" +
      ".ninjutsu-weather-petal{top:-12vh;width:18px;height:9px;border-radius:100% 0 100% 0;background:linear-gradient(135deg,rgba(255,205,216,.96),rgba(142,17,34,.88));box-shadow:0 0 10px rgba(150,22,38,.18);opacity:.86;transform:scale(var(--scale)) rotate(28deg);animation:ninjutsuPetalFall var(--duration) linear var(--delay) forwards;}" +
      ".ninjutsu-weather-rain{top:-18vh;width:1px;height:72px;border-radius:999px;background:linear-gradient(180deg,rgba(220,238,255,0),rgba(206,225,246,.66),rgba(206,225,246,0));opacity:.7;transform:rotate(15deg);animation:ninjutsuRainFall var(--duration) linear var(--delay) forwards;}" +
      ".ninjutsu-weather-snow{top:-10vh;width:7px;height:7px;border-radius:999px;background:rgba(240,247,255,.86);box-shadow:0 0 12px rgba(210,230,255,.42);opacity:.78;transform:scale(var(--scale));animation:ninjutsuSnowFall var(--duration) linear var(--delay) forwards;}" +
      ".ninjutsu-weather-fog{left:-26vw;width:152vw;height:24vh;border-radius:999px;background:radial-gradient(ellipse at center,rgba(220,228,238,.2),rgba(220,228,238,.08) 44%,rgba(220,228,238,0) 72%);filter:blur(18px);opacity:.8;animation:ninjutsuFogDrift var(--duration) ease-in-out var(--delay) infinite alternate;}" +
      "." + LAYER_CLASS + "--storm::before{content:\"\";position:absolute;inset:0;background:rgba(210,228,255,.28);opacity:0;animation:ninjutsuStormFlash 2.6s ease-out .45s 2;}" +
      "@keyframes ninjutsuPetalFall{0%{transform:translate3d(0,-12vh,0) scale(var(--scale)) rotate(28deg);opacity:0;}12%{opacity:.86;}100%{transform:translate3d(var(--drift),112vh,0) scale(var(--scale)) rotate(var(--spin));opacity:0;}}" +
      "@keyframes ninjutsuRainFall{0%{transform:translate3d(0,-16vh,0) rotate(15deg);opacity:0;}10%{opacity:.72;}100%{transform:translate3d(var(--drift),118vh,0) rotate(15deg);opacity:0;}}" +
      "@keyframes ninjutsuSnowFall{0%{transform:translate3d(0,-10vh,0) scale(var(--scale));opacity:0;}14%{opacity:.78;}100%{transform:translate3d(var(--drift),112vh,0) scale(var(--scale));opacity:0;}}" +
      "@keyframes ninjutsuFogDrift{0%{transform:translate3d(-8vw,0,0);}100%{transform:translate3d(8vw,-2vh,0);}}" +
      "@keyframes ninjutsuStormFlash{0%,72%,100%{opacity:0;}8%{opacity:.46;}14%{opacity:.05;}22%{opacity:.24;}}" +
      "@media (prefers-reduced-motion:reduce){." + LAYER_CLASS + "{display:none!important;}}";
    document.head.appendChild(style);
  }
}());
