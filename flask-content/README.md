# Virtual Environments and Pip

**Please read this document in it's entirety before running any commands**

## Pip
Your Python 3 installs all come with a commandline application called `pip`. You can use this tool to easily install Third party packages/libraries from the internet to enhance your programs. For example, let's say you wanted to install Flask. You can use the command:

**Note:** The `$` represents that these commands will be run from a terminal.

```plain
$ pip install flask
```

Running this command will fetch the flask package and install it `globally` so that any other Python 3 application you create and use Flask. Sometimes however, this behavior is not ideal.

For example, suppose we are working on a project using a specific version of Python or a package necessary for our project. However, we are busy people, and this might not be the only project we are working on. It is also possible that different projects we are working on might use the same package, but are compatible with different versions of that package. This poses a problem because installing new libraries `globally` means that all of our projects would now need to use the same package version. This is where virtual environments can help.

## Virtual Environments
A virtual environment allows you to create a separate development environemnt for your project complete with it's own version of python, pip, and any installed packages. This isolates the dependencies so that you can install the version of the packages that are right for the project you are currently working on. If you are using Python 3 (which you definitely should) this feature is installed by default.

### Setup a Virtual Environment
First, open the directory containing your python project using VS Code and then open a VS Code terminal window. You will know if you have opened the directory in VS Code as the sidebar on the left should have the name of the directory you have opened and show all of the files and folders within the directory. Once you have this verified run the following command:

**macOS:**
```plain
$ python3 -m venv env
```

**Windows:**
```plain
$ python -m venv env
```

Make sure to be patient in might take a bit to setup. This command tells the python interpreter to run a module (`-m`) named `venv` (short for virtual environment). When it finishes you should notice that you have a new folder called `env` in your project directory which contains all the important virtual environment stuff.

## Using the virtual environment
Once we have a virtual environment setup, we need to activate this environment so
we aren't using our normal Python install. You can do this with the following command:

**macOS:**
```plain
$ source env/bin/activate
```

**Windows:**
```plain
$ env\Scripts\activate
```

If all goes well you should see the text `(env)` in your terminal window. You are now using the Python that is inside the virtual environment. From here everything behaves normally with the exception that on MacOS you no longer need to type `python3` to run the Python interpreter, just `python` will do in this environment. Now that the virtual environmnet is active, any time you run a `pip install` command, the package will be installed into the `env` directory and be accessible to this project **ONLY WHEN THE VIRTUAL ENVIRONMENT IS ACTIVE**. VS Code is pretty good about detecting the presence of a virtual enviroment, so often times if you open a directory that contains one, it will automatically activate it for you. If not, just remember to use the above commands, and look for the `(env)` on the terminal.

Pip can create a package list for you that makes installing python library dependencies very convenient. In the examples, I have included a `requirements.txt`. With your virtual machine active, you can run `pip install -r requirements.txt`. You can create your own `requirements.txt` file for a project by using the pip command: `pip freeze > requirements.txt`.

## Quitting the virtual environment
When you are done using the virtual environment for your program you might want to leave the virtual environment. To do so, you can use the command:

```plain
$ deactivate
```

You should notice that your terminal no longer contains the `(env)` text and at this time you are now using your "normal" version of python.

## Practice
You can use this information to help you run any of the flask examples