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
}

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

  // Reset Form
  inputs[0].value = "";

}

//Send form if they hit enter.
document.onkeypress = enter;
function enter(e){
  if (e.which == 13){
    addItem();
    console.log("Enter pressionado Enviado!")
  }
}


