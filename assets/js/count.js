// Counting tasks
var count = function(list) {
  var pending = document.querySelector('#'+list);
  var tasks = pending.querySelectorAll('li').length;
  return tasks;
}

var displaycount = function() {
  document.querySelector('#pending-count').innerHTML   = count('pending');
  document.querySelector('#progress-count').innerHTML  = count('progress');
  document.querySelector('#completed-count').innerHTML = count('completed');
}

displaycount();