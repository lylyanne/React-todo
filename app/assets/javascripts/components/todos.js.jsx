var TodoListItem = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    body: React.PropTypes.string,
    done: React.PropTypes.bool
  },
  getInitialState: function() {
    return {show: false }
  },
  deleteTodo: function (event) {
    event.preventDefault();
    var id = this.props.todo.id;
    this.props.todoList.destroy(id);
  },

  showDetail: function() {
    this.setState({show: true});
  },

  render: function() {
    var that = this;
    var detailView = "";

    if (this.state.show) {
      detailView = <TodoDetailView toggleTodo={this.props.todo} todo={this.props.todo} todoList={that.props.todoList}/>
    }

    return (
      <div>
        <div className="todo-text" onClick={this.showDetail}>Title: {this.props.todo.title} </div>
        <button onClick={this.deleteTodo}>Destroy</button>
        { detailView }
      </div>
    );
  }
});

var TodoDetailView = React.createClass({
    toggleTodo: function (event) {
      event.preventDefault();
      var id = this.props.todo.id;
      this.props.todoList.toggleDone(id);
    },

  render: function() {
    return (
      <div>
        <div className="todo-text">Body: {this.props.todo.body}</div>
        <DoneButton completed={this.props.todo.done} toggleFunction={this.toggleTodo}/>
      </div>
    )
  }
});

var DoneButton = React.createClass({
  render: function () {
    var buttonText = this.props.completed ? "Undo" : "Done!" ;
    return (
      <button onClick={this.props.toggleFunction}>{buttonText}</button>
    )
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
        <label>Title
          <input type="text" onChange={this.handleTitleChange} value={this.state.title}/>
        </label>

        <label>Body
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
        <TodoForm todoList={this.props.todoList}/>
        {
          this.props.todoList.all().map(function(todo) {
            return <TodoListItem todo={todo} todoList={that.props.todoList} />
          })
        }

      </div>
    );
  }
});

$(function() {
  var globalRender = function() {
    React.render( <Todolist todoList={todosInstance} />, document.getElementById('main-content') );
  }
  var todosInstance = new Todo(globalRender);
  globalRender();
});
