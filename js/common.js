$(function(){

//ロールオーバー フェードあり

var targetImgs = $('img');

targetImgs.each(function()
{
	if(this.src.match('_off'))
	{

		this.rollOverImg = new Image();
		this.rollOverImg.src = this.getAttribute("src").replace("_off", "_on");
		$(this.rollOverImg).css({position: 'absolute', opacity: 0});
		$(this).before(this.rollOverImg);

		$(this.rollOverImg).mousedown(function(){
			$(this).stop().animate({opacity: 0}, {duration: 0, queue: false});
		});

		$(this.rollOverImg).hover(function(){
			$(this).animate({opacity: 1}, {duration: 400, queue: false});
		},
		function(){
			$(this).animate({opacity: 0}, {duration: 400, queue: false});
		});

	}
});

// ロールオーバー フェードなし
function smartRollover() {
	if(document.getElementsByTagName) {
		var images = document.getElementsByTagName("img");
		for(var i=0; i < images.length; i++) {
			if(images[i].getAttribute("src").match("_off."))
			{
				images[i].onmouseover = function() {
					this.setAttribute("src", this.getAttribute("src").replace("_off.", "_on."));
				}
				images[i].onmouseout = function() {
					this.setAttribute("src", this.getAttribute("src").replace("_on.", "_off."));
				}
			}
		}
	}
}
if(window.addEventListener) {
	window.addEventListener("load", smartRollover, false);
}
else if(window.attachEvent) {
	window.attachEvent("onload", smartRollover);
}

});

$(function(){
$('.worksDetailList li').matchHeight();
});
