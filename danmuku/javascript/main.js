var requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  function(e) {
    return setTimeout(e, 10);
  };
var cancelAnimationFrame =
  window.cancelAnimationFrame ||
  window.mozCancelAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  window.webkitCancelRequestAnimationFrame ||
  window.msCancelAnimationFrame ||
  window.oCancelAnimationFrame ||
  function(e) {
    clearTimeout(e);
  };
function BoomBase() {}
BoomBase._boomWaitingArray = [];
BoomBase._optimize = []; // 内部记录每个弹道最后元素信息对象Cache
BoomBase.prototype = {
  constructor: BoomBase,
  _init: function() {
    BoomBase._boomWaitingArray.push(this.boomItem); // 给父队列添加元素
    this.centralControl(BoomBase._boomWaitingArray.shift());
  },
  /**
   * [选择弹幕轨道]
   * @return {[Number]}             [返回第几条弹幕]
   */
  centralControl: function loop(item) {
    var _this = this;
    var flag = true;
    if (BoomBase._optimize.length === 0) {
      for (var i = 0; i < BoomBase.option._boomTrackNum; i++) {
        BoomBase._optimize[i] = {};
        BoomBase._optimize[i].toRight = true;
        BoomBase._optimize[i].obj = null;
      }
    }
    for (var i = 0; i < BoomBase._optimize.length; i++) {
      if (BoomBase._optimize[i].toRight) {
        _this.fire(i);
        flag = false;
        break;
      }
    }
    if (flag) setTimeout(loop.bind(this), 0);
    // 全部false继续循环
  },
  fire: function(trackNum) {
    BoomBase._optimize[trackNum].toRight = false;
    BoomBase._optimize[trackNum].obj = this;
    var _this = this;
    // 开始时间
    this.start = null;
    // 记录上次时间戳
    this.prev = null;
    // 字体宽度
    this._leftMax = this.boomItem.option.width;
    // 总长度 = 字体长度+弹幕框宽度
    this.wholeLine = _this._leftMax + BoomBase.option._boomWidth;
    // 剩余左边距离
    this._left = BoomBase.option._boomWidth;
    // 弹道选择
    this.boomItem.style.top = trackNum * 20 + "px";
    this.boomItem.style.color = this.boomItem.option.color;
    this.timer = requestAnimationFrame(function step(timestamp) {
      if (!_this.start) {
        _this.start = timestamp;
        _this.prev = timestamp;
      }
      var progress = timestamp - _this.start;
      if (progress < 10000) {
        if (_this._left <= -_this._leftMax) {
          cancelAnimationFrame(_this.timer); //终止定时器
          _this.boomItem.parentNode.removeChild(_this.boomItem);
          return; //终止函数
        }
        _this._left -= _this.wholeLine * (timestamp - _this.prev) / 10000;
        _this.boomItem.style.left = _this._left + "px";
        _this.prev = timestamp;
        if (
          BoomBase._optimize[trackNum].obj._left <
          BoomBase.option._boomWidth -
            BoomBase._optimize[trackNum].obj._leftMax -
            BoomBase.option.minDistance
        )
          BoomBase._optimize[trackNum].toRight = true;

        requestAnimationFrame(step);
      } else {
        var more = progress - 10000;
        _this._left -= _this.wholeLine * more / 10000;
        _this.boomItem.style.left = _this._left + "px";
        cancelAnimationFrame(_this.timer); //终止定时器
        _this.boomItem.parentNode.removeChild(_this.boomItem);
      }
    });
  },
  /**
   * [随机数封装]
   * @param  {[Number]} start [开始数字]
   * @param  {[Number]} end   [结束数字]
   */
  _random: function(start, end) {
    return start + ~~(Math.random() * (end - start));
  }
};
function Booming(txt, option) {
  this.boomItem = document.createElement("span");
  this.boomItem.innerHTML = txt;
  BoomBase.option.boomBox.appendChild(this.boomItem);
  this.boomItem.option = Object.assign({}, option, {
    left: this.boomItem.offsetLeft,
    width: this.boomItem.offsetWidth,
    color: "#" + (~~(Math.random() * (1 << 24))).toString(16)
  });
  this._init(); // 初始化发射弹幕队列
}
Booming.prototype = Object.create(BoomBase.prototype);
Booming.prototype.constructor = Booming;

var boomBox = document.getElementById("boomBox");
// 全局弹幕配置
BoomBase.option = {
  minDistance: 54, // 限制最长为20字符，取个平均值
  liveTime: 10, // 弹幕统一存在时间为10秒
  boomBox: boomBox, // 弹幕容器
  boomItemFont: 18,
  _boomWidth: boomBox.offsetWidth || 0, // 内部属性
  _boomHeight: boomBox.offsetHeight || 0, // 内部属性
  _boomTrackNum: ~~(boomBox.offsetHeight / 20) || 0 // 内部属性
};
document.addEventListener("click", function(e) {
  if (e.target.id === "send") {
    var danmaku = document.querySelector(".danmaku").value;
    if (!danmaku) return;
    var element = new Booming(danmaku);
  }
});
document.querySelector(".danmaku").onkeydown = function(e) {
  e = e || window.event;
  if (e.keyCode === 13) {
    var danmaku = document.querySelector(".danmaku").value;
    //回车键
    new Booming(danmaku);
  }
};
var message = [
  "小主",
  "老铁",
  "小老板",
  "华佗在世",
  "皮老师",
  "神抽狗",
  "吃瓜小强",
  "土豆爱地瓜",
  "小土豆",
  "狗哥",
  "算了吧",
  "二师兄",
  "小可爱",
  "煎饼果子",
  "向日葵妲己",
  "猎头小哥哥",
  "拓优吴彦祖",
  "我不是黄蓉",
  "我是黄老邪",
  "胡飞雪",
  "雪上飞狐",
  "白发魔女",
  "小主",
  "老铁",
  "小老板",
  "华佗在世",
  "皮老师",
  "神抽狗",
  "吃瓜小强",
  "土豆爱地瓜",
  "小土豆",
  "狗哥",
  "算了吧",
  "二师兄",
  "小可爱",
  "肉夹馍",
  "小姐姐",
  "小哥哥",
  "吴彦祖",
  "我是黄蓉",
  "我是黄老邪",
  "胡飞雪",
  "雪上飞狐",
  "白发魔女"
];
!(function loop() {
  for (var i = 0; i < message.length; i++) {
    new Booming(message[i]);
  }
  // setTimeout(loop, 1000);
})();
