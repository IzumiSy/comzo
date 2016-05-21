# coding:utf-8

# python2
"""
{'address': '東京都新宿区西新宿3-20-2 3・4F',
'date': '16/5/23 (月)',
'name': 'シャルル・リシャール＝アムラン',
'num_of_people': '1,632人',
'start': '19:00',
'venue': '東京オペラシティ (東京)'}

なサンプルデータを、
{'address': '東京都新宿区西新宿3-20-2 3・4F',
'date': '2016-5-23',
'name': 'シャルル・リシャール＝アムラン',
'num_of_people': 1,632,
'start': '19:00',
'venue': '東京オペラシティ'
"longitude":,
 "latitude":,
 "full: "
}

* 日付のパース
* 人数をintに
* venueの東京を消す
"""

import urllib
from xml.etree.ElementTree import parse

def modify_adr2geo(adr_str):
    api = "http://www.geocoding.jp/api/?v=1.1&q=%s" % (urllib.quote(adr_str.encode('utf-8')))
    xml = parse(urllib.urlopen(api)).getroot()

    lat = xml.find('coordinate/lat').text
    lng = xml.find('coordinate/lng').text
    return [float(lat), float(lng)]

modify_adr2geo(u"東京都墨田区横網1-3-28")

new_events = []

events = [{'address': '東京都墨田区横網1-3-28',
  'date': '16/5/21 (土)',
  'name': '大相撲 夏場所(五月場所) 十四日目',
  'num_of_people': '11,098人',
  'start': '08:00',
  'venue': '両国国技館 (東京)'}]

for i in events:
    loc = modify_adr2geo(i["address"].decode("utf-8"))
    i["latitude"] = loc[0]
    i["longitude"] = loc[1]
    new_events.append(i)

print(new_events)
