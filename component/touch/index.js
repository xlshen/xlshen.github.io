document.addEventListener("touchstart", function(e) {
  x1 = e.targetTouches[0].pageX;
  y1 = e.targetTouches[0].pageY;
});
document.addEventListener("touchmove", function(e) {
  x2 = e.targetTouches[0].pageX;
  y2 = e.targetTouches[0].pageY;

  var changeX = x2 - x1;
  var changeY = y2 - y1;
  if (Math.abs(changeX) > Math.abs(changeY) && Math.abs(changeX) > 0) {
    //左右事件
    if (changeX > 0) {
      // 右滑
      document.getElementsByClassName("slide")[0].style.cssText =
        "transform:translateX(0)";
    } else {
      // 左滑
      document.getElementsByClassName("slide")[0].style.cssText =
        "transform:translateX(-100%)";
      // 压入历史栈，替换URL
      history.pushState({ router: location.pathname }, null, "/second.html");
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
  e.preventDefault();
});
document.addEventListener("touchend", function(e) {
  //alert("点击一下");
});
window.onpopstate = function(event) {
  // location.href = event.state.router;
};
