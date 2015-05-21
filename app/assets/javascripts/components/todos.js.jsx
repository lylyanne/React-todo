var TodoListItem = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    body: React.PropTypes.string,
    done: React.PropTypes.bool
  },

  deleteTodo: function (event) {
    event.preventDefault();
    var id = this.props.todo.id;
    this.props.todoList.destroy(id);
  },

  render: function() {
    return (
      <div>
        <div>Title: {this.props.todo.title}</div>
        <div>Body: {this.props.todo.body}</div>
        <div>Done: {this.props.todo.done.toString()}</div>
        <button onClick={this.deleteTodo}>Destroy</button>
      </div>
    );
  }
});

var TodoForm = React.createClass({
  getInitialState: function () {
      return ({title: "", body: ""});
  },

  handleTitleChange: function(event){
    this.setState({title: event.target.value})
  },

  handleBodyChange: function(event){
    this.setState({body: event.target.value})
  },

  createNewTodo: function(event){
    event.preventDefault();
    var obj = { "todo": { "title" : this.state.title, "body": this.state.body, "done" : false} }
    this.props.todoList.create(obj);
  },

  render: function () {
    return (
      <form onSubmit={this.createNewTodo}>
        <label>ToDo Title
          <input type="text" onChange={this.handleTitleChange} value={this.state.title}/>
        </label>

        <label>ToDo Body
          <input type="text" onChange={this.handleBodyChange} value={this.state.body}/>
        </label>

        <input type="submit" />
      </form>
    )
  }
});

var Todolist = React.createClass({
  componentDidMount: function() {
    this.props.todoList.fetch();
  },

  render: function () {
    var that = this;
    return (
      <div>
        {
          this.props.todoList.all().map(function(todo) {
            return <TodoListItem todo={todo} todoList={that.props.todoList} />
          })
        }
        <TodoForm todoList={this.props.todoList}/>
      </div>
    );
  }
});



$(function() {
  var globalRender = function() {
    React.render( <Todolist todoList={todosInstance} />, document.getElementById('main-content') );
  }
  var todosInstance = new Todo( globalRender );
  globalRender();
});
