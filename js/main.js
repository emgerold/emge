var emge = {
    scrollPositions:[],
    currentScrollPosition: [0,0,0,0],
    containers: null
}
$(window).load(function(){
  emge.scrollPositions = getScrollPositions('[data-link="e1"]');
  console.log('possible scrolls', emge.scrollPositions);
})
$(document).ready(function(){
  emge.containers = $('.square-container');

  // reset all containers
  //emge.containers.each(function(){setScrollPosition(0, $(this))});

  // scroll to raondom position on each
  emge.containers.each(function(){
    var pos = randomIntFromInterval(0,3);
    setScrollPosition(emge.scrollPositions[pos], $(this));
  });

  $('body').one('click', function(){
      // set random start position
      emge.containers.each(function(idc){
        var pos = randomIntFromInterval(0,3);
        pos = emge.scrollPositions[pos];
        setScrollPosition(pos, $(this));
      });

      $('label').last().click();
  });

  $('input[name="mode"]').on('change', function(){
    var mode = $(this).val();
    console.log('Usabulity mode', mode);
    $('body').removeClass().addClass(mode);
    emge.containers.on('click.containerModus', function(){
      definePositioning(mode, $(this));
    });
  })

});

function setScrollPosition(position, $el) {
  var lowerBound = 0,
      upperBound = 700,
      scroll = 0,
      index = $el.attr('data-index');

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
    case 'usability-bad':
      var index = $el.attr('data-index');
      var scroll = Math.ceil(emge.scrollPositions[randomIntFromInterval(0,3)]);

      if (scroll === emge.currentScrollPosition[index]) {
        $el.click();
        return;
      };

      emge.currentScrollPosition[index] = scroll;
      setScrollPosition(scroll, $el);

    break;

  }

  if (ArrayOfTheSame(emge.currentScrollPosition)) {
    //showResult(mode);
    console.log('SOLVED');
  }
}

function showResult(mode){
  $('body').addClass('solved ' + mode);
  emge.containers.off('click.containerModus');
}

function randomIntFromInterval(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}
function ArrayOfTheSame(array) {
  if(!array.length) return true;
  // I also made sure it works with [false, false] array
  return array.reduce(function(a, b){return (a === b)?a:("false"+b);}) === array[0];
}