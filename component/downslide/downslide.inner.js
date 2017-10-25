/**
 * [Downslide]
 * 功能：实现下拉单选及初始化
 * @param       {[Array]} items         [初始化数据集合]
 * @param       {[String]} selectedName  [选中元素name]
 * @param       {[Number]} selectedId    [选中元素id]
 * @param       {[Node]} targetElement [显示dom元素引用]
 * @param       {[Node]} hiddenElement [隐藏dom元素引用]
 * @param       {[Function]} callback [回调函数]
 * @constructor
 */
function Downslide(
  items,
  selectedName,
  selectedId,
  target,
  targetElement,
  hiddenElement,
  callback
) {
  this.items = items;
  this.name = selectedName;
  this.id = selectedId;
  this.target = target;
  this.targetElement = targetElement;
  this.hiddenElement = hiddenElement;
  this.callback = callback;
  // 索引该下拉框DOM节点
  this.domNode = null;
  this.selectedDom = null;
  /**
       * 数据初始化
       */
  this._init(this.items, this.name, this.id);
}
Downslide.prototype = {
  constructor: Downslide,
  /**
       * 初始化下拉框
       * @param  {[Array]} items [初始化数据]
       * @param  {[String]} name  [选中元素名称]
       * @param  {[Number]} id    [选中元素id]
       * @return {[DOM]} [DOM元素]
       */
  _init: function(items, name, id) {
    var template = this._template(items, name, id);
    this.target.appendChild(template);
    this._setPosition();
    this._event();
  },
  /**
       * [下拉框定位]
       * @param  {[Array]} items [初始化数据]
       * @param  {[String]} name  [选中元素名称]
       * @param  {[Number]} id    [选中元素id]
       */
  _template: function(items, name, id) {
    var _this = this,
      name = name || "",
      id = id || "",
      fragment = document.createDocumentFragment(),
      elementNode = this._createNode(1, "ul");
    /**
             * @param  {[String]} value [description]
             * @param  {[Number]} index [description]
             * @return {[Node]} [DOM元素]
             * 为了兼容IE8用for
             */
    if (id === "") {
      for (var index = 0; index < items.length; index++) {
        elementNode.appendChild(
          _this._createNode(2, "li", items[index].name, items[index].id)
        );
      }
    } else {
      for (var index = 0; index < items.length; index++) {
        id == items[index].id
          ? elementNode.appendChild(
              _this._createNode(3, "li", items[index].name, items[index].id)
            )
          : elementNode.appendChild(
              _this._createNode(
                2,
                "li",
                items[index].name,
                items[index].id,
                "selected"
              )
            );
      }
    }
    // fragment.appendChild(elementNode);
    this.domNode = elementNode;
    return this.domNode;
  },
  /**
       * [根据类型创建节点,并返回创建好的DOM内容]
       * @param  {[Number]} type [1: element无textNode, 2: element包含textNode]
       * @param {[String]} node [生成的节点类型]
       * @param  {[String]} name [文本节点]
       * @param  {[String]} id   [元素节点id属性，用来设置选中id]
       * @param  {[String]} selected [标识选中状态：class值]
       * @return {[Node]}          [生成的节点]
       */
  _createNode: function(type, node, name, id, selected) {
    switch (type) {
      /**
                   * [最外层元素节点]
                   */
      case 1:
        var element = document.createElement(node);
        element.id = "downslide-list";
        element.className = "downslide-list";
        return element;
        break;
      /**
                           * [元素带文本节点,无选中状态]
                           */
      case 2:
        var element = document.createElement(node),
          textNode = document.createTextNode(name);
        element.setAttribute("data-id", id);
        element.className = "downslide-list-item";
        element.appendChild(textNode);
        return element;
        break;
      /**
                           * [元素带文本节点,选中状态]
                           */
      case 3:
        var element = document.createElement(node),
          textNode = document.createTextNode(name);
        element.setAttribute("data-id", id);
        element.className = "downslide-list-item selected";
        element.appendChild(textNode);
        // 记录selected DOM
        this.selectedDom = element;
        return this.selectedDom;
        break;
      default:
        break;
    }
  },
  /**
       * [根据初始化节点，设置下拉框位置]
       */
  _setPosition: function() {
    var style = null,
      height = null,
      width = null,
      left = null,
      top = null,
      offset = null;
    if (window.getComputedStyle) {
      style = window.getComputedStyle(this.targetElement, null); // 非IE
    } else {
      style = this.targetElement.currentStyle; // IE
    }
    height = style.height;
    width = style.width;
    /**
             * [设置元素位置]
             */
    this.domNode.style.top = parseInt(height) + "px";
    this.domNode.style.left = "0px";
    this.domNode.style.width = width;
  },
  /**
       * 下拉框事件处理
       */
  _event: function() {
    var _this = this,
      toggleFLag = true;
    /**
             * [全局事件监听]
             */
    this._addEvent(
      document,
      "click",
      function(e) {
        var e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.id === _this.targetElement.id && target.id) {
          _this._toggle(toggleFLag);
          toggleFLag = !toggleFLag;
          return false;
        }
        _this.hide();
        toggleFLag ? toggleFLag : (toggleFLag = !toggleFLag);
        return false;
      },
      false
    );
    /**
             * [domNode内部事件监听]
             */
    this._addEvent(
      this.domNode,
      "click",
      function(e) {
        var e = e || window.event;
        var target = e.target || e.srcElement;
        _this._updateSelected(target);
        // 提取内容 innerText
        _this.name = target.firstChild.nodeValue;
        _this.id = target.getAttribute("data-id");
        // 设置提交值
        _this.targetElement.value = _this.name;
        _this.hiddenElement.value = _this.id;
        // 设置回调函数
        typeof _this.callback === "function" ? _this.callback() : "";
        _this.hide();
      },
      false
    );
  },
  /**
       * [事件处理函数，兼容IE8]
       * @param  {[Node]}   elm   [触发元素]
       * @param  {[String]}   evType  [触发类型]
       * @param  {Function}  fn  [触发事件函数]
       * @param  {[Boolean]}   useCapture [冒泡阶段]
       */
  _addEvent: function(elm, evType, fn, useCapture) {
    if (elm.addEventListener) {
      // W3C标准
      elm.addEventListener(evType, fn, useCapture);
      return true;
    } else if (elm.attachEvent) {
      //IE
      var r = elm.attachEvent("on" + evType, fn); //IE5+
      return r;
    } else {
      elm["on" + evType] = fn; //DOM事件
    }
  },
  /**
       * [更新节点选中状态]
       * @param  {[Node]} target [目标节点]
       */
  _updateSelected: function(target) {
    // 更新样式
    this.selectedDom.className = "downslide-list-item";
    target.className = "downslide-list-item selected";
    // 更新selectedDom
    this.selectedDom = target;
  },
  /**
       * [下拉框显示]
       */
  show: function() {
    this.domNode.style.display = "block";
  },
  /**
       * 下拉框隐藏
       */
  hide: function() {
    this.domNode.style.display = "none";
  },
  _toggle: function(toggleFLag) {
    toggleFLag ? this.show() : this.hide();
  },
  /**
       * 下拉框销毁
       * 供外部函数调用
       */
  destory: function() {
    this.domNode.parentNode.removeChild(this.domNode);
  }
};
