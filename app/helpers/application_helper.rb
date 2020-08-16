module ApplicationHelper

  require 'nokogiri'
  require 'open-uri'
  # def channel_data
  
  #   array = []

  #   Youtuber.all.each do |youtuber|
  #     array << youtuber.channel_id
  #     #youtuberテーブルのレコードを１件ずつ取り出し、channel_idカラムのデータを配列に入れる
  #   end

  #   subscriber_sum = []
  
  #   array.each do |url|
  #     channel_id = "https://www.youtube.com/channel/#{url}/about"
  #     doc = Nokogiri::HTML(open(channel_id), nil, "UTF-8")
  #     subscriber = doc.css(".yt-subscription-button-subscriber-count-branded-horizontal").text
  
  #     subscriber_sum << subscriber
  #   end
  
  #   num = subscriber_sum.map {|sub|
  
  #   if sub.include?("万")
  #     sub.gsub(/([\d\.]+)万(\d+)?/)  { $1.to_f * 10000 + $2.to_f }
  #   elsif sub.include?("千")
  #     sub..gsub(/([\d\.]+)?千(\d+)?/) { ($1 || 1).to_f * 1000 + $2.to_f }
  #   end
  #   }

  #   subscriber_num = num.map(&:to_i)
  #   @subscriber_num = subscriber_num.sort.reverse.first(5)

  # end
end
