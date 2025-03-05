from flask import Blueprint, render_template, request, g

delete_example = Blueprint('delete_example', __name__, template_folder='templates')

@delete_example.route('/delete/', methods=["GET", "POST"])
def delete_item():
    if request.method == "POST":
        item_id = int(request.form.get("remove"))
        for i in range(len(g.grocery)):
            if g.grocery[i]['id'] == item_id:
                del g.grocery[i]
                break

    return render_template("delete-demo.html", groceries=g.grocery)