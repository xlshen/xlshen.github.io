function Downslide(a,b,c,d,e){this.items=a,this.name=b,this.id=c,this.targetElement=d,this.hiddenElement=e,this.domNode=null,this.selectedDom=null,this._init(this.items,this.name,this.id)}Downslide.prototype={constructor:Downslide,_init:function(a,b,c){var d=this._template(a,b,c);document.body.appendChild(d),this._setPosition(),this._event()},_template:function(a,b,c){var f,g,d=this;if(c=c||"",document.createDocumentFragment(),f=this._createNode(1,"ul"),""===c)for(g=0;g<a.length;g++)f.appendChild(d._createNode(2,"li",a[g].name,a[g].id));else for(g=0;g<a.length;g++)c==a[g].id?f.appendChild(d._createNode(3,"li",a[g].name,a[g].id)):f.appendChild(d._createNode(2,"li",a[g].name,a[g].id,"selected"));return this.domNode=f,this.domNode},_createNode:function(a,b,c,d){var f,g;switch(a){case 1:return f=document.createElement(b),f.id="downslide-list",f.className="downslide-list",f;case 2:return f=document.createElement(b),g=document.createTextNode(c),f.setAttribute("data-id",d),f.className="downslide-list-item",f.appendChild(g),f;case 3:return f=document.createElement(b),g=document.createTextNode(c),f.setAttribute("data-id",d),f.className="downslide-list-item selected",f.appendChild(g),this.selectedDom=f,this.selectedDom}},_setPosition:function(){var a=null,b=null,c=null,d=null,e=null;a=window.getComputedStyle?window.getComputedStyle(this.targetElement,null):this.targetElement.currentStyle,b=a.height,c=a.width,d=this._getLeft(this.targetElement),e=this._getTop(this.targetElement),this.domNode.style.top=parseInt(b)+e+"px",this.domNode.style.left=d+"px",this.domNode.style.width=c},_getTop:function(a){var b=a.offsetTop;return null!=a.offsetParent&&(b+=this._getTop(a.offsetParent)),b},_getLeft:function(a){var b=a.offsetLeft;return null!=a.offsetParent&&(b+=this._getLeft(a.offsetParent)),b},_event:function(){var a=this,b=!0;this._addEvent(document,"click",function(c){var d;return c=c||window.event,d=c.target||c.srcElement,d.id===a.targetElement.id?(a._toggle(b),b=!b,!1):(a.hide(),b?b:b=!b,!1)},!1),this._addEvent(this.domNode,"click",function(b){var c;b=b||window.event,c=b.target||b.srcElement,a._updateSelected(c),a.name=c.firstChild.nodeValue,a.id=c.getAttribute("data-id"),a.targetElement.value=a.name,a.hiddenElement.value=a.id,"function"==typeof a.callback?a.callback():"",a.hide()},!1)},_addEvent:function(a,b,c,d){if(a.addEventListener)return a.addEventListener(b,c,d),!0;if(a.attachEvent){var e=a.attachEvent("on"+b,c);return e}a["on"+b]=c},_updateSelected:function(a){this.selectedDom.className="downslide-list-item",a.className="downslide-list-item selected",this.selectedDom=a},show:function(){this.domNode.style.display="block"},hide:function(){this.domNode.style.display="none"},_toggle:function(a){a?this.show():this.hide()},destory:function(){this.domNode.parentNode.removeChild(this.domNode)}};
