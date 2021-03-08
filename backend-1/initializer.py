from flask import Flask
from flask_mysqldb import MySQL
from constants import mail_settings, MYSQL_HOST, MYSQL_PASSWORD, \
    MYSQL_USER, MYSQL_DB, config
from flask_mail import Mail, Message
from flask_caching import Cache


pasp = Flask(__name__) # pasp server


# Required configuration
pasp.config['MYSQL_HOST'] = MYSQL_HOST
pasp.config['MYSQL_USER'] = MYSQL_USER
pasp.config['MYSQL_PASSWORD'] = MYSQL_PASSWORD
pasp.config['MYSQL_DB'] = MYSQL_DB
pasp.config.update(mail_settings)
pasp.config["CACHE_TYPE"] = "simple"

mail = Mail(pasp) # mail handler
mysql = MySQL(pasp) # db handler
cache = Cache(pasp, config) #cache handler