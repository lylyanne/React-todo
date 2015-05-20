(function() {
  window.Todo = function(callback) {
    this.changed = callback;
    this._todos = [];
  }

  Todo.prototype = {
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
    destroy: function(obj) {
      var that = this;
      $.ajax({
        type: "DELETE",
        url: "/api/todos/" + obj.id,
        data: obj,
        success: function() {
            var targetIdx;

            //find client side item
            that._todos.forEach(function(todo, idx) {
              if (todo.id === obj.id) {
                targetIdx = idx;
                return;
              };
            })

            that._todos.splice(targetIdx, 1);
            that.changed();
        },
      });
    }
  }
})();
