from flask import request, jsonify, session, redirect, make_response
from app.database import get_db_connection, verify_user, verify_admin_user
from markupsafe import escape
from psycopg2.extras import RealDictCursor
from werkzeug.security import generate_password_hash
from werkzeug.utils import secure_filename
import os
from app.users.database import create
from datetime import datetime


def address():
    data=request.json
    token_payload = getattr(request, 'token_payload', None)
    if token_payload:
        userid = token_payload.get('user_id')
    elif session.get('user'):
        userid = session.get('user')
    else:
        userid = escape(data.get('user'))

    if not userid:
        return jsonify({"error": "User ID not found"}), 401

    name=data.get('name')
    phoneNumber=data.get('phoneNumber')
    pinCode=data.get('pinCode')
    locality=data.get('locality')
    address=data.get('address')
    state=data.get('state')
    landmark=data.get('landmark')
    alternatephone=data.get('alternatePhone')
    addresstype=data.get('addressType')
    latitude=data.get('latitude')
    longitude=data.get('longitude')
    addressPurpose=data.get('addressPurpose')

    conn=get_db_connection()
    cursor=conn.cursor()

    cursor.execute("""Insert into user_address(userid,name, phone_number, pincode, locality, address, state, landmark, alternate_phone, address_type,addresspurpose,latitude, longitude)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,%s)
            RETURNING *; 
        """,(userid,name,phoneNumber,pinCode,locality,address,state,landmark,alternatephone,addresstype,addressPurpose,latitude,longitude))
    new_address_id = cursor.fetchone()
    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({
        "message": "Address added successfully",
        "address_id": new_address_id
    }), 201

def address_view():
    token_payload = getattr(request, 'token_payload', None)
    if token_payload:
        userid = token_payload.get('user_id')
    elif session.get('user'):
        userid = session.get('user')

    if not userid:
        return jsonify({"error": "User ID not found"}), 401

    conn=get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    cursor.execute("""
        SELECT * FROM user_address
        WHERE userid = %s;
    """, (userid,))
    existing_address = cursor.fetchall()
    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({
        "address":existing_address
    }), 201