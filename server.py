from flask import Flask
from tkinter import messagebox
import mysql.connector
import json
import math
import random
import smtplib
import os, sys
import time
import threading

app = Flask(__name__)

email_otp = {}

@app.route('/generateOTP')
def generateOTP(data):

    email = data['email']

    digits="0123456789"
    OTP = ""
    for _ in range(6):
        OTP += digits[math.floor(random.random()*10)]

    global email_otp
    email_otp[email] = OTP
    
    global start
    start = time.time()

    ## Sending OTP on email

    msg= 'Dear User,\nOTP Verification code is {} Note..  Please enter otp within 2 minutes, otherwise it becomes invalid'.format(OTP)
    s = smtplib.SMTP('smtp.gmail.com', 587)
    s.starttls()
    s.login("naresh.kaushal.17003@iitgoa.ac.in", "kbvzrbrvxgdaypfg")
    s.sendmail('naresh.kaushal.17003@iitgoa.ac.in', email, msg)

    ## from here we will move to the window where we have to enter the otp
    return True

@app.route('/verifyOTP')
def verify(data):

    email = data['email']
    otp = data['otp']

    global email_otp

    end=time.time()          # timers ends when the user clicks verfiy
    t = format(end - start)

    if float(t) >= 120:      # Check it the user enters above 2 minutes. So i set as >=120
        ## messagebox.showinfo("Time out", "Session Expired ...Time out Please regenerate OTP")
        del email_otp[email] # delete the email id since otp is expired
        return False

    else:
        otpStored = email_otp[email]

        del email_otp[email]

        if(otp == otpStored):
            return True
        else:
            return False


@app.route('/updateDatabase')
def updateDatabase(data):

    mydb = mysql.connector.connect(user='nkaushal', password='',
                                   host='127.0.0.1', database='mydatabse')

    mycursor = mydb.cursor()

    firstName = data['first name']
    lastName = data['last name']
    email = data['email']
    phone = data['phone']
    location = data['location']  # location of potholes
    pincode = data['pincode']
    numOfPotholes = data['numOfPotholes']
    description = data['description']

    sql = "INSERT INTO formtable (firstName, lastName, email, phone, location, pincode, numOfPotholes, description) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"

    values = (firstName, lastName, email, phone, location, pincode, numOfPotholes, description)

    mycursor.execute(sql, values)

    mydb.commit()
    # print(mycursor.rowcount, "record inserted.")

    return True


def formatReply(ans, reply):

    reply = reply[2:-3]

    ans = ans + ";"+ reply

    return ans

@app.route('/showReplies')
def updateReply(data):

    mydb = mysql.connector.connect(user='nkaushal', password='',
                                   host='127.0.0.1', database='mydatabse')

    mycursor = mydb.cursor()

    email = data['email']
    reply = data['reply']
    complaintId = data['complaintId']

    email = "'"+email+"'"

    sql = "SELECT reply FROM replies WHERE emailId = %s AND complaintId = %s" %(email, 223)

    mycursor.execute(sql)

    ans = mycursor.fetchall()

    finalReply = ""

    if(len(ans) == 0):
        finalReply = reply

    else:
        finalReply = formatReply(ans, reply)

    new_sql = "UPDATE replies SET reply = %s WHERE emailId = %s AND complaintId = %s" %(finalReply, email, 223)

    mycursor.execute(new_sql)

    return True


@app.route('/displayQueries')
def displayQueries(data):

    mydb = mysql.connector.connect(user='nkaushal', password='',
                                   host='127.0.0.1', database='mydatabse')

    mycursor = mydb.cursor()

    email = data['email']

    email = "'"+email+"'"


    sql = "SELECT reply FROM replies WHERE emailId = %s" %(email)

    mycursor.execute(sql)

    ans = mycursor.fetchall()











