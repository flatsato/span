function initialize() {
  var latlng = new google.maps.LatLng(35.728698,139.708977);
  var myOptions = {
    zoom: 16,
    center: latlng,
    streetViewControl: false,
    mapTypeControl: false,
    scrollwheel: false
  };
  var map = new google.maps.Map(document.getElementById('googlemap'), myOptions);
  
  /* 吹き出し */
  var content = '<div id="infoWindow">' +
    '<p class="title">株式会社センターモバイル</p><p class="text">東京都豊島区西池袋一丁目5番地3号</p>' +
    '</div>';
  var infowindow = new google.maps.InfoWindow({
    content: content
  });
  
  /* アイコン */
  var icon = new google.maps.MarkerImage('../company/images/mapicon.png',
    new google.maps.Size(61,75),
    new google.maps.Point(0,0),
    new google.maps.Point(27,62)
  );
  var iconOptions = {
    position: latlng,
    map: map,
    icon: icon,
    title: '株式会社センターモバイル',
		position:new google.maps.LatLng(35.727814, 139.708575),
  };
  var mapIcon = new google.maps.Marker(iconOptions);
  
  google.maps.event.addListener(mapIcon, 'click', function() {
    infowindow.open(map, mapIcon);
  });
}
google.maps.event.addDomListener(window, 'load', initialize);
