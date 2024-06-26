import pathlib
import textwrap
import json
import re
import google.generativeai as genai
import requests

from flask import Flask, request, jsonify
app = Flask(__name__)

from IPython.display import display
from IPython.display import Markdown


def to_markdown(text):
  text = text.replace('•', '  *')
  return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))


# extract HTML code from response
def extract_html_content(html_content):
    pattern = r'<!DOCTYPE html>.*?</html>'
    match = re.search(pattern, html_content, re.DOTALL)
    if match:
        return match.group(0)
    return "none"


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


# commands format
#--------------------------------------------------------------------------------------------#
#q1 = "Change title to \"%s\" , generate a similar paragraph, and show all HTML code" %(name)
#q1 = "Change title to \"%s\" , I want to change a paragraph similar to the same topic as the paragraph in the code , and show all HTML code" %(name)
#q = "generate paragraphs similar to the same topic as each of the paragraphs in the code and replace them and show all HTML code "

#q1 = " Change title to \"%s\" and show me all html code" %(name)
#q1 = " Change the title tag to \"%s\" and show me all html code" %(name)
# q2 = "generate paragraphs similar to the same topic as the paragraphs in the code and replace them and show all html code "
# q2 = "I'd like change the content of each paragraph while keeping the overall meaning similar and show all html code"


# q5 = '''
# I have some HTML code where I want to change the content of all the paragraphs to be similar, but not exactly the same. Here's the code:
# '''

# q6 = '''
# Can you modify the code so that the paragraphs have similar meaning but use different wording? Please show me the complete HTML code with the updated paragraphs.
# '''
#------------------------------------------------------------------------------------------#

#  / Change name and paragraphs / #

# q1 = "change  title website to \"" + name + "\" ,and create new paragraphs similar to the same topic as the paragraphs in the html code and replace all the old ones with new paragraphs and Show me all HTML code  "
# q3 = "Show the rest of the code"
# q2 = " change  title website to \"%s\" and Show me all HTML code" %(name)



   # try to change images ,name and paragraphs  #

# q1 = "change  name  website only to \"%s\"  and Invent new paragraphs similar to the same topic as the paragraphs in the html code and replace the old ones with new paragraphs , Replace the old images link in the <img> tag with src attribute with the new link \"%s\" , \"%s\" , \"%s\"  and Show me all HTML code  " %(name , path2 ,path1 , path3)


# get 3 images 
def get_images(category):
  #
  url = 'http://localhost:3000/api/data'
  response = requests.get(url , {category})
  return jsonify(response)



 #  /responds /#
#respond1 = send_message(html + q1)
def get_respond(html ,name , img_path1 , img_path2 , img_path3):
  q1 = "change  title website to \"" + name + "\" ,and create new paragraphs similar to the same topic as the paragraphs in the html code and replace all the old ones with new paragraphs and ,Change the link of only one  images contained in this code with this link   \"%s\" ,\"%s\",\"%s\" ,  Show me all HTML code  "%(img_path1,img_path2 , img_path3)
  q2 = "Show the rest of the code"
  respond1 = send_message(html+ q1)
  respond3 = send_message(q2)
  respond4 = send_message(q2)
  respond5 = send_message(q2)
  HTML_code_afte_edit =  extract_html_content(respond1 + respond3 + respond4 + respond5 )   
  # print(HTML_code_afte_edit) # print(responds)
  return HTML_code_afte_edit


# test gmeini respond if exist respond or not 

# numOftest = 0 
# while  numOftest <= 2:
#     # try and except to handle error 
#     try: 
#       htmlcode = get_respond()
      
#     except:
#        numOftest+=1


@app.route('/edit_html', methods=['POST'])
def edit_html():
    data = request.get_json()
    name = data['websitename']
    category = data['category']
    html = data['html']

    # get there image paths
    image_paths = get_images(category)
    numOftest = 1 
    while  numOftest <= 3:
    # try and except to handle error 
      try: 
        respond = get_respond(html ,name , image_paths["path1"] , image_paths["path2"] , image_paths["path3"])
        response = {'html': respond}
        return jsonify(response)
      except:
       numOftest+=1

    return None
if __name__ == '__main__':
    app.run(debug=True)
    



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




