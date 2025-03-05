from flask import Flask, g
from routes.select import select_example
from routes.delete import delete_example
from routes.list_edit import orders_example

app = Flask(__name__)
app.register_blueprint(select_example)
app.register_blueprint(delete_example)
app.register_blueprint(orders_example)

# List of dictionaries to simulate a database
#   THIS IS NOT PERSISTENT. If you restart the flask
#   webservice, the lists will revert to the 
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

orders = [
    {
        "order_id": 1,
        "order_items":
        [
            {
                "item_id":1,
                "item_name":"Milk"
            },
            {
                "item_id":2,
                "item_name":"Bread"
            }
        ]
    },
    {
        "order_id": 2,
        "order_items":
        [
            {
                "item_id":3,
                "item_name":"Cheese"
            },
            {
                "item_id":4,
                "item_name":"Rootbeer"
            }
        ]
    }
]

def get_data():
    if not hasattr(g, 'grocery'):
        g.grocery = grocery_list
    if not hasattr(g, 'orders'):
        g.orders = orders


@app.before_request
def before():
    get_data()

if __name__ == '__main__':
    app.run(debug=True, host="localhost")