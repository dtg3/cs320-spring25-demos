from flask import Blueprint, render_template, request, g

orders_example = Blueprint('orders_example', __name__, template_folder='templates')

# Route to display the list of demos
@orders_example.route('/orders/', methods=["GET"])
def index():
    return render_template("orders.html", order_list=g.orders)


# Page to display a dropdown list of groceries and a button to send the
#   id of the selected grocery item to the webservice
@orders_example.route('/select-order/', methods=["GET"])
def select_list():
    return render_template("select-order.html", orders_list=g.orders)


# This route catches the data posted from the select-list-demo.html page
#   and simply writes the id of the grocery item to HTML
@orders_example.route('/order-edit/', methods=["GET", "POST"])
def order_edit():
    order_id = int(request.form.get("order_id"))

    order_items = []

    print("EDIT ORDER: ", order_id)

    for order in g.orders:
        if order['order_id'] == order_id:
            order_items = order['order_items']
            break
    
    if request.method == "POST" and request.form.get("update"):
        item_id = int(request.form.get("update"))
        new_name = request.form.get("item_name")
        print(new_name)

        for item in order_items:
            if item['item_id'] == item_id:
                item['item_name'] = new_name
        
        print(order_items)
    
    return render_template("order-edit.html", order_id=order_id, order_items=order_items)
