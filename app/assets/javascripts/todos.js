(function() {
  window.Todo = function(callback) {
    this.changed = callback;
    this._todos = [];
  }

  Todo.prototype = {
    fetch: function() {
      var that = this;
      $.getJSON("/api/todos/", function(data) {
        debugger
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
            var idx = that._todos.indexOf(obj)
            that._todos.splice(idx, 1);
            that.changed();
        },
      });
    }
  }
})();

alert('hi')
