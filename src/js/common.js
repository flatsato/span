$(function () {
  
  //matchHeight
  $('.js-matchHeight1').matchHeight();
  $('.js-matchHeight2').matchHeight();
  $('.js-matchHeight3').matchHeight();
  $('.js-matchHeight4').matchHeight();
  $('.js-matchHeight5').matchHeight();
});


$(function () {
  //SNSボタン
  var site_name = $('meta[property="og:site_name"]').attr('content');
  var site_title = $('meta[property="og:title"]').attr('content');
  var description = $('meta[property="og:description"]').attr('content');
  var snsText = encodeURIComponent(site_title);
  var snsLocation = encodeURIComponent(location.href);

  //twitter
  var twurl = 'http://twitter.com/share?url=' + snsLocation + '&text=' + snsText;
  $('.twitter a').attr('href', twurl);
  
  //facebook
  var fburl = 'http://www.facebook.com/sharer.php?u=' + snsLocation + '&t=' + snsText;
  $('.facebook a').attr('href', fburl);

  //line
  var lineurl = 'http://line.me/R/msg/text/?' + snsText + ' ' + snsLocation;
  $('.line a').attr('href', lineurl);
  });