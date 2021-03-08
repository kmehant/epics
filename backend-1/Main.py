""" PASP enpoints defined using Flask """
from flask import request, jsonify, Response
import json
from flask_mail import Message

from utils import otp, present_date, executeSQL, validate, dumpDB, deleteDB, \
    numberOf, maximumCount, minimumCount, numberOfEach, getFactor, countof, mostcommon, drugstaken
from initializer import pasp, mail, cache


@pasp.route('/')
@cache.cached(timeout=60)
def check():
    data = executeSQL('show tables', False,)
    return Response(response=json.dumps(data), status=200)


@pasp.route('/login')
def login():
    username = request.args.get('username')
    password = request.args.get('password')
    onepass = request.args.get('otp')
    data = executeSQL(
        'select uid, email from users where username="%s" and password="%s"', True, username, password)
    print(data)
    if data is not None:
        uid = data[0]
        print(uid)
        email = data[1]
        print(email)
    #executeSQL('update users set otp="" where uid=%s',True, str(uid))
    if data is not None and onepass is None:
        key = otp()
        print(f'update users set otp="%s" where uid=%s' % (key, str(uid)))
        with pasp.app_context():
            executeSQL('update users set otp="%s" where uid=%s',
                       True, key, str(uid))
            msg = Message(subject="OTP for PASP login",
                          sender=pasp.config.get("MAIL_USERNAME"),
                          recipients=[email],
                          body='OTP: %s' % key)
        mail.send(msg)
        resp = Response(response='OTP sent', status=203)
        return resp
    elif data is not None and onepass is not None:
        data = executeSQL(
            'select otp from users where username="%s" and password="%s"', True, username, password)
        print(data[0])
        print(onepass)
        print(uid)
        if data[0] == onepass:
            resp = Response(response='Welcome, "%s"' % username, status=200)
            resp.headers["token"] = onepass
        else:
            resp = Response(response='Access Denied', status=401)
        return resp
    else:
        return Response(response='Access Denied', status=401)


@pasp.route('/signup')
def signup():
    username = request.args.get('username')
    password = request.args.get('password')
    onepass = request.args.get('otp')
    emailid = request.args.get('email')
    info = executeSQL('select uid from users where username="%s" and password="%s" and email="%s"',
                      True, username, password, emailid)
    if info is None or onepass is None:
        if info is None:
            executeSQL('insert into users (username, password, email) values \
                 ("%s","%s","%s")', True, username, password, emailid)
        key = executeSQL('select otp from users where username="%s" and \
             password="%s" and email="%s"', True, username, password, emailid)
        print(key)
        if None not in key:
            return Response(response='Failed', status=401)
        key = otp()
        with pasp.app_context():
            msg = Message(subject="OTP for PASP login",
                          sender=pasp.config.get("MAIL_USERNAME"),
                          recipients=[emailid],
                          body='OTP: %s' % key)
        mail.send(msg)
        executeSQL('update users set otp="%s" where username="%s" and \
                 password="%s" and email="%s"', True, key, username, password, emailid)
        resp = Response(response='OTP sent', status=203)
    else:
        key = executeSQL('select otp from users where username="%s" and \
             password="%s" and email="%s"', True, username, password, emailid)
        if onepass in key:
            resp = Response(response='Success', status=200)
        else:
            resp = Response(response='Failed', status=401)
    return resp


@pasp.route('/delete')
def delete():
    token = request.headers["token"]
    data = validate(token)
    if token is None or data is None:
        resp = Response(response='Bad Request', status=400)
    else:
        executeSQL('delete from input where uid=%d', True, data[0])
        executeSQL('delete from users where uid=%d', True, data[0])
        resp = Response(response="Deleted", status=204)
    return resp


@pasp.route('/forgot')
def forgot():
    username = request.args.get('username')
    email = request.args.get('email')
    data = executeSQL(
        'select password from users where username="%s" and email="%s"', True, username, email)
    if data is not None:
        with pasp.app_context():
            msg = Message(subject="Your Password has been recovered",
                          sender=pasp.config.get("MAIL_USERNAME"),
                          recipients=[email],
                          body='Password: %s' % data[0])
        mail.send(msg)
        resp = Response(response="sent", status=200)
    else:
        resp = Response(response="Wrong username or email id", status=403)
    return resp


@pasp.route('/details')
@cache.cached(timeout=60)
def details():
    token = request.headers["token"]
    data = validate(token)
    if token is None or data is None:
        resp = Response(response='Bad Request', status=400)
    else:
        resp = Response(response=json.dumps(data), status=200)
    return resp


@pasp.route('/input', methods=['GET', 'POST'])
@cache.cached(timeout=60)
def input():
    token = request.headers["token"]
    data = validate(token)
    if token is None or data is None:
        resp = Response(response='Bad Request', status=400)
    else:
        if request.method == 'POST':
            uid = data[0]
            aid = request.args.get('aid')
            present_d = present_date()
            dosage = request.args.get('dosage')
            dosage_pattern = request.args.get('dosage_pattern')
            end_date = request.args.get('end_date')
            executeSQL('insert into input values("%s","%s","%s","%s","%s","%s")',
                       True, uid, aid, present_d, dosage, dosage_pattern, end_date)
            resp = Response(response="Success", status=201)
        elif request.method == 'GET':
            uid = data[0]
            dumpDB()  # create table temp with complete data
            info = executeSQL("select * from temp where uid=%d", True, uid)
            resp = Response(response=json.dumps(info), status=200)
            deleteDB()
    return resp


@pasp.route('/gstats/numberof/<factor>')
@cache.cached(timeout=60)
def gstats1(factor):
    token = request.headers["token"]
    data = validate(token)
    if token is None or data is None:
        resp = Response(response='Bad Request', status=400)
    else:
        dumpDB()
        info = numberOf(factor, None)
        if info == "Failure":
            resp = Response(response=json.dumps(info), status=404)
        else:
            resp = Response(response=json.dumps(info), status=200)
        deleteDB()
    return resp


@pasp.route('/gstats/maxcount/<factor>')
@cache.cached(timeout=60)
def gstats2(factor):
    token = request.headers["token"]
    data = validate(token)
    if token is None or data is None:
        resp = Response(response='Bad Request', status=400)
    else:
        dumpDB()
        info = maximumCount(factor, None)
        if info == "Failure":
            resp = Response(response=json.dumps(info), status=404)
        else:
            resp = Response(response=json.dumps(info), status=200)
        deleteDB()
    return resp


@pasp.route('/gstats/mincount/<factor>')
@cache.cached(timeout=60)
def gstats3(factor):
    token = request.headers["token"]
    data = validate(token)
    if token is None or data is None:
        resp = Response(response='Bad Request', status=400)
    else:
        dumpDB()
        info = minimumCount(factor, None)
        if info == "Failure":
            resp = Response(response=json.dumps(info), status=404)
        else:
            resp = Response(response=json.dumps(info), status=200)
        deleteDB()
    return resp


@pasp.route('/gstats/numberofeach/<factor>')
@cache.cached(timeout=60)
def gstats4(factor):
    token = request.headers["token"]
    data = validate(token)
    if token is None or data is None:
        resp = Response(response='Bad Request', status=400)
    else:
        dumpDB()
        info = numberOfEach(factor, None)
        if info == "Failure":
            resp = Response(response=json.dumps(info), status=404)
        else:
            resp = Response(response=json.dumps(info), status=200)
        deleteDB()
    return resp


@pasp.route('/stats/numberof/<factor>')
@cache.cached(timeout=60)
def stats1(factor):
    token = request.headers["token"]
    data = validate(token)
    uid = data[0]
    if token is None or data is None:
        resp = Response(response='Bad Request', status=400)
    else:
        dumpDB()
        info = numberOf(factor, uid)
        if info == "Failure":
            resp = Response(response=json.dumps(info), status=404)
        else:
            resp = Response(response=json.dumps(info), status=200)
        deleteDB()
    return resp


@pasp.route('/stats/maxcount/<factor>')
@cache.cached(timeout=60)
def stats2(factor):
    token = request.headers["token"]
    data = validate(token)
    uid = data[0]
    if token is None or data is None:
        resp = Response(response='Bad Request', status=400)
    else:
        dumpDB()
        info = maximumCount(factor, uid)
        if info == "Failure":
            resp = Response(response=json.dumps(info), status=404)
        else:
            resp = Response(response=json.dumps(info), status=200)
        deleteDB()
    return resp


@pasp.route('/stats/mincount/<factor>')
@cache.cached(timeout=60)
def stats3(factor):
    token = request.headers["token"]
    data = validate(token)
    uid = data[0]
    if token is None or data is None:
        resp = Response(response='Bad Request', status=400)
    else:
        dumpDB()
        info = minimumCount(factor, uid)
        if info == "Failure":
            resp = Response(response=json.dumps(info), status=404)
        else:
            resp = Response(response=json.dumps(info), status=200)
        deleteDB()
    return resp


@pasp.route('/stats/numberofeach/<factor>')
@cache.cached(timeout=60)
def stats4(factor):
    token = request.headers["token"]
    data = validate(token)
    uid = data[0]
    if token is None or data is None:
        resp = Response(response='Bad Request', status=400)
    else:
        dumpDB()
        info = numberOfEach(factor, uid)
        if info == "Failure":
            resp = Response(response=json.dumps(info), status=404)
        else:
            resp = Response(response=json.dumps(info), status=200)
        deleteDB()
    return resp


@pasp.route('/get/<factor>')
@cache.cached(timeout=60)
def getF(factor):
    token = request.headers["token"]
    data = validate(token)
    if token is None or data is None:
        resp = Response(response='Bad Request', status=400)
    else:

        info = getFactor(factor)
        if info == "Failure":
            resp = Response(response=json.dumps(info), status=404)
        else:
            resp = Response(response=json.dumps(info), status=200)
    return resp


@pasp.route('/gstats/countof/<factor>')
@cache.cached(timeout=60)
def scountof(factor):
    token = request.headers["token"]
    data = validate(token)
    if token is None or data is None:
        resp = Response(response='Bad Request', status=400)
    else:
        info = countof(factor, None)
        if info == "Failure":
            resp = Response(response=json.dumps(info), status=404)
        else:
            resp = Response(response=json.dumps(info), status=200)
    return resp

@pasp.route('/stats/countof/<factor>')
@cache.cached(timeout=60)
def gcountof(factor):
    token = request.headers["token"]
    data = validate(token)
    uid = data[0]
    if token is None or data is None:
        resp = Response(response='Bad Request', status=400)
    else:
        info = countof(factor, uid)
        if info == "Failure":
            resp = Response(response=json.dumps(info), status=404)
        else:
            resp = Response(response=json.dumps(info), status=200)
    return resp

@pasp.route('/stats/mostcommon/<factor>')
@cache.cached(timeout=60)
def mostcommonr(factor):
    token = request.headers["token"]
    data = validate(token)
    uid = data[0]
    if token is None or data is None:
        resp = Response(response='Bad Request', status=400)
    else:
        info_with_uid = mostcommon(factor, uid)
        print("info")
        print(info_with_uid)
        maximum = info_with_uid[0][0] # 1
        maximum_value = info_with_uid[0]
        for i in range(len(info_with_uid)):
            if maximum < info_with_uid[i][0]:
                maximum = info_with_uid[i][0]
                maximum_value = info_with_uid[i]
        info_with_uid = maximum_value
        info_without_uid = mostcommon(factor, None)
        maximum = info_without_uid[0][0]
        maximum_value = info_without_uid[0]
        for i in range(len(info_without_uid)):
            if maximum < info_without_uid[i][0]:
                maximum = info_without_uid[i][0]
                maximum_value = info_without_uid[i]
        info_without_uid = maximum_value
        res = {}
        res["with"] = info_with_uid
        res["without"] = info_without_uid
        if info_with_uid == "Failure" or info_without_uid == "Failure":
            resp = Response(response=json.dumps(info_with_uid), status=404)
        else:
            resp = Response(response=json.dumps(res), status=200)
    return resp


@pasp.route('/stats/drugstaken')
@cache.cached(timeout=60)
def drugstakenapi(factor):
    token = request.headers["token"]
    data = validate(token)
    uid = data[0]
    if token is None or data is None:
        resp = Response(response='Bad Request', status=400)
    else:
        info = drugstaken(factor, uid)
        if info == "Failure":
            resp = Response(response=json.dumps(info), status=404)
        else:
            resp = Response(response=json.dumps(info), status=200)
    return resp

if __name__ == '__main__':
    pasp.run(threaded=True)
