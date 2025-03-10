# Necessary import for Flask stuff
from flask import Flask, render_template, request

# This initializes the app
app = Flask(__name__)

# List of dictionaries to simulate a database
#   THIS IS NOT PERSISTENT. If you restart the flask
#   webservice, the grocery list will revert to the 
#   original content below.
grocery_list = [
    {
        "id":1,
        "product":"Milk"
    },
    {
        "id":2,
        "product":"Eggs"
    },
    {
        "id":3,
        "product":"Bread"
    },
    {
        "id":4,
        "product":"Rootbeer"
    },
    {
        "id":5,
        "product":"Diapers"
    }
]

# These are routes. Routes allow you to create "paths" for your website to display different content.
#   The "methods" is a list of strings that represent the HTTP Verbs GET, POST, UPDATE, etc. We'll likely
#   only need GET and POST. GET is a non-modification operation. You are loading or requesting existing content.
#   POST is for when you want data to be sent along to your web service.

# Routes can return a template (HTML content) sent to the user.
@app.route('/', methods=["GET"])
def index():
    return render_template("index.html")


# You can also pass data along to the template to render information from another source (like our list of dictionaries)
@app.route('/select-list/', methods=["GET"])
def select_list():
    return render_template("select-list-demo.html", groceries=grocery_list)


# You can also return regular strings, or even a set of data (often in the JSON format).
@app.route('/select-result/', methods=["POST"])
def select_list_result():
    select_list_data = request.form.get("groceries")
    return f"ID #{select_list_data} received!"


@app.route('/delete/', methods=["GET", "POST"])
def delete_item():
    if request.method == "POST":
        item_id = int(request.form.get("remove"))
        for i in range(len(grocery_list)):
            if grocery_list[i]['id'] == item_id:
                del grocery_list[i]
                break

    return render_template("delete-demo.html", groceries=grocery_list)


# This is where the application launches and is really all you need for our purposes.
if __name__ == '__main__':
    app.run(debug=True, host="localhost")