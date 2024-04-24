import pathlib
import textwrap
import json
import re
import google.generativeai as genai

from IPython.display import display
from IPython.display import Markdown


def to_markdown(text):
  text = text.replace('•', '  *')
  return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))

#from google.colab import userdata

GOOGLE_API_KEY='your_api_key'

genai.configure(api_key=GOOGLE_API_KEY)

model = genai.GenerativeModel('gemini-pro')
chat = model.start_chat(history=[])
chat


def send_message(equation):
  response = chat.send_message(equation)
  response.resolve()
  return response.text


def print_response(response):
  print(response)


html ="""
"""""

q1 = "show html code just"
q2 = "Show the rest of the code"
respond1 = send_message(html +"  "+q1)
respond2 = send_message(html +"  "+q2)




def extract_html_content(html_content):
    pattern = r'<!DOCTYPE html>.*?</html>'
    match = re.search(pattern, html_content, re.DOTALL)
    if match:
        return match.group(0)
    return "none"
    

HTML_code_afte_edit =  extract_html_content(respond1 + respond2)   

# Write to file
#file_path = 'sample.txt'
# with open(file_path, 'w') as file:
#     file.write(final_res)

#---------------------------------------------------------------------------#

# Write to json
# with open('output.json', 'w') as file:
#     json.dump({"html": res + res2 }, file, indent=4)

#---------------------------------------------------------------------------#


# for chunk in response:
#   print(chunk.text)
#   print("_"*80)


# for message in chat.history:
#   display(to_markdown(f'**{message.role}**: {message.parts[0].text}'))




