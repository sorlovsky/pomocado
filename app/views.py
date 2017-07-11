from flask import render_template
from app import app

@app.route('/')
@app.route('/index')
def index():
    user = {'nickname': 'Simon'}  # fake user
    return render_template('index.html',
                           title='Home',
                           user=user)
@app.route('/clock')
def clock():
    user = {'nickname': 'Simon'}  # fake user
    return render_template('clock.html')