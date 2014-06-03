var defaults = {
  // CSS selectors and attributes that would be used by the JavaScript functions
  todoTask: "task-item",
  todoTitle: "task-title",
  todoDate: "task-date",
  todoDescription: "task-description",
  taskId: "task-",
  formId: "todo-form",
  dataAttribute: "data",
  deleteDiv: "delete-area"
}, codes = {
  "1" : "#pending", // For pending tasks
  "2" : "#progress",
  "3" : "#completed"
};

var data = JSON.parse(localStorage.getItem("todoData"));

data = data || {};

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
    "data" : params.id
  }).appendTo(parent);

  $("<div />", {
    "class" : defaults.todoTitle,
    "text": params.title
  }).appendTo(wrapper);

  wrapper.draggable({
    start: function() {
      $("." + defaults.deleteDiv).show();
    },
    stop: function() {
      $("." + defaults.deleteDiv).hide();
    }
  });

}

//Remove Task
var removeElement = function(params) {
  $("#" + defaults.taskId + params.id).remove();
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

  // Generate Todo Element
  generateTask(tempData);

  // Saving element in local storage
  data[id] = tempData;
  localStorage.setItem("todoData", JSON.stringify(data));

  // Reset Form
  inputs[0].value = "";

  console.log("Opa!");

}

//Send form if they hit enter.
document.onkeypress = enter;
function enter(e){
  if (e.which == 13){
    addItem();
    event.preventDefault();
  }
}

// Init App
var init = function (options) {

  $("." + defaults.deleteDiv).hide();

  //Load Local Storage
  options = options || {};
  options = $.extend({}, defaults, options);

  $.each(data, function (index, params) {
      generateTask(params);
  });

  //Drag and Drop
  $("." + defaults.todoTask).draggable({
    cursor: "move",
    cursorAt: {
      top: 17,
      left: 183
    }
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
        removeElement(object);

        // Changing object code
        object.code = index;

        // Generating new element
        generateTask(object);

        // Updating Local Storage
        data[id] = object;
        localStorage.setItem("todoData", JSON.stringify(data));

        // Hiding Delete Area
        $("#" + defaults.deleteDiv).hide();
      }
    });
  });
}

init();




