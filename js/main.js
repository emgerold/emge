$(document).ready(function(){

  $('.square-container').each(function(){
    // setScrollPosition($(this));
  });
});

function setScrollPosition($el, min,max) {
  var lowerBound = min ? min : 0,
      upperBound = max ? max : 700,
      scroll = randomIntFromInterval(lowerBound, upperBound);
  $el.scrollTo(Math.floor(scroll));
}

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}