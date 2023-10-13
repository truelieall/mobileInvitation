;(function () {
	'use strict';
	// iPad and iPod detection
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) ||
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};

	// Carousel Feature Slide
	var carouselLoad = function(){
		var owl = $('.owl-carousel');
		owl.owlCarousel({
			animateOut: 'fadeOut',
			items: 1,
			loop: false,
			margin: 10,
			nav: false,
			dots: true,
			smartSpeed: 800,
			autoHeight: true
		});
	};

	// Parallax
	var parallax = function() {
		if ( !isiPad() || !isiPhone() ) {
			$(window).stellar();
		}
	};

	  // Set the d-day
		var countDownDate = new Date("November 18, 2023 13:00:00").getTime();
		var x = setInterval(function() {

		var now = new Date().getTime();

		var distance = countDownDate - now;

		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);

		document.getElementById("days").innerHTML = days +" <small>days</small>";
		document.getElementById("hours").innerHTML = hours + " <small>hours</small> ";
		document.getElementById("minutes").innerHTML = minutes + " <small>minutes</small> ";
		document.getElementById("seconds").innerHTML = seconds + " <small>seconds</small> ";
	}, 1000);

  // MagnificPopup
	var magnifPopup = function() {
		$('.image-popup').magnificPopup({
			type: 'image',
			removalDelay: 300,
			mainClass: 'mfp-with-zoom',
			gallery:{
				enabled:true
			},
			zoom: {
				enabled: true, // By default it's false, so don't forget to enable it

				duration: 300, // duration of the effect, in milliseconds
				easing: 'ease-in-out', // CSS transition easing function

				opener: function(openerElement) {
          return openerElement.is('img') ? openerElement : openerElement.find('img');
				}
			}
		});
	};

  var naverMapRefresh = function () {
    if (map) {
      var jongKakLatLng = new naver.maps.LatLng(37.570484, 126.982860);
      map.setZoom(17, true);
      map.panTo(jongKakLatLng);
    }

  }

  var map;

  var naverMapLoad = function () {
      const jongKakLatLng = new naver.maps.LatLng(37.570484, 126.982860);
      const scBankLatLng = new naver.maps.LatLng(37.571044, 126.982360);
      const mapOptions = {
        center: jongKakLatLng,
        zoom: 17
      };
      map = new naver.maps.Map('wedding_map', mapOptions);

      const markerOptions = {
        position: scBankLatLng,
        map: map,
        title: "SC제일은행 본점"
      };

      const marker = new naver.maps.Marker(markerOptions);

      naver.maps.Event.addListener(marker, 'click', function (e) {
        let url = 'https://naver.me/I5F5reWK';
        window.open(url);
      });


      // 지도에 이벤트 리스너 추가
      // 지도에 터치를 시작하면 스크롤을 금지합니다.
      // 지도에서 터치를 끝내면 다시 스크롤을 허용합니다.
      naver.maps.Event.addDOMListener(map.getElement(), 'touchstart', function() {
          fullpage_api.setAllowScrolling(false);
      });

      naver.maps.Event.addDOMListener(map.getElement(), 'touchend', function() {
          setTimeout(function () {fullpage_api.setAllowScrolling(true);}, 200);
      });

      naver.maps.Event.addDOMListener(map.getElement(), 'pinchstart', function() {
          fullpage_api.setAllowScrolling(false);
      });

      naver.maps.Event.addDOMListener(map.getElement(), 'pinchend', function() {
          setTimeout(function () {fullpage_api.setAllowScrolling(true);}, 500);
      });
  };

  // fullpage
	var fullPageLoad = function() {
    $('#fullpage').fullpage({
      //options here
      licenseKey: 'YOUR_KEY_HERE',
//        licenseKey: 'gplv3-license',
      autoScrolling: true,
      scrollHorizontally: true,
      slidesNavigation: true,
      slidesNavPosition: 'bottom',
      navigation: true,
      navigationPosition: 'right',
      anchors: ['section1', 'section2', 'section3', 'section4', 'section5'],
      afterLoad: function(origin, destination, direction){
          if(destination.anchor === 'section4'){
              // Your custom script for when the third section is entered
              //naverMapLoad();
              naverMapRefresh();
          }
      }
    });
	};

  var clipboardSet = function () {
    var clipboardJS = new ClipboardJS('#btnJS');
    clipboardJS.on('success', function (e) {alert('[김종성] 계좌가 복사됐습니다.');});
    clipboardJS.on('error', function (e) {alert('[김종성] 계좌 복사 실패');});

    var clipboardSJ = new ClipboardJS('#btnSJ');
    clipboardSJ.on('success', function (e) {alert('(혼주)[홍숙자] 계좌가 복사됐습니다.');});
    clipboardSJ.on('error', function (e) {alert('(혼주)[홍숙자] 계좌 복사 실패');});

    var clipboardHY = new ClipboardJS('#btnHY');
    clipboardHY.on('success', function (e) {alert('[안희영] 계좌가 복사됐습니다.');});
    clipboardHY.on('error', function (e) {alert('[안희영] 계좌 복사 실패');});

    var clipboardEJ = new ClipboardJS('#btnEJ');
    clipboardEJ.on('success', function (e) {alert('(혼주)[이은자] 계좌가 복사됐습니다.');});
    clipboardEJ.on('error', function (e) {alert('(혼주)[이은자] 계좌 복사 실패');});
  }

	// Document on load.
	$(function(){
		parallax();
		fullPageLoad();
    magnifPopup();
    clipboardSet();
    setTimeout(carouselLoad, 500);
    setTimeout(naverMapLoad, 1000);
	});
}());

