import requests
import string
import json
from lxml import html
from googlesearch import search
from bs4 import BeautifulSoup
from flask import jsonify

# to search
# print(chatbot_query('how old is samuel l jackson'))

class message:
    def __init__(self, req_msg, res_msg):
        self.req_msg = req_msg
        self.res_msg = res_msg

class chatbot_action:

    def __init__(self):
        self.history = []

    def chatbot_append_history(self, req_msg, res_msg):
        msg = message(req_msg, res_msg)
        self.history.append(msg)
        
    def chatbot_query(self, query, index=0):
        fallback = 'Sorry, I cannot think of a reply for that.'
        error = 'Sorry, Internal error on bot server.'
        result = ''

        try:
            search_result_list = list(search(query, tld="com",lang="en", num=10, stop=3, pause=1))

            headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36', "Upgrade-Insecure-Requests": "1","DNT": "1","Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8","Accept-Language": "en-US,en;q=0.5","Accept-Encoding": "gzip, deflate"}
            page = requests.get(str(search_result_list[0].replace("https", "http")),headers=headers)
            
            soup = BeautifulSoup(page.content, features="lxml")

            article_text = ''
            article = soup.findAll('p')
            for element in article:
                article_text += '\n' + ''.join(element.findAll(text = True))
            article_text = article_text.replace('\n', '')
            first_sentence = article_text.split('.')
            first_sentence = first_sentence[0].split('?')[0]

            chars_without_whitespace = first_sentence.translate(
                { ord(c): None for c in string.whitespace }
            )

            if len(chars_without_whitespace) > 0:
                result = first_sentence
            else:
                result = fallback

            self.chatbot_append_history(query, result)

            json_string = json.dumps([ob.__dict__ for ob in self.history])
            return json_string

        except Exception as e:
            if len(result) == 0:
                result = fallback
            else:
                result = error

            return jsonify(result)