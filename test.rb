require 'nokogiri'
require 'open-uri'

def channel_data
  
  array = ["UC29ju8bIPH5as8OGnQzwJyA","UCJbPGzawDH1njbqV-D5HqKw","UC29ju8bIPH5as8OGnQzwJyA","UCZf__ehlCEBPop-_sldpBUQ"]
  subscriber_sum = []

  array.each do |url|
    channel_id = "https://www.youtube.com/channel/#{url}/about"
    doc = Nokogiri::HTML(open(channel_id), nil, "UTF-8")
    subscriber = doc.css(".yt-subscription-button-subscriber-count-branded-horizontal").text

    subscriber_sum << subscriber
  end

  subscriber_num = subscriber_sum.map {|sub|

  if sub.include?("万")
    sub.gsub(/([\d\.]+)万(\d+)?/)  { $1.to_f * 10000 + $2.to_f }
  end
  }

  num = subscriber_num.map(&:to_i)
  p num

  p num.sort.reverse.first(3)

end

channel_data