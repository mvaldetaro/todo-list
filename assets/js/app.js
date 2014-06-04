var defaults = {
  // CSS selectors and attributes that would be used by the JavaScript functions
  todoTask: "task-item",
  todoTitle: "task-title",
  todoDate: "task-date",
  todoDescription: "task-description",
  taskId: "",
  formId: "todo-form",
  dataAttribute: "data",
  deleteArea: "delete-area"
}, codes = {
  "1" : "#pending", // For pending tasks
  "2" : "#progress",
  "3" : "#completed"
};

var data = JSON.parse(localStorage.getItem("todoData"));

data = data || {};

// Init App
var init = function (options) {

  //Load Local Storage
  options = options || {};
  options = $.extend({}, defaults, options);

  $.each(data, function (index, params) {
      generateTask(params);
  });

  // Adding drop function to each category of task
  $.each(codes, function(index, value) {
    $(value).droppable({
      drop: function(event, ui) {
        var element = ui.helper,
            css_id = element.attr("id"),
            id = css_id.replace(options.taskId, ""),
            object = data[id];

        // Removing old element
        removeTask(object);

        // Changing object code
        object.code = index;

        // Generating new element
        generateTask(object);

        // Updating Local Storage
        data[id] = object;
        localStorage.setItem("todoData", JSON.stringify(data));

        // Hiding Delete Area
        $("#" + defaults.deleteArea).hide();
      }
    });
  });

  // Adding drop function to delete task
  $("#" + options.deleteArea).droppable({
    drop: function(event, ui) {
      var element = ui.helper,
          css_id = element.attr("id"),
          id = css_id.replace(options.taskId, ""),
          object = data[id];

      // Removing old element
      removeTask(object);

      // Updating local storage
      delete data[id];
      localStorage.setItem("todoData", JSON.stringify(data));

      // Hiding Delete Area
      $("#" + defaults.deleteArea).hide();
      $("body").css('cursor','pointer');
    }
  });
}


// Add Task

var generateTask = function(params){
  var parent = $(codes[params.code]),
      wrapper;

  if(!parent) {
    return;
  }

  wrapper = $("<li />", {
    "class" : defaults.todoTask,
    "id" : defaults.taskId + params.id,
    "data" : params.id,
  }).prependTo(parent);

  $("<div />", {
    "class" : defaults.todoTitle,
    "text": params.title
  }).appendTo(wrapper);

  wrapper.draggable({
    start: function() {
      $("#" + defaults.deleteArea).fadeIn(160);
      $('body').css("cursor","move");
    },
    stop: function() {
      $("#" + defaults.deleteArea).fadeOut(160);
      $('body').css("cursor","pointer");
    },
    revert: "invalid",
    revertDuration : 160,
    cursorAt: {
      top: 17,
      left: 183
    }
  });
  displaycount();
}

//Remove Task
var removeTask = function(params) {
  $("#" + defaults.taskId + params.id).remove();
  displaycount();
};

// Submit

var addItem = function() {
  var inputs = $("#" + defaults.formId + " :input"),
    errorMessage = "Title can not empty",
    id, title, tempData;
  if (inputs.length !== 2) {
    return;
  }

  title = inputs[0].value;

  if (!title) {
    generateDialog(errorMessage);
    return;
  };

  id = new Date().getTime();

  tempData = {
    id: id,
    code: "1",
    title: title
  };

  // Saving element in local storage
  data[id] = tempData;
  localStorage.setItem("todoData", JSON.stringify(data));

  // Generate Todo Element
  generateTask(tempData);

  // Reset Form
  inputs[0].value = "";

}

//Send form if they hit enter.
document.onkeypress = enter;
function enter(e){
  if (e.which == 13){
    addItem();
    event.preventDefault();
  }
}

init();




