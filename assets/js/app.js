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

generateTask({
  id: "123",
  code: "1",
  title: "Uma tarefa para teste"
});

console.log("Chegando aqui!");