!function(e){function t(i){if(n[i])return n[i].exports;var o=n[i]={exports:{},id:i,loaded:!1};return e[i].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="/html/profession/",t(0)}([function(e,t,n){n(8),n(7),e.exports=n(3)},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var i={},o=0;o<this.length;o++){var a=this[o][0];"number"==typeof a&&(i[a]=!0)}for(o=0;o<t.length;o++){var r=t[o];"number"==typeof r[0]&&i[r[0]]||(n&&!r[2]?r[2]=n:n&&(r[2]="("+r[2]+") and ("+n+")"),e.push(r))}},e}},function(e,t,n){function i(e,t){for(var n=0;n<e.length;n++){var i=e[n],o=d[i.id];if(o){o.refs++;for(var a=0;a<o.parts.length;a++)o.parts[a](i.parts[a]);for(;a<i.parts.length;a++)o.parts.push(c(i.parts[a],t))}else{for(var r=[],a=0;a<i.parts.length;a++)r.push(c(i.parts[a],t));d[i.id]={id:i.id,refs:1,parts:r}}}}function o(e){for(var t=[],n={},i=0;i<e.length;i++){var o=e[i],a=o[0],r=o[1],l=o[2],s=o[3],c={css:r,media:l,sourceMap:s};n[a]?n[a].parts.push(c):t.push(n[a]={id:a,parts:[c]})}return t}function a(e,t){var n=g(),i=v[v.length-1];if("top"===e.insertAt)i?i.nextSibling?n.insertBefore(t,i.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),v.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(t)}}function r(e){e.parentNode.removeChild(e);var t=v.indexOf(e);t>=0&&v.splice(t,1)}function l(e){var t=document.createElement("style");return t.type="text/css",a(e,t),t}function s(e){var t=document.createElement("link");return t.rel="stylesheet",a(e,t),t}function c(e,t){var n,i,o;if(t.singleton){var a=y++;n=h||(h=l(t)),i=p.bind(null,n,a,!1),o=p.bind(null,n,a,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=s(t),i=u.bind(null,n),o=function(){r(n),n.href&&URL.revokeObjectURL(n.href)}):(n=l(t),i=f.bind(null,n),o=function(){r(n)});return i(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;i(e=t)}else o()}}function p(e,t,n,i){var o=n?"":i.css;if(e.styleSheet)e.styleSheet.cssText=x(t,o);else{var a=document.createTextNode(o),r=e.childNodes;r[t]&&e.removeChild(r[t]),r.length?e.insertBefore(a,r[t]):e.appendChild(a)}}function f(e,t){var n=t.css,i=t.media;if(i&&e.setAttribute("media",i),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}function u(e,t){var n=t.css,i=t.sourceMap;i&&(n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */");var o=new Blob([n],{type:"text/css"}),a=e.href;e.href=URL.createObjectURL(o),a&&URL.revokeObjectURL(a)}var d={},b=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},m=b(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),g=b(function(){return document.head||document.getElementsByTagName("head")[0]}),h=null,y=0,v=[];e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=m()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var n=o(e);return i(n,t),function(e){for(var a=[],r=0;r<n.length;r++){var l=n[r],s=d[l.id];s.refs--,a.push(s)}if(e){var c=o(e);i(c,t)}for(var r=0;r<a.length;r++){var s=a[r];if(0===s.refs){for(var p=0;p<s.parts.length;p++)s.parts[p]();delete d[s.id]}}}};var x=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},function(e,t,n){"use strict";$(function(){var e=n(6),t=n(10),i=GetQueryString("majorId");window.loading.appendTo($("body")),$.ajax({url:"http://api.zheyibu.com/api/search/MobileMajorJobs?major="+i+"&page=1",type:"GET",success:function(n){$("#loading").hide();var o=t.compile(e),a=o(n);document.getElementById("jobpage").innerHTML=a,$(".load-more").show();var r=2;new Waypoint({element:document.getElementById("jobpage"),handler:function(n){"down"===n&&$.ajax({url:"http://api.zheyibu.com/api/search/MobileMajorJobs?major="+i+"&page="+r,type:"GET",success:function(n){if(n.Results.length){var i=t.compile(e),o=i(n);$("#jobpage").append(o),r++,Waypoint.refreshAll()}else $("load-more").html("没有更多了...")}})},offset:"bottom-in-view"})},error:function(e){$("#loading").hide(),console.log(e)}}),$("#city").DoubleSelector({dataType:"city",titleName:"所在城市",callback:function(){}}),$("#jnature").SingleSelector({dataType:"defined",titleName:"工作性质",data:[{id:0,name:"不限"},{id:1,name:"全职"},{id:2,name:"实习"}],callback:function(){}}),$("#funcs").SingleSelector({dataType:"funcs",titleName:"职能类别",callback:function(){}}),$("#salary").SingleSelector({dataType:"salary",titleName:"薪资范围",callback:function(){}}),$("#overlay").on("touchmove",function(e){e.preventDefault()}),$(".backgo").click(function(){window.history.go(-1)})})},function(e,t,n){t=e.exports=n(1)(),t.push([e.id,".caption{position:fixed;width:100%;line-height:44px;font-size:17px;color:#333;background-color:#fff;text-align:center;border-bottom:1px solid #f2f2f2;z-index:3}.caption img{position:absolute;left:16px;top:12px}.filter{border-bottom:1px solid #f2f2f2;margin-top:44px;padding:8px 0}.filter .fill{display:-webkit-flex;display:flex}.filter .fill .fill-list{position:relative;-webkit-flex:1;flex:1;text-align:center;border-right:1px solid #f2f2f2;padding:0 6px}.filter .fill .fill-list:last-child{border-right:none}.filter .fill .fill-list:before{position:absolute;right:4px;top:6px;width:5px;height:5px;content:'';border-left:1px solid #797e7b;border-bottom:1px solid #797e7b;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.jobpage{overflow:hidden}.jobpage .joblist{position:relative;padding:20px 5%;font-size:17px;border-bottom:1px solid #f2f2f2}.jobpage .joblist .intro{line-height:1}.jobpage .joblist .intro .salary{margin-left:10px;max-width:108px}.jobpage .joblist .company{padding:12px 0;line-height:1;font-size:14px;color:#999}.jobpage .joblist .company .companyName{max-width:-webkit-calc(100% - 30px);max-width:-moz-calc(100% - 30px);max-width:calc(100% - 30px);margin-right:12px}.jobpage .joblist .sub{line-height:1;font-size:14px;color:#999}.jobpage .joblist .position-mark{position:absolute;left:0;top:0;width:100%;height:100%}.load-more{display:none;text-align:center;line-height:2;color:#999}.gotop{position:fixed;right:5%;bottom:5%;opacity:.8}",""])},function(e,t,n){t=e.exports=n(1)(),t.push([e.id,'html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0;font-size:14px;font-family:Microsoft YaHei,Lucida Grande,Arial,Lucida,Verdana,Helvetica,sans-serif;color:#2d2d2d}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block;vertical-align:baseline}audio:not([controls]){display:none;height:0}[;idden],template{display:none}a{background-color:transparent}a:active,a:hover,a:visited{outline:0;text-decoration:none;color:inherit}abbr[title]{border-bottom:1px dotted}b,strong{font-weight:700}dfn{font-style:italic}h1{font-size:2em;margin:.67em 0}mark{background:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}img{border:0}svg:not(:root){overflow:hidden}figure{margin:1em 40px}hr{-moz-box-sizing:content-box;box-sizing:content-box;height:0}pre{overflow:auto}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}button,input,optgroup,select,textarea{color:inherit;font:inherit;margin:0}button{overflow:visible}button,select{text-transform:none}button,html input[type=button],input[type=reset],input[type=submit]{-webkit-appearance:button;cursor:pointer}button[disabled],html input[disabled]{cursor:default}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}input{line-height:normal;padding:0;border:none}input[type=checkbox],input[type=radio]{box-sizing:border-box;padding:0}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{height:auto}input[type=search]{-webkit-appearance:textfield;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box}input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration{-webkit-appearance:none}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{border:0;padding:0}textarea{overflow:auto}optgroup{font-weight:700}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}.cf:after,.cf:before{content:" ";display:table}.cf:after{clear:both}.cf{*zoom:1}ul{margin:0;padding:0}ul li{list-style:none}p{margin:0;padding:0}*{-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-tap-highlight-color:transparent}input:focus{outline:none}.dN{display:none}.fl{float:left}.fr{float:right}.ellipsis{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.f90{color:#f90}body::-webkit-scrollbar,html::-webkit-scrollbar{display:none}#loading{position:fixed;width:100%;height:100%;top:0;left:0;z-index:100}.l-layer{margin-top:-40px;margin-left:-40px;width:80px;height:80px;background:rgba(0,0,0,.3);border-radius:5px}.l-layer,.spinner{position:absolute;top:50%;left:50%}.spinner{margin-top:-20px;margin-left:-20px;width:40px;height:40px}.container1>div,.container2>div,.container3>div{width:10px;height:10px;background-color:#33ffa1;border-radius:100%;position:absolute;-webkit-animation:bouncedelay 1.2s infinite ease-in-out;animation:bouncedelay 1.2s infinite ease-in-out;-webkit-animation-fill-mode:both;animation-fill-mode:both}.spinner .spinner-container{position:absolute;width:100%;height:100%}.container2{-webkit-transform:rotate(45deg);transform:rotate(45deg)}.container3{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.circle1{top:0;left:0}.circle2{top:0;right:0}.circle3{right:0;bottom:0}.circle4{left:0;bottom:0}.container2 .circle1{-webkit-animation-delay:-1.1s;animation-delay:-1.1s}.container3 .circle1{-webkit-animation-delay:-1s;animation-delay:-1s}.container1 .circle2{-webkit-animation-delay:-.9s;animation-delay:-.9s}.container2 .circle2{-webkit-animation-delay:-.8s;animation-delay:-.8s}.container3 .circle2{-webkit-animation-delay:-.7s;animation-delay:-.7s}.container1 .circle3{-webkit-animation-delay:-.6s;animation-delay:-.6s}.container2 .circle3{-webkit-animation-delay:-.5s;animation-delay:-.5s}.container3 .circle3{-webkit-animation-delay:-.4s;animation-delay:-.4s}.container1 .circle4{-webkit-animation-delay:-.3s;animation-delay:-.3s}.container2 .circle4{-webkit-animation-delay:-.2s;animation-delay:-.2s}.container3 .circle4{-webkit-animation-delay:-.1s;animation-delay:-.1s}@-webkit-keyframes bouncedelay{0%,80%,to{-webkit-transform:scale(0);transform:scale(0)}40%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes bouncedelay{0%,80%,to{transform:scale(0);-webkit-transform:scale(0)}40%{transform:scale(1);-webkit-transform:scale(1)}}',""])},function(e,t,n){e.exports='{{each Results}} <li class="joblist cf"> <section class=intro> <span class="fr f90 ellipsis salary">{{$value.SalaryName}}</span> <p class="name ellipsis">{{$value.Position}}</p> </section> <section class="company cf"> <p class="fl ellipsis companyName">{{$value.EtpName}}</p> {{if EtpCertificationStatus === 3}} <img src='+n(9)+' class=fl alt="" width=14 height=14> {{/if}} </section> <section class=sub> <span class="fl time">{{$value.DeployTimeName}}</span> <span class="fr address">{{$value.CityName}}</span> </section> <a href="/zheyibu/job/jobDetails.html?jobId={{$value.PositionId}}" class=position-mark></a> </li> {{/each}} '},function(e,t,n){var i=n(4);"string"==typeof i&&(i=[[e.id,i,""]]),n(2)(i,{}),i.locals&&(e.exports=i.locals)},function(e,t,n){var i=n(5);"string"==typeof i&&(i=[[e.id,i,""]]),n(2)(i,{}),i.locals&&(e.exports=i.locals)},function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkVEN0ZDRTY1RDg5OTExRTY4OEJEQTNEQkY5REIwNTZCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkVEN0ZDRTY2RDg5OTExRTY4OEJEQTNEQkY5REIwNTZCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RUQ3RkNFNjNEODk5MTFFNjg4QkRBM0RCRjlEQjA1NkIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RUQ3RkNFNjREODk5MTFFNjg4QkRBM0RCRjlEQjA1NkIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4as+S3AAACOElEQVR42mIMOpjBQEvAxEBjMPQtYIGzLAT1tPnVsSq6+vHmifeXMMX9JZ1F2IUwxec+WI3FAnEOUS85J6wWvLn9Dqu4Br+KmZgBmuD7nx+RLWBETkUCLLz2omZxqiFwkW2P9iGrxgRALVXaWcr8CkD2lXc3Vj3cevXzHZxx8OHP543P9x58dhwuws3CiT+IgVqEOASBjB9/fvTfmIdmOvZI3vBkF5ytJ6yF3wJtXhVBdn4gY9+zY0DLiEpFj368ePb1JYQN1Aw0Ao8FPtLOEMbuF4dJSKZ7niFUO4tb4YkAPSENIOPUqwtAZ5FgwcHXp+BsczFDXBYAUwQHCwdI/cvjpGU0YGgCkwSEDTTCWdQSqzJrMRNIusSaSwjk5EMvEZ4wEdbDVCDHIQFJnZsf7SanqNj7+jgw5UHTkpAGMLjRFATIuEFSJ3J4klYWnXx1Hh5KwOBGk4XEzaV3N7CmTqIs2PvyGJxtJKyDVgpBonf5g43kl6bAbAnPEDpCGsBAR7Pv7scHuFInscX18Vdn4GwbURN49OqAk/9RJFkyLTjyGmGEpRjUAlcJW0jqBBZclFoADAF4hpDiFoeEkqW4MchzL89Sp0Y79/YKctIEZjpI6Yar8CHZAmA4IDKEsBYk0+EpfMipky/BQgnodkgVhqfwIceCLU/3olWKeAofciwAZgigoXAu/sKHzGYLPM0QLHzItACeZggWPjjbRQQzxLTri77++Xrj830yG14EAbAAH5FtU4AAAwBUj+tH6vmuBgAAAABJRU5ErkJggg=="},function(e,t,n){var i;/*!art-template - Template Engine | http://aui.github.com/artTemplate/*/
!function(){function o(e){return e.replace(j,"").replace(A,",").replace($,"").replace(E,"").replace(R,"").split(I)}function a(e){return"'"+e.replace(/('|\\)/g,"\\$1").replace(/\r/g,"\\r").replace(/\n/g,"\\n")+"'"}function r(e,t){function n(e){return u+=e.split(/\n/).length-1,p&&(e=e.replace(/\s+/g," ").replace(/<!--[\w\W]*?-->/g,"")),e&&(e=m[1]+a(e)+m[2]+"\n"),e}function i(e){var n=u;if(c?e=c(e,t):r&&(e=e.replace(/\n/g,function(){return u++,"$line="+u+";"})),0===e.indexOf("=")){var i=f&&!/^=[=#]/.test(e);if(e=e.replace(/^=[=#]?|[\s;]*$/g,""),i){var a=e.replace(/\s*\([^\)]+\)/,"");h[a]||/^(include|print)$/.test(a)||(e="$escape("+e+")")}else e="$string("+e+")";e=m[1]+e+m[2]}return r&&(e="$line="+n+";"+e),w(o(e),function(e){if(e&&!d[e]){var t;t="print"===e?v:"include"===e?x:h[e]?"$utils."+e:y[e]?"$helpers."+e:"$data."+e,k+=e+"="+t+",",d[e]=!0}}),e+"\n"}var r=t.debug,l=t.openTag,s=t.closeTag,c=t.parser,p=t.compress,f=t.escape,u=1,d={$data:1,$filename:1,$utils:1,$helpers:1,$out:1,$line:1},b="".trim,m=b?["$out='';","$out+=",";","$out"]:["$out=[];","$out.push(",");","$out.join('')"],g=b?"$out+=text;return $out;":"$out.push(text);",v="function(){var text=''.concat.apply('',arguments);"+g+"}",x="function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);"+g+"}",k="'use strict';var $utils=this,$helpers=$utils.$helpers,"+(r?"$line=0,":""),j=m[0],A="return new String("+m[3]+");";w(e.split(l),function(e){e=e.split(s);var t=e[0],o=e[1];1===e.length?j+=n(t):(j+=i(t),o&&(j+=n(o)))});var $=k+j+A;r&&($="try{"+$+"}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:"+a(e)+".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");try{var E=new Function("$data","$filename",$);return E.prototype=h,E}catch(e){throw e.temp="function anonymous($data,$filename) {"+$+"}",e}}var l=function(e,t){return"string"==typeof t?x(t,{filename:e}):p(e,t)};l.version="3.0.0",l.config=function(e,t){s[e]=t};var s=l.defaults={openTag:"<%",closeTag:"%>",escape:!0,cache:!0,compress:!1,parser:null},c=l.cache={};l.render=function(e,t){return x(e,t)};var p=l.renderFile=function(e,t){var n=l.get(e)||v({filename:e,name:"Render Error",message:"Template not found"});return t?n(t):n};l.get=function(e){var t;if(c[e])t=c[e];else if("object"==typeof document){var n=document.getElementById(e);if(n){var i=(n.value||n.innerHTML).replace(/^\s*|\s*$/g,"");t=x(i,{filename:e})}}return t};var f=function(e,t){return"string"!=typeof e&&(t=typeof e,"number"===t?e+="":e="function"===t?f(e.call(e)):""),e},u={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},d=function(e){return u[e]},b=function(e){return f(e).replace(/&(?![\w#]+;)|[<>"']/g,d)},m=Array.isArray||function(e){return"[object Array]"==={}.toString.call(e)},g=function(e,t){var n,i;if(m(e))for(n=0,i=e.length;i>n;n++)t.call(e,e[n],n,e);else for(n in e)t.call(e,e[n],n)},h=l.utils={$helpers:{},$include:p,$string:f,$escape:b,$each:g};l.helper=function(e,t){y[e]=t};var y=l.helpers=h.$helpers;l.onerror=function(e){var t="Template Error\n\n";for(var n in e)t+="<"+n+">\n"+e[n]+"\n\n";"object"==typeof console&&console.error(t)};var v=function(e){return l.onerror(e),function(){return"{Template Error}"}},x=l.compile=function(e,t){function n(n){try{return new a(n,o)+""}catch(i){return t.debug?v(i)():(t.debug=!0,x(e,t)(n))}}t=t||{};for(var i in s)void 0===t[i]&&(t[i]=s[i]);var o=t.filename;try{var a=r(e,t)}catch(e){return e.filename=o||"anonymous",e.name="Syntax Error",v(e)}return n.prototype=a.prototype,n.toString=function(){return a.toString()},o&&t.cache&&(c[o]=n),n},w=h.$each,k="break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",j=/\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,A=/[^\w$]+/g,$=new RegExp(["\\b"+k.replace(/,/g,"\\b|\\b")+"\\b"].join("|"),"g"),E=/^\d[^,]*|,\d[^,]*/g,R=/^,+|,+$/g,I=/^$|,+/;s.openTag="{{",s.closeTag="}}";var T=function(e,t){var n=t.split(":"),i=n.shift(),o=n.join(":")||"";return o&&(o=", "+o),"$helpers."+i+"("+e+o+")"};s.parser=function(e){e=e.replace(/^\s/,"");var t=e.split(" "),n=t.shift(),i=t.join(" ");switch(n){case"if":e="if("+i+"){";break;case"else":t="if"===t.shift()?" if("+t.join(" ")+")":"",e="}else"+t+"{";break;case"/if":e="}";break;case"each":var o=t[0]||"$data",a=t[1]||"as",r=t[2]||"$value",s=t[3]||"$index",c=r+","+s;"as"!==a&&(o="[]"),e="$each("+o+",function("+c+"){";break;case"/each":e="});";break;case"echo":e="print("+i+");";break;case"print":case"include":e=n+"("+t.join(",")+");";break;default:if(/^\s*\|\s*[\w\$]/.test(i)){var p=!0;0===e.indexOf("#")&&(e=e.substr(1),p=!1);for(var f=0,u=e.split("|"),d=u.length,b=u[f++];d>f;f++)b=T(b,u[f]);e=(p?"=":"=#")+b}else e=l.helpers[n]?"=#"+n+"("+t.join(",")+");":"="+e}return e},i=function(){return l}.call(t,n,t,e),!(void 0!==i&&(e.exports=i))}()}]);