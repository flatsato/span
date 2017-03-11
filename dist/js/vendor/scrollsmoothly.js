// UTF-8
/**
 * scrollsmoothly.js
 * Copyright (c) 2008 KAZUMiX
 * http://d.hatena.ne.jp/KAZUMiX/20080418/scrollsmoothly
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * 更新履歴
 * 2009/02/12
 * スクロール先が画面左上にならない場合の挙動を修正
 * 2008/04/18
 * 公開
 *
*/
!function(){function init(){setOnClickHandler(),incomingHash&&(window.attachEvent&&!window.opera?setTimeout(function(){scrollTo(0,0),setScroll("#"+incomingHash)},50):(scrollTo(0,0),setScroll("#"+incomingHash)))}function addEvent(t,e,n){t.addEventListener?t.addEventListener(e,n,!1):window.attachEvent&&t.attachEvent("on"+e,function(){n.apply(t)})}function setOnClickHandler(){for(var t=d.links,e=0;e<t.length;e++){var n=t[e],o=n.href.split("#");currentHref_WOHash==o[0]&&d.getElementById(o[1])&&addEvent(n,"click",startScroll)}}function startScroll(t){t?t.preventDefault():window.event&&(window.event.returnValue=!1),setScroll(this.hash)}function setScroll(t){var e=d.getElementById(t.substr(1));if(e){for(var n=e,o=0,i=0;n;)o+=n.offsetLeft,i+=n.offsetTop,n=n.offsetParent;var l=getScrollMaxXY();targetX=Math.min(o,l.x),targetY=Math.min(i,l.y),targetHash=t,scrolling||(scrolling=!0,scroll())}}function scroll(){var t=d.documentElement.scrollLeft||d.body.scrollLeft,e=d.documentElement.scrollTop||d.body.scrollTop,n=(targetX-t)*easing,o=(targetY-e)*easing,i=t+n,l=e+o;return Math.abs(n)<1&&Math.abs(o)<1||prevX===t&&prevY===e?(scrollTo(targetX,targetY),scrolling=!1,location.hash=targetHash,void(prevX=prevY=null)):(scrollTo(parseInt(i),parseInt(l)),prevX=t,prevY=e,setTimeout(function(){scroll()},interval),void 0)}function getDocumentSize(){return{width:Math.max(document.body.scrollWidth,document.documentElement.scrollWidth),height:Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)}}function getWindowSize(){var result={};if(window.innerWidth){var box=d.createElement("div");with(box.style)position="absolute",top="0px",left="0px",width="100%",height="100%",margin="0px",padding="0px",border="none",visibility="hidden";d.body.appendChild(box);var width=box.offsetWidth,height=box.offsetHeight;d.body.removeChild(box),result={width:width,height:height}}else result={width:d.documentElement.clientWidth||d.body.clientWidth,height:d.documentElement.clientHeight||d.body.clientHeight};return result}function getScrollMaxXY(){if(window.scrollMaxX&&window.scrollMaxY)return{x:window.scrollMaxX,y:window.scrollMaxY};var t=getDocumentSize(),e=getWindowSize();return{x:t.width-e.width,y:t.height-e.height}}var easing=.25,interval=20,d=document,targetX=0,targetY=0,targetHash="",scrolling=!1,splitHref=location.href.split("#"),currentHref_WOHash=splitHref[0],incomingHash=splitHref[1],prevX=null,prevY=null;addEvent(window,"load",init)}();