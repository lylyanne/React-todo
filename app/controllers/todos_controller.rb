class TodosController < ApplicationController

  skip_before_filter :verify_authenticity_token

  def index
    @todos = Todo.all
    render json: @todos
  end

  def show
    @todo = Todo.find(params[:id])
    render json: @todo
  end

  def create
    @todo = Todo.new(todos_params)
    if @todo.save
      render json: @todo
    else
      render json: @todo.error.full_messages
    end
  end

  def destroy
  end

  def update
  end

  private

  def todos_params
    params.require(:todo).permit(:title, :body, :done)
  end

end
