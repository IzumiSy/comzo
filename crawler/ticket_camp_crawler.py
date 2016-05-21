from selenium.webdriver import FirefoxProfile
from selenium.webdriver import Firefox
from selenium.webdriver import Proxy
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import queue
import pickle

'''
セットアップ
'''

default_profile = {
    'security.warn_entering_secure': False,
    'security.warn_entering_secure.show_once': True,
    'security.warn_entering_weak': False,
    'security.warn_entering_weak._show_once': True,
    'security.warn_leaving_secure': False,
    'security.warn_leaving_secure.show_once': True,
    'security.warn_leaving_weak': False,
    'security.warn_leaving_weak._show_once': True,
    'security.warn_submit_insecure': False,
    'security.warn_viewing_mixed': False,
    'security.warn_viewing_mixed.show_once': True,
    }
profile = FirefoxProfile()
for name, value in default_profile.items():
    profile.set_preference(name, value)


proxy = Proxy()
proxy.ftp_proxy = proxy.ssl_proxy = proxy.http_proxy = None

browser = Firefox(firefox_profile=profile, proxy=proxy)

tokyo_url = 'https://ticketcamp.net/venue/tokyo/' #東京に接続
browser.get(tokyo_url)

'''

'''

url_list = queue.Queue()

def get_url_from_this_page():
    tags = browser.find_elements_by_class_name('name')
    for i in tags:
        i = i.find_elements_by_css_selector("a")
        url_list.put(i[0].get_attribute("href"))

while True:
    get_url_from_this_page()
    if len(browser.find_elements_by_class_name('next')) == 0:
        break
    browser.find_elements_by_class_name('next')[0].click()

def go_show_from_index():
    time.sleep(1)
    try:
        if len(browser.find_elements_by_class_name('row')) == 1:
            print("チケットがない")
        else:
            browser.find_elements_by_class_name('row')[0].click()
    except:
        url = url_list.get()
        browser.get(url)

def go_info_of_venue():
    try:
        event["name"] = browser.find_elements_by_css_selector("td")[0].text #イベント名
    except:
        event["name"] = ""

    try:
        event["date"] = browser.find_elements_by_css_selector("td")[1].text #日付
    except:
        event["date"] = ""

    if browser.find_elements_by_css_selector("th")[2].text == "時間":
        try:
            event["start"] = browser.find_elements_by_css_selector("td")[2].text
        except:
            event["start"] = ""
    else:
        event["start"] = ""

    if browser.find_elements_by_css_selector("th")[2].text == "会場":
        event["venue"] = browser.find_elements_by_css_selector("td")[2].text #会場名
        try:
            time.sleep(1)
            browser.find_elements_by_css_selector("td")[2].find_elements_by_css_selector("a")[0].click()
        except:
            print("遷移できなかった")
    else:
        event["venue"] = browser.find_elements_by_css_selector("td")[3].text #会場名
        try:
            time.sleep(1)
            browser.find_elements_by_css_selector("td")[3].find_elements_by_css_selector("a")[0].click()
        except:
            print("遷移できなかった")


def get_info_of_venue():
    try:
        event["address"] = browser.find_elements_by_css_selector("td")[0].text #住所
    except:
        event["address"] = ""

    try:
        event["num_of_people"] = browser.find_elements_by_css_selector("td")[4].text #人数
    except:
        event["num_of_people"] = ""


event_info = []

while True:
    url = url_list.get()
    browser.get(url)
    event = {}
    go_show_from_index()
    go_info_of_venue()
    get_info_of_venue()
    event_info.append(event)
    print(event)

print(event_info)
