$(document).ready(function(){
  var $links = $('[data-link]');

  $('.wrapper').one('click', function(){
    $(this).removeClass('start-animation');

    $links.on('click', function(){
      $links.removeClass('active-content');
      $(this).addClass('active-content');
    });
  });
});