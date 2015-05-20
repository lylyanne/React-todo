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
  componentDidMount: function() {
    this.props.todoList.fetch();
  },

  render: function () {
    return (
      <div>
        <ul>
          {
            this.props.todoList.all().map(function(todo) {
              return <li>{todo.title}</li>
            })
          }
        </ul>
      </div>
    );
  }
});
// $(document).ready(function(){})
$(function() {
  var globalRender = function() {
    React.render( <Todolist todoList={todosInstance} />, document.getElementById('main-content') );
  }
  var todosInstance = new Todo( globalRender );
  globalRender();
});
