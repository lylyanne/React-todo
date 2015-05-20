var TodoListItem = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    body: React.PropTypes.string,
    done: React.PropTypes.bool
  },

  render: function() {
    return (
      <div>
        <div>Title: {this.props.todo.title}</div>
        <div>Body: {this.props.todo.body}</div>
        <div>Done: {this.props.todo.done.toString()}</div>
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
        {
          this.props.todoList.all().map(function(todo) {
            return <TodoListItem todo={todo}/>
          })
        }
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
