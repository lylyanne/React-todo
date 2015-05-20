(function() {
  window.Todo = function(callback) {
    this.changed = callback;
    this._todos = [];
  }

  Todo.prototype = {
    all: function() {
      //we slice so we won't accidentally mutate original array
      return this._todos.slice();
    },
    findIndex: function(id){
      var index = -1;
      this._todos.forEach(function(todo, idx) {
        if (todo.id === id) {
          index = idx;
          return;
        };
      })
      return index;
    },
    fetch: function() {
      var that = this;
      $.getJSON("/api/todos/", function(data) {
        that._todos = data;
        that.changed();
      });
    },
    create: function(obj) {
      var that = this;
      $.ajax({
        type: "POST",
        url: "/api/todos",
        data: obj,
        success: function(data) {
            that._todos.push(data)
            that.changed();
        },
      });
    },
    destroy: function(id) {
      var that = this;
      $.ajax({
        type: "DELETE",
        url: "/api/todos/" + id,
        success: function() {
          var targetIdx = that.findIndex(id);
          that._todos.splice(targetIdx, 1);
          that.changed();
        },
      });
    },
    toggleDone: function(id) {
      var that = this;
      var todo = this._todos[this.findIndex(id)];
      todo.done = !todo.done;

      $.ajax({
        type: "PATCH",
        url: "/api/todos/" + id,
        data: {"todo":todo} ,
        success: function(obj) {
          that.changed();
        },
      });
    }
  }
})();
