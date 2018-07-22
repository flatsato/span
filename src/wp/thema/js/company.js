//地図ひとつ、複数のテンプレ作りたい


(function($){
  // Company
  var $win = $(window), resizeTimer = false, company,
      device = (function(u){ return { Tablet: (u.indexOf("windows") != -1 && u.indexOf("touch") != -1) || u.indexOf("ipad") != -1 || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1) || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1) || u.indexOf("kindle") != -1 || u.indexOf("silk") != -1 || u.indexOf("playbook") != -1, Mobile: (u.indexOf("windows") != -1 && u.indexOf("phone") != -1) || u.indexOf("iphone") != -1 || u.indexOf("ipod") != -1 || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1) || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1) || u.indexOf("blackberry") != -1 } })(window.navigator.userAgent.toLowerCase());
      for (var d in device) if (device[d]) $("html").addClass("is" + d);
  
  var Company = function() {
    this.init();
  };
  
  Company.prototype.init = function() {
    this.map = [];
    this.latlng = [];
    
     var marker = {
      url: '/img/common/ico_marker.svg',
      scaledSize: new google.maps.Size(22, 38),
      size: new google.maps.Size(22, 38),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(11, 38)
    };
  
    this.$googleMap = $('.js-googleMap');
    this.mapLen = this.$googleMap.length;
    
    for (var i = 0; i < this.mapLen; i++) {
      var mapId = this.$googleMap.eq(i).attr('id');
      var lat = this.$googleMap.eq(i).data('lat');
      var lng = this.$googleMap.eq(i).data('lng');
      var zoom = this.$googleMap.eq(i).data('zoom');
      this.latlng[i] = { 'lat': lat, 'lng': lng };
      this.setMap(i, mapId, this.latlng[i], zoom, marker);
      //console.log(mapId, latlng, marker);
    }
  };
  
  Company.prototype.setMap = function(i, mapId, latlng, zoom, marker) {
    //console.log(i, mapId, latlng, marker);
    var myOptions = {
      zoom: zoom,
      center: latlng,
      scrollwheel: false,
      disableDefaultUI: true,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP
      },
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map[i] = new google.maps.Map(document.getElementById(mapId), myOptions);
    
    var lopanMarker = new google.maps.Marker({
      position: latlng,
      map: this.map[i],
      optimized: false,
      icon: marker
    });
    
    var styleOptions = [{ "stylers": [ { "saturation": -100 } ] }];
    var styledMapOptions = { name: 'mono' }
    var monoType = new google.maps.StyledMapType(styleOptions, styledMapOptions);
    
    this.map[i].mapTypes.set('mono', monoType);
    this.map[i].setMapTypeId('mono');
  };
  
  Company.prototype.onResize = function() {
    if (resizeTimer !== false) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(company.onResized, 200);
  };
  Company.prototype.onResized = function() {
    var self = company !== undefined ? company : this;
    for (var i = 0; i < self.mapLen; i++) {
      self.map[i].panTo(self.latlng[i]);
    }
  };
  
  // -------------------------------------------------- ウィンドウイベント
  function onLoad() { company = new Company(); }
  function onResize() { if (company !== undefined) company.onResize(); }
  $win.on({ 'load': onLoad, 'resize': onResize });
})(jQuery);

//# sourceMappingURL=maps/company.js.map
