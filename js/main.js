var emgeSettings = {
    scrollPositions:[],
    currentScrollPosition: [0,0,0,0],
    containers: null
}

$(document).ready(function(){
  emgeSettings.containers = $('.square-container');
  emgeSettings.scrollPositions = getScrollPositions('[data-link="e1"]');

  // reset all containers
  emgeSettings.containers.each(function(){setScrollPosition(0, $(this))});

  // scroll to a position
  emgeSettings.containers.on('click.containerModus', function(){
    definePositioning('DB', $(this));
  });

  // scroll to raondom position on each
  emgeSettings.containers.each(function(){
    setScrollPosition('random', $(this));
  });
  $('body').one('click', function(){
      emgeSettings.containers.each(function(){
        setScrollPosition(0, $(this));
      });

      $('label').last().click();
  })

});

function setScrollPosition(position, $el) {
  var lowerBound = 0,
      upperBound = 700,
      scroll = 0;

  if (position === 'random') {
    scroll = randomIntFromInterval(lowerBound, upperBound);
  } else {
    scroll = position;
  }

  $el.scrollTo(Math.floor(scroll));
}

function getScrollPositions(selector) {
  var scrollPositions = [];
  $(selector).each(function(){
    var offsetTop = $(this).offset().top - $(this).parent('.square-container').offset().top;
    scrollPositions.push(Math.ceil(offsetTop));
  });
  return scrollPositions;
}

function definePositioning(mode, $el) {

  switch(mode) {
    case 'DB':
      var index = $el.index();
      var scroll = Math.ceil(emgeSettings.scrollPositions[randomIntFromInterval(0,3)]);

      if (scroll === emgeSettings.currentScrollPosition[index]) {
        el.click();
        return;
      };

      setScrollPosition(scroll, $el);
      emgeSettings.currentScrollPosition[index] = scroll;
    break;

  }
  if (ArrayOfTheSame(emgeSettings.currentScrollPosition)) {
    showResult(mode);
  }
}

function showResult(mode){
  $('body').addClass('solved ' + mode);
  emgeSettings.containers.off('click.containerModus');
}

function randomIntFromInterval(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}
function ArrayOfTheSame(array) {
  if(!array.length) return true;
  // I also made sure it works with [false, false] array
  return array.reduce(function(a, b){return (a === b)?a:("false"+b);}) === array[0];
}