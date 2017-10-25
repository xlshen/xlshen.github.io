/* 全局symbol */
var rtFlag = Symbol("slideRight");
/* 全局router */
var router = {
  [rtFlag]: true
};
document.addEventListener("touchstart", function(e) {
  x1 = e.targetTouches[0].pageX;
  y1 = e.targetTouches[0].pageY;
  e.preventDefault();
});
document.addEventListener("touchmove", function(e) {
  x2 = e.targetTouches[0].pageX;
  y2 = e.targetTouches[0].pageY;
  e.preventDefault();
});
document.addEventListener("touchend", function(e) {
  var changeX = x2 - x1;
  var changeY = y2 - y1;
  if (Math.abs(changeX) > Math.abs(changeY) && Math.abs(changeX) > 0) {
    //左右事件
    if (changeX > 0) {
      // 右滑
      /* 自动调用popstate */
      history.go(-1);
    } else {
      // 左滑
      // 这部分逻辑跟state有内容时保持一致！！！
      if (router[rtFlag]) {
        document.getElementsByClassName("slide")[0].style.cssText =
          "transform:translateX(-100%)"; // 压入历史栈，替换URL
        history.pushState({ router: location.pathname }, null, "/second.html");
      }

      router[rtFlag] = false;
    }
  } else if (Math.abs(changeY) > Math.abs(changeX) && Math.abs(changeY) > 0) {
    //上下事件
    if (changeY > 0) {
      // 下滑
    } else {
      // 上滑
    }
  } else {
    // 仅仅摸一下
  }
});
window.onpopstate = function(event) {
  if (event.state) {
    document.getElementsByClassName("slide")[0].style.cssText =
      "transform:translateX(-100%)";

    router[rtFlag] = false;
  } else {
    document.getElementsByClassName("slide")[0].style.cssText =
      "transform:translateX(0)";

    router[rtFlag] = true;
  }
};
