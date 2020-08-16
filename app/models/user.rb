class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable


  enum status: {cameraman:0, editor:1, null:2}

  enum gender: { male: 1, female: 2 , custom: 3}

end
