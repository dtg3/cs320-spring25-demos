from flask import Flask, render_template, request

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

@app.route('/', methods=["GET"])
def index():
    return render_template("index.html")


@app.route('/select-list/', methods=["GET"])
def select_list():
    return render_template("select-list-demo.html", groceries=grocery_list)


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


if __name__ == '__main__':
    app.run(debug=True, host="localhost")