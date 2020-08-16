class StaticPagesController < ApplicationController
  def home
    gon.client_access_key = ENV['CLIENT_ID']
  end
end
