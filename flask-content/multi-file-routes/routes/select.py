from flask import Blueprint, render_template, request, g

select_example = Blueprint('select_example', __name__, template_folder='templates')

@select_example.route('/', methods=["GET"])
def index():
    return render_template("index.html")

@select_example.route('/select-list/', methods=["GET"])
def select_list():
    return render_template("select-list-demo.html", groceries=g.grocery)

@select_example.route('/select-result/', methods=["POST"])
def select_list_result():
    select_list_data = request.form.get("groceries")
    return f"ID #{select_list_data} received!"
