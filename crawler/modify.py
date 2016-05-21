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

def adr2geo(adr):
    api = "http://www.geocoding.jp/api/?v=1.1&q=%s" % (urllib.quote(adr.encode('utf-8')))
    xml = parse(urllib.urlopen(api)).getroot()

    lat = xml.find('coordinate/lat').text
    lng = xml.find('coordinate/lng').text
    return [float(lat), float(lng)]

def modify_date(date_str):
    date_new =

def modify(json_data):
    jsondata

def main():
    print adr2geo(u'東京都新宿区西新宿3-20-2 3・4F')

if __name__ == '__main__':
    main()
