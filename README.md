# cs320-spring25-demos
Repo with HTML, CSS, Javascript, and Flask examples.

## Setting Up Flask

If you already have Python installed, you can use the `pip` tool to install the `flask` package.

`pip install flask`

This will install Flask as a global package, which is fine for a project of this size. I include a `requirements.txt` file for all the Python packages you need. This will allow you to install all the packages using the command quickly:

`pip install -r requirements.txt`

## Python Virtual Environment

You may not want to do this, and with "real" projects, dependency versions can change, conflict with one another, or deprecate the features you need. To help with this, Python allows you to create an environment specific to your project. In your project repository, you'll need to run the command:

`python -m venv env`

This will tell Python to run the virtual environment module (`venv`) and create a folder named `env` to contain it. NOTE that on MacOS and Linux, you might need to use the command `python3` instead. You will need to activate the virtual environment using a script that gets installed with it. The process of doing this on operating systems varies slightly.

**MacOS**
`source env/bin/activate`

**Windows**
Using the cmd prompt
`env\bin\activate.bat`

When you activate a virtual environment, your command prompt should start with `(env)`, indicating that you are using that environment. From there, you can then run your pip command to install Flask. To exit the virtual environment, you can run the command `deactivate`.

## Running Flask

If you setup your Flask projects like the examples, you should be able to launch the application using the command:

`flask --app app --debug run`

This will launch the app with a local web service automatically refreshes as you make changes. However, if you crash the app, you might need to stop (Ctrl +  C) the program and re-run the command.
