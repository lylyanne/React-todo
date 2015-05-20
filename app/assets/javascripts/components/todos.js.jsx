var Todos = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    body: React.PropTypes.string,
    done: React.PropTypes.bool
  },

  render: function() {
    return (
      <div>
        <div>Title: {this.props.title}</div>
        <div>Body: {this.props.body}</div>
        <div>Done: {this.props.done}</div>
      </div>
    );
  }
});

var Todolist = React.createClass({

  render: function () {
    this.props.todos.fetch();
    return (
      <ul>
        <li>RENDERED</li>
      </ul>
    );
  }
});
// $(document).ready(function(){})
$(function() {
  var todosInstance = new Todo( function () { console.log("Initialized"); }  )

  React.render( React.createElement(Todolist, {todos: todosInstance
  }), document.getElementById('main-content') );
});
