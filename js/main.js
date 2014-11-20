$(document).ready(function(){
  var $links = $('[data-link]'),
  		counter = 0;

  $('.wrapper').one('click', function(){
    $(this).removeClass('start-animation');

    $links.on('click', function(){
      $(this).toggleClass('active-content');
      if ($(this).hasClass('active-content')) counter++;
      else counter--;
      if (counter === 4) {
      	setTimeout(function(){
      		$('.wrapper').addClass('final-state');
      		$('[data-link="e1"], [data-link="e2"]').removeClass('active-content');
      		counter -= 2;
      	}, 1500);
      }

    });
  });
});