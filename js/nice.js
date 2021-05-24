"use strict";
/**
 * @param {!NodeList} arr
 * @return {?}
 */
function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    /** @type {number} */
    var i = 0;
    /** @type {!Array} */
    var arr2 = Array(arr.length);
    for (; i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
  return Array.from(arr);
}
/** @type {boolean} */
var playing = true;
/**
 * @return {?}
 */
var timer = function () {
  return setInterval(function () {
    /** @type {(Element|null)} */
    var s = document.getElementById("counter");
    /** @type {number} */
    var w = parseInt(s.innerText);
    /** @type {number} */
    s.innerText = w + 1;
  }, 1e3);
};
var interval = timer();
/** @type {(Element|null)} */
var minus = document.getElementById("minus");
/** @type {(Element|null)} */
var plus = document.getElementById("plus");
/** @type {(Element|null)} */
var heart = document.getElementById("heart");
/** @type {(Element|null)} */
var pause = document.getElementById("pause");
/** @type {!Element} */
var commentForm = document.getElementsByTagName("form")[0];
minus.addEventListener("click", function () {
  /** @type {(Element|null)} */
  var node = document.getElementById("counter");
  /** @type {number} */
  var current = parseInt(node.innerText);
  /** @type {number} */
  node.innerText = current - 1;
}),
  plus.addEventListener("click", function () {
    /** @type {(Element|null)} */
    var s = document.getElementById("counter");
    /** @type {number} */
    var w = parseInt(s.innerText);
    /** @type {number} */
    s.innerText = w + 1;
  }),
  heart.addEventListener("click", function () {
    /** @type {(Element|null)} */
    var node = document.getElementById("counter");
    /** @type {number} */
    var m = parseInt(node.innerText);
    /** @type {(Element|null)} */
    var div = document.querySelector(".likes");
    var child = void 0;
    if (
      []
        .concat(_toConsumableArray(div.children))
        .map(function (post) {
          return parseInt(post.dataset.num);
        })
        .includes(m)
    ) {
      /** @type {(Element|null)} */
      child = document.querySelector('[data-num="' + m + '"]');
      /** @type {number} */
      var l = parseInt(child.children[0].innerText);
      /** @type {string} */
      child.innerHTML =
        m + " has been liked <span>" + (l + 1) + "</span> times";
    } else {
      (child = document.createElement("li")).setAttribute("data-num", m);
      /** @type {string} */
      child.innerHTML = m + " has been liked <span>1</span> time";
      div.appendChild(child);
    }
  }),
  pause.addEventListener("click", function () {
    if (playing) {
      /** @type {boolean} */
      playing = false;
      clearInterval(interval);
      /** @type {string} */
      this.innerText = "resume";
    } else {
      /** @type {boolean} */
      playing = true;
      interval = timer();
      /** @type {string} */
      this.innerText = "pause";
    }
    []
      .concat(_toConsumableArray(document.getElementsByTagName("button")))
      .forEach(function (data) {
        if ("pause" !== data.id) {
          /** @type {boolean} */
          data.disabled = !playing;
        }
      });
  }),
  commentForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var result = this.children[0];
    var total = result.value;
    /** @type {string} */
    result.value = "";
    /** @type {(Element|null)} */
    var starHold = document.querySelector(".comments");
    /** @type {!Element} */
    var e = document.createElement("p");
    e.innerText = total;
    starHold.appendChild(e);
  });
