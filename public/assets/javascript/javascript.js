// google maps marker 

var cities = [
  //tokyo
  {lat: 35.6895, lng: 139.6917},
  //fukoka
  {lat: 33.5904, lng: 130.4017},
  //bangkok
  {lat: 13.7563, lng: 100.5018},
  //seoul
  {lat: 37.5665, lng: 126.9780},
  //taipei
  {lat: 25.0330, lng: 121.5654},
  //hong kong 
  {lat: 22.3964, lng: 114.1095}, 
  //shanghai
  {lat: 31.2304, lng: 121.4737}, 
  //xiamen
  {lat: 24.4798, lng: 118.0894},
  //macau 
  {lat: 22.1987, lng: 113.5439}, 
  //phnom penh
  {lat: 11.5449, lng: 104.8922}, 
  //vientiane
  {lat: 17.9757, lng: 102.6331}, 
  //chiang mai
  {lat: 18.7061, lng: 98.9817},
  //kyoto
  {lat: 35.0116, lng: 135.7680}, 
  //osaka
  {lat: 34.6937, lng: 135.5022}, 
  //guam
  {lat: 13.4443, lng: 144.7937}, 
  //san francisco 
  {lat: 37.7749, lng: -122.4194}, 
  //las vegas 
  {lat: 36.1699, lng: -115.1398}, 
  //los angeles
  {lat: 34.0522, lng: -118.2437}, 
  //paris
  {lat: 48.8566, lng: 2.3522},
  //brussels
  {lat: 50.8503, lng: 4.3517},
  //amsterdam
  {lat: 52.3702, lng: 4.8952}   
];

var markers = [];
var map;
  

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: {lat: 25.0330, lng: 121.5654}
  });
}

// drop marker individually

function drop() {
  clearMarkers();
  for (var i = 0; i < cities.length; i++) {
    addMarkerWithTimeout(cities[i], i * 200);
  }
}

function addMarkerWithTimeout(position, timeout) {
  window.setTimeout(function() {
    markers.push(new google.maps.Marker({
      position: position,
      map: map,
      icon: "../assets/images/marker.png",
      animation: google.maps.Animation.DROP
    }));
  }, timeout);
}

function clearMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

// drop marker on scroll to map 

$(window).on('scroll',function() {
   var hT = $('#map').offset().top,
       hH = $('#map').outerHeight(),
       wH = $(window).height(),
       wS = $(this).scrollTop();
    if (wS > (hT+hH-wH) && (hT > wS) && (wS+wH > hT+hH)) {
      drop(); 
      $(window).off('scroll');
    }
    else {
      return; 
    }
});

// switch between navbar menu and drop down menu 

var showLogo = true; 


$('#dd-menu').on('click', function() {
    $('#pop-up').show();
    $('#exit-btn').show(); 
    $(this).hide();
    $('#main-logo').hide(); 
    showLogo = false; 
}); 

$('#exit-btn').on('click', function() {
    $('#pop-up').hide();
    $('#dd-menu').show(); 
    $(this).hide();
    $('#main-logo').show(); 
    showLogo = true; 
}); 


$(window).resize(function() {
  if ($(window).width() > 992) {
    $('#main-logo').show()
  } else if ($(window).width() <= 992 && showLogo === false) {
    $('#main-logo').hide()
  } 
});

// scroll to section 


$(".home-btn").click(function() {
    $('html,body').animate({
        scrollTop: $("#home-page").offset().top},
        'slow');
});

$(".about-btn").click(function() {
    $('html,body').animate({
        scrollTop: $("#about-page").offset().top},
        'slow');
});

$(".portfolio-btn").click(function() {
    $('html,body').animate({
        scrollTop: $("#portfolio-page").offset().top},
        'slow');
});

$(".gallery-btn").click(function() {
    $('html,body').animate({
        scrollTop: $("#gallery-page").offset().top},
        'slow');
});

$(".contact-btn").click(function() {
    $('html,body').animate({
        scrollTop: $("#contact-page").offset().top},
        'slow');
});

// apply active attr on the first carousel slide 

$(document).ready(function () {
  $('#myCarousel').find('.item').first().addClass('active');
   $('.equal').matchHeight();
});


