class Api::TodosController < ApplicationController

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
    @todo = Todo.new(todo_params)
    if @todo.save
      render json: @todo, :status => :created
    else
      render json: @todo.error.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @todo = Todo.find(params[:id])
    render json: @todo.destroy
  end

  def update
    @todo = Todo.find(params[:id])

    if @todo.update_attributes(todo_params)
      render json: @todo
    else
      render json: @todo.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def todo_params
    params.require(:todo).permit(:title, :body, :done)
  end

end
