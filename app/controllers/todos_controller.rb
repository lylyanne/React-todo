class TodosController < ApplicationController

  def index
    @todos = Todo.all
    render json: @todos
  end

  def show
    @todo = Todo.find(params[:id])
    render json: @todo
  end

  def create
  end

  def destroy
  end

  def update
  end

  private

  def todos_params

  end

end
