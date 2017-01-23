$(function() {
  $('#stringForm').submit(function(e,a,b,c) {
    e.preventDefault();

    var string = $('#string').val();
    var array = string.split(',');

    array = array.map(function(e){return e.trim();});

    var i = array.indexOf("Description");

    var j;

    while(i > 0) {
      oldI = i;

      array.splice(i, 1);

      array[i] = array[i].replace('Vertices', '').trim();

      array.splice(i + 9, 1);
      array.splice(i + 10, 1);
      array.splice(i + 11, 1);
      array.splice(i + 12, 1);
      array.splice(i + 13, 1);
      array.splice(i + 14, 1);
      array.splice(i + 15, 1);
      array.splice(i + 16, 1);

      var i = array.indexOf("Description");
    }

    i = oldI;

    array.splice(i + 17, 1);
    array.splice(i + 18, 1);
    array.splice(i + 19, 1);
    array.splice(i + 20, 1);
    array.splice(i + 21, 1);
    array.splice(i + 22, 1);

    array.splice(i + 27, 1);
    array.splice(i + 28, 1);
    array.splice(i + 29, 1);
    array.splice(i + 30, 1);
    array.splice(i + 31, 1);
    array.splice(i + 32, 1);
    array.splice(i + 33, 1);
    array.splice(i + 34, 1);
    array.splice(i + 35, 1);
    array.splice(i + 36, 1);
    array.splice(i + 37, 1);
    array.splice(i + 38, 1);
    array.splice(i + 39, 1);

    array.splice(i + 42, 1);

    array.splice(-1);

    var newString = array.join(', ');
    $('#string').val(newString);
  });
});
