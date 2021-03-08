import uuid
from flask import Flask
from datetime import date
from initializer import mysql
import json


def present_date():
    """
    Utility method to return present date as a string in the format "YYYY-MM-DD"
    """
    return str(date.today())


def otp():
    """
    Utility method to return a unique permutation of characters as a string
    """
    return uuid.uuid1()


def executeSQL(sqlQuery, fetchOne=True, *params):
    """
    Helper method to run any SQL query
    returns the result as a list
    """

    cur = mysql.connection.cursor()
    try:
        print(sqlQuery % params)
        cur.execute(sqlQuery % params)
        mysql.connection.commit()
    except Exception as e:
        print(e)
        mysql.connection.rollback()
        return "Failure"

    result = None
    try:
        if fetchOne:
            result = list(cur.fetchone())
        else:
            result = list(cur.fetchall())
    except:
        pass
    finally:
        cur.close()
        return result


def validate(token):
    """
    Validatation method to validate the user's login via the token
    returns uid, username and email as a list
    """
    return executeSQL('select uid,username, email from users where otp="%s"', True, str(token))


def dumpDB():
    """
    Helper method to create a table temp of complete PASP data
    """
    executeSQL("create table temp as select users.uid, users.username, users.email, input.present_date, input.dosage, input.dosage_pattern, input.end_date, \
                antibiotics.aid, antibiotics.aname, antibiotics.risk, antibiotics.ob, antibiotics.cost, antibiotics.standard_dosing, antibiotics.effects, \
                syndromes.sid, syndromes.sname, problems.pid, problems.pname, pathogens.pathid, pathogens.pathname,pathogens.info,pathogens.epidemiology, \
                precautions.prec_id, precautions.prec_name from users, input,antibiotics, syndromes, problems, precautions, \
                pathogens, need, cures, assoc where users.uid = input.uid and input.aid = antibiotics.aid and \
                syndromes.sid = cures.sid and cures.aid = antibiotics.aid and assoc.pathid = pathogens.pathid and \
                assoc.sid = syndromes.sid and need.pathid = pathogens.pathid and need.prec_id = precautions.prec_id \
                and syndromes.pid = problems.pid", True)


def deleteDB():
    """
    Helper method to drop table temp created by dumpDB
    """
    executeSQL("drop table temp", True)


def numberOf(factor, uid):
    """
    This helper method returns number of factor by an
    individual or globally
    gives global stats if uid is not given
    factor: antibiotics(aid)/pathogens(pathid)/problems(pid)/syndromes(sid)
    """
    if uid is None:
        return executeSQL("select count(*) from (select distinct %s from \
            temp) as t;", False, factor)
    else:
        return executeSQL("select count(*) from (select distinct %s from \
            temp where uid=%d) as t", False, factor, uid)


def maximumCount(factor, uid):
    """
    This helper method returns maximum of factor used by an
    individual or globally
    gives global stats if uid is not given
    factor: antibiotics(aid)/pathogens(pathid)/problems(pid)/syndromes(sid)
            antibiotics(aname)/pathogens(pathname)/problems(pname)/syndromes(sname)
    """
    name = ""
    if factor == "aid":
        name = "aname"
    if factor == "pid":
        name = "pname"
    if factor == "pathid":
        name = "pathname"
    if factor == "sid":
        name = "sname"

    if uid is None:
        return executeSQL("select max(c), group_concat(b), group_concat(a) \
            from (select group_concat(%s) as a, %s as b, count(*) as c from temp group by %s) as t;", False, name, factor, factor)
    else:
        return executeSQL("select max(c), group_concat(b), group_concat(a) \
            from (select group_concat(%s) as a, %s as b, count(*) as c from temp where uid=%d group by %s) as t;", False, name, factor, uid, factor)


def minimumCount(factor, uid):
    """
    This helper method returns minimum of factor used by an
    individual or globally
    gives global stats if uid is not given
    factor: antibiotics(aid)/pathogens(pathid)/problems(pid)/syndromes(sid)
            antibiotics(aname)/pathogens(pathname)/problems(pname)/syndromes(sname)
    """
    name = ""
    if factor == "aid":
        name = "aname"
    if factor == "pid":
        name = "pname"
    if factor == "pathid":
        name = "pathname"
    if factor == "sid":
        name = "sname"

    if uid is None:
        return executeSQL("select min(c), group_concat(b), group_concat(a) \
            from (select group_concat(%s) as a, %s as b, count(*) as c from temp group by %s) as t;", False, name, factor, factor)
    else:
        return executeSQL("select min(c), group_concat(b), group_concat(a) \
            from (select group_concat(%s) as a, %s as b, count(*) as c from temp where uid=%d group by %s) as t;", False, name, factor, uid, factor)


def numberOfEach(factor, uid):
    """
    This helper method returns count of each element of the factor by an
    individual or globally
    gives global stats if uid is not given
    factor: antibiotics(aid)/pathogens(pathid)/problems(pid)/syndromes(sid)
            antibiotics(aname)/pathogens(pathname)/problems(pname)/syndromes(sname)
    """
    name = ""
    if factor == "aid":
        name = "aname"
    if factor == "pid":
        name = "pname"
    if factor == "pathid":
        name = "pathname"
    if factor == "sid":
        name = "sname"
    if uid is None:
        return executeSQL("select count(*), %s, group_concat(%s) from temp group by %s", False, factor, name, factor)
    else:
        return executeSQL("select count(*), %s, group_concat(%s) from temp where uid=%d group by %s", False, factor, name, uid, factor)


def getFactor(factor):
    """
    This helper method returns list of complete data of a factor
    factor: table name
    antibiotics/pathogens/problems/syndromes/precautions
    """
    if factor != "users" or factor != "need" or factor != "input" \
            or factor != "cures" or factor != "assoc":
        return executeSQL("select * from %s", False, factor)
    else:
        return "Failed"


def countof(factor, uid=None):
    name = ""
    if factor == "aid":
        if uid is None:  # global
            return executeSQL("select count(distinct(a.aid)) from users u join input i join antibiotics a where u.uid = i.uid and i.aid = a.aid;", False)
        return executeSQL("select count(distinct(a.aid)) from users u join input i join antibiotics a where u.uid = i.uid and i.aid = a.aid and u.uid = %d;", False, uid)

    if factor == "pid":
        if uid is None:  # global
            return executeSQL("select count(distinct(p.pid)) from users u, syndromes s, input i, antibiotics a, cures c, problems p where u.uid = i.uid and i.aid = a.aid and a.aid = c.aid and c.sid = s.sid and s.pid = p.pid;", False)
        return executeSQL("select count(distinct(p.pid)) from users u, syndromes s, input i, antibiotics a, cures c, problems p where u.uid = i.uid and i.aid = a.aid and a.aid = c.aid and c.sid = s.sid and s.pid = p.pid and u.uid = %d;", False, uid)

    if factor == "pathid":
        if uid is None:  # global
            return executeSQL("select count(distinct(pt.pathid)) from users u, syndromes s, input i, antibiotics a, cures c, pathogens pt, assoc ass where u.uid = i.uid and i.aid = a.aid and a.aid = c.aid and c.sid = s.sid and ass.pathid = pt.pathid and s.sid = ass.sid;", False)
        return executeSQL("select count(distinct(pt.pathid)) from users u, syndromes s, input i, antibiotics a, cures c, pathogens pt, assoc ass where u.uid = i.uid and i.aid = a.aid and a.aid = c.aid and c.sid = s.sid and ass.pathid = pt.pathid and s.sid = ass.sid and u.uid = %d;", False, uid)
    if factor == "sid":
        if uid is None:  # global
            return executeSQL("select count(distinct(s.sid)) from users u, syndromes s, input i, antibiotics a, cures c where u.uid = i.uid and i.aid = a.aid and a.aid = c.aid and c.sid = s.sid;", False)
        return executeSQL("select count(distinct(s.sid)) from users u, syndromes s, input i, antibiotics a, cures c where u.uid = i.uid and i.aid = a.aid and a.aid = c.aid and c.sid = s.sid and u.uid = %d;", False, uid)


def mostcommon(factor, uid=None):
    name = ""
    if factor == "aid":
        if uid is None:  # global
            return executeSQL("select count(*), a.aname from users u join input i join antibiotics a where u.uid = i.uid and i.aid = a.aid group by a.aid;", False)
        return executeSQL("select count(*), a.aname from users u join input i join antibiotics a where u.uid = i.uid and i.aid = a.aid and u.uid = %d group by a.aid;", False, uid)

    if factor == "pid":
        if uid is None:  # global
            return executeSQL("select count(*), p.pname from users u, syndromes s, input i, antibiotics a, cures c, problems p where u.uid = i.uid and i.aid = a.aid and a.aid = c.aid and c.sid = s.sid and s.pid = p.pid group by p.pid;", False)
        return executeSQL("sselect count(*), p.pname from users u, syndromes s, input i, antibiotics a, cures c, problems p where u.uid = i.uid and i.aid = a.aid and a.aid = c.aid and c.sid = s.sid and s.pid = p.pid and u.uid = %d group by p.pid;", False, uid)

    if factor == "pathid":
        if uid is None:  # global
            return executeSQL("select count(*), pt.pathname from users u, syndromes s, input i, antibiotics a, cures c, pathogens pt, assoc ass where u.uid = i.uid and i.aid = a.aid and a.aid = c.aid and c.sid = s.sid and ass.pathid = pt.pathid and s.sid = ass.sid group by pt.pathid;", False)
        return executeSQL("select count(*), pt.pathname from users u, syndromes s, input i, antibiotics a, cures c, pathogens pt, assoc ass where u.uid = i.uid and i.aid = a.aid and a.aid = c.aid and c.sid = s.sid and ass.pathid = pt.pathid and s.sid = ass.sid and u.uid = %d group by pt.pathid;", False, uid)

    if factor == "sid":
        if uid is None:  # global
            return executeSQL("select count(*), s.sname from users u, syndromes s, input i, antibiotics a, cures c where u.uid = i.uid and i.aid = a.aid and a.aid = c.aid and c.sid = s.sid group by s.sid;", False)
        return executeSQL("select count(*), s.sname from users u, syndromes s, input i, antibiotics a, cures c where u.uid = i.uid and i.aid = a.aid and a.aid = c.aid and c.sid = s.sid and u.uid = %d group by s.sid;", False, uid)


def drugstaken(uid):
    return executeSQL("select * from users u, input i, antibiotics a where u.uid = i.uid and i.aid = a.aid and u.uid = %d;", False, uid)
