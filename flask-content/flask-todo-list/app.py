from flask import Flask, render_template, request
from datetime import datetime
import uuid
app = Flask(__name__)

# List of dictionaries to simulate a database
#   THIS IS NOT PERSISTENT. If you restart the flask
#   webservice, the to_do list will revert to the 
#   original content below.
todo_list = [
    {
        "id": str(uuid.uuid4()),
        "task": "Do all the things!",
        "date": datetime(2025, 2, 22),
        "complete": True
    },
    {
        "id": str(uuid.uuid4()),
        "task": "Create Flask Example",
        "date": datetime(2025, 3, 1),
        "complete": False

    },
    {
        "id": str(uuid.uuid4()),
        "task": "Have a great Spring Break!",
        "date": datetime(2025, 3, 15),
        "complete": False
    }
]


@app.route('/', methods=["GET"])
def index():
    return render_template("index.html", todo=todo_list, page_title='Task List', active='home')


@app.route('/update/', methods=["POST"])
def update():
    selected_tasks = request.form.getlist("checkbox")
    for task in todo_list:
        task['complete'] = task['id'] in selected_tasks

    return render_template("index.html", todo=todo_list, page_title='Task List', active='home')


@app.route('/add-task/', methods=["GET", "POST"])
def add_task():
    if request.method == "POST":
        
        todo = {
            "id": str(uuid.uuid4()),
            "task": request.form.get("taskDescription"),
            "date": datetime.strptime(request.form.get("dueDate"), "%Y-%m-%d"),
            "complete": False
        }

        todo_list.append(todo)
        return render_template("index.html", todo=todo_list, page_title='Task List', active='home')

    return render_template("add-task.html", page_title='Add a Task', active='add') 


if __name__ == '__main__':
    # START THE APPLICATION WITH:
    #   flask --app app --debug run
    app.run(host="localhost")