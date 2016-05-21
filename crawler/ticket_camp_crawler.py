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
