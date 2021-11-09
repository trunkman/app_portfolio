class DiariesController < ApplicationController

  def create
    @diary = current_user.diaries.build(diary_params)
    if @diary.save
      render json: { diary: @diary }, status: :ok
    else
      render status: :unprocessable_entity
    end
  end

  def update
    @diary = Diary.find(params[:id])
    if @diary.update(diary_params)
      render json: { diary: @diary }, status: :ok
    else
      render status: :unprocessable_entity
    end
  end

  def destroy
    if Diary.find(params[:id]).destroy
      render json: { message: '削除完了' },
             status: :no_content
    else
      render json: { message: '削除失敗' },
             status: :not_found
    end
  end

  # StrongParameter
  def diary_params
    params.require(:diary).permit(:sleeping_hours, :feeling, :start_time)
  end

end
