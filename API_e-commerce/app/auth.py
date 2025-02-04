from flask import request, jsonify, session, redirect, make_response
from werkzeug.security import generate_password_hash, check_password_hash
from app.database import get_db_connection, verify_user,verify_admin_user
import time
import os
from markupsafe import escape
from werkzeug.utils import secure_filename
from psycopg2.extras import RealDictCursor
from app.authTokens import generate_token, validate_token

SESSION_TIMEOUT = 5 * 60
WARNING_TIME = 2 * 60

def register():
    data = request.json
    print(data)
    name = data.get('fullname', '').strip()
    email = data.get('email', '').strip()
    password = data.get('password', '').strip()

    if not all([name, email, password]):
        return jsonify({"error": "All fields are required"}), 400

    hashed_password = generate_password_hash(password, method='pbkdf2:sha256', salt_length=16)
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT email FROM users WHERE email = %s", (email,))
        if cursor.fetchone():
            return jsonify({"error": "User already exists"}), 400

        cursor.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s)",
                       (name, email, hashed_password))
        conn.commit()
        return jsonify({"message": "Registration successful"}), 201
    finally:
        conn.close()


def login():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid request"}), 400

    username = data.get('email', '').strip()
    password = data.get('password', '').strip()

    user_id = verify_user(username, password)

    if user_id:
        user_data = {
            'user_id': user_id,
            'email': username,
            'is_admin': False
        }

        token = generate_token(user_data)

        session['token'] = token
        session['user_id'] = user_id
        session.permanent = True

        return jsonify({
            "message": "true",
            "user": user_id,
            "token": token
        }), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401

def admin_login():
    if request.method == 'POST' or request.method == 'GET':
        data = request.get_json()
        print(data)
        if not data:
            return jsonify({"error": "Invalid request"}), 400

        username = data.get('email', '').strip()
        password = data.get('password', '').strip()

        user_id = verify_admin_user(username, password)
        if user_id:
            user_data = {
                'user_id': user_id,
                'email': username,
                'is_admin': True
            }

            token = generate_token(user_data)

            session['token'] = token
            session['user_id'] = user_id
            session.permanent = True

            return jsonify({
                "message": "true",
                "user": user_id,
                "token": token
            }), 200
        else:
            return jsonify({"error": "Invalid credentials"}), 401

def check_session():
    if 'user_id' in session:
        last_active = session.get('last_active', time.time())
        time_elapsed = time.time() - last_active

        if time_elapsed > SESSION_TIMEOUT:
            session.clear()
            return jsonify({"status": "logged_out", "message": "Session timed out"}), 401
        elif time_elapsed > SESSION_TIMEOUT - WARNING_TIME:

            return jsonify({"status": "warning", "remaining_time": SESSION_TIMEOUT - time_elapsed})
        else:
            session['last_active'] = time.time()
            return jsonify({"status": "active"})

    token = session.get('token')
    if token and validate_token(token):
        return jsonify({
            'session_valid': True,
            'user_id': session.get('user_id')
        }), 200

    return jsonify({'status': 'logged_out', 'message': 'No active session'}), 401

def user(user_id):
    global connection
    if not user_id:
        return jsonify({"error": "Not logged in"}), 401

    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("SELECT id, email, first_name,phone_number,profile_path FROM users WHERE id = %s",
                       (user_id,))
        user = cursor.fetchone()

        if user:
            return jsonify({
                "id": user[0],
                "email": user[1],
                "name": user[2],
                "phone_number":user[3],
                "profile_picture": user[4]
            })
        else:
            return jsonify({"error": "User not found"}), 404
    finally:
        if connection:
            connection.close()


def handle_seller_registration():
    conn = get_db_connection()
    cursor = conn.cursor() if conn else None

    if request.method == "POST":
        try:
            data = request.form.to_dict()
            print(data)
            files = request.files

            token_payload = getattr(request, 'token_payload', None)

            if token_payload:
                userid = token_payload.get('user_id')
            elif session.get('user'):
                userid = session.get('user')
            else:
                userid = escape(data.get('user'))

            cursor.execute("SELECT * FROM Seller_Registation WHERE userid = %s", (userid,))
            existing_user = cursor.fetchone()

            if existing_user:
                user_data = {
                    "userid": existing_user[0],
                    "name": existing_user[1],
                    "dob": existing_user[2],
                    "country": existing_user[3],
                    "state": existing_user[4],
                    "place": existing_user[5],
                    "mobile_no": existing_user[6],
                    "email": existing_user[7],
                    "profile_picture_path": existing_user[8],
                    "company_name": existing_user[9],
                    "official_mobile_no": existing_user[10],
                    "official_email": existing_user[11],
                    "certificate_path": existing_user[12],
                    "bank_name": existing_user[13],
                    "branch_ifsc_code": existing_user[14],
                    "account_holder_name": existing_user[15],
                    "account_number": existing_user[16],
                    "swift_bic": existing_user[17],
                    "upi_id": existing_user[18],
                    "paypal_email": existing_user[19],
                    "payment_terms_accepted": existing_user[20],
                    "ie_code": existing_user[21],
                    "ie_certificate_path": existing_user[22],
                    "exporter_terms_accepted": existing_user[23]
                }
                return jsonify({"message": "User already exists", "user_data": user_data}), 200
            name = escape(data.get('fullName'))
            dob = escape(data.get('dob'))
            country = escape(data.get('country'))
            state = escape(data.get('state'))
            place = escape(data.get('place'))
            mobile_no = escape(data.get('mobileNo'))
            email = escape(data.get('email'))

            profile = files.get('profilePicture')
            profile_filepath = None
            if profile and profile.filename:
                filename = secure_filename(profile.filename)
                profile_filepath = os.path.join('./uploads/profile', filename)
                os.makedirs('./uploads/profile', exist_ok=True)
                profile.save(profile_filepath)

            company_name = escape(data.get('companyName'))
            official_mobile_no = escape(data.get('officialMobileNo'))
            official_email = escape(data.get('officialEmail'))

            certificate_upload = files.get('certificateUpload')
            certificate_filepath = None
            if certificate_upload and certificate_upload.filename:
                filename = secure_filename(certificate_upload.filename)
                certificate_filepath = os.path.join('./uploads/certificate', filename)
                os.makedirs('./uploads/certificate', exist_ok=True)
                certificate_upload.save(certificate_filepath)

            bank_name = escape(data.get('bankName'))
            branch_ifsc_code = escape(data.get('branchIFSCCode'))
            account_holder_name = escape(data.get('accountHolderName'))
            account_number = escape(data.get('accountNumber'))
            swift_bic = escape(data.get('swiftBIC'))
            upi_id = escape(data.get('upiId'))
            paypal = escape(data.get('payPal'))
            payment_terms_accepted = bool(data.get('paymentTermsAccepted'))

            ie_code = escape(data.get('ieCode'))
            ie_certificate = files.get("ieCertificate")
            ie_certificate_filepath = None
            if ie_certificate and ie_certificate.filename:
                filename = secure_filename(ie_certificate.filename)
                ie_certificate_filepath = os.path.join('./uploads/IEC', filename)
                os.makedirs('./uploads/IEC', exist_ok=True)
                ie_certificate.save(ie_certificate_filepath)

            exporter_terms_accepted = bool(data.get('exporterTermsAccepted'))

            insert_query = """
                    INSERT INTO Seller_Registation (
                        userid,name, dob, country, state, place, mobile_no, email,
                        profile_picture_path, company_name, official_mobile_no, official_email,
                        certificate_path, bank_name, branch_ifsc_code,
                        account_holder_name, account_number, swift_bic, upi_id, paypal_email,
                        payment_terms_accepted, ie_code, ie_certificate_path, exporter_terms_accepted
                    ) VALUES (
                        %s, %s, %s, %s, %s, %s, %s,
                        %s, %s, %s, %s, %s, %s, %s, %s,
                        %s, %s, %s, %s, %s, %s, %s, %s, %s
                    )
                """
            cursor.execute(insert_query, (
                userid, name, dob, country, state, place, mobile_no, email,
                profile_filepath, company_name, official_mobile_no, official_email,
                certificate_filepath, bank_name, branch_ifsc_code,
                account_holder_name, account_number, swift_bic, upi_id, paypal,
                payment_terms_accepted, ie_code, ie_certificate_filepath, exporter_terms_accepted
            ))
            conn.commit()

            registration_data = {
                "userid": userid,
                "name": name,
                "dob": dob,
                "country": country,
                "state": state,
                "place": place,
                "mobile_no": mobile_no,
                "email": email,
                "profile_picture_path": profile_filepath,
                "company_name": company_name,
                "official_mobile_no": official_mobile_no,
                "official_email": official_email,
                "certificate_path": certificate_filepath,
                "bank_name": bank_name,
                "branch_ifsc_code": branch_ifsc_code,
                "account_holder_name": account_holder_name,
                "account_number": account_number,
                "swift_bic": swift_bic,
                "upi_id": upi_id,
                "paypal_email": paypal,
                "payment_terms_accepted": payment_terms_accepted,
                "ie_code": ie_code,
                "ie_certificate_path": ie_certificate_filepath,
                "exporter_terms_accepted": exporter_terms_accepted
            }

            return jsonify({"message": "Seller registration successful", "registration_data": registration_data}), 201


        except Exception as e:
            print(f"Error during seller registration: {e}")
            return jsonify({"error": "An error occurred during registration"}), 500
        finally:
            if cursor:
                cursor.close()
            if conn:
                conn.close()


def add_product():
    if request.method == "POST":
        try:
            conn = get_db_connection()
            cursor = conn.cursor() if conn else None

            data = request.form.to_dict()
            files = request.files
            print(data)
            token_payload = getattr(request, 'token_payload', None)

            if token_payload:
                user_id = token_payload.get('user_id')
            elif session.get('user'):
                user_id = session.get('user')

            else:
                user_id = escape(data.get('user'))


            product_name = escape(data.get('productName'))
            product_description = escape(data.get('productDescription'))
            product_category = escape(data.get('productCategory'))
            sub_category = escape(data.get('subCategory'))
            sub_sub_category = escape(data.get('subSubCategory'))
            product_type = escape(data.get('productType'))
            product_sku = escape(data.get('productSku'))
            unit = escape(data.get('unit'))

            unit_price = data.get('unitPrice') or None
            minimum_order_qty = data.get('minimumOrderQty') or None
            current_stock_qty = data.get('currentStockQty') or None
            discount_type = data.get('discountType') or None
            discount_amount = data.get('discountAmount') or None
            tax_amount = data.get('taxAmount') or None
            tax_calculation = data.get('taxCalculation') or None
            shipping_cost = data.get('shippingCost') or None
            shipping_cost_multiply = data.get('shippingCostMultiply')

            product_thumbnail = files.get('productThumbnail')
            product_thumbnail_path = None

            if product_thumbnail and product_thumbnail.filename:
                filename = secure_filename(product_thumbnail.filename)
                product_thumbnail_path = os.path.join('./uploads/thumbnail', filename)
                os.makedirs('./uploads/thumbnail', exist_ok=True)
                product_thumbnail.save(product_thumbnail_path)

            additional_images = []
            additional_files = files.getlist('additionalImages') or []
            for file in additional_files:
                if file and file.filename:
                    filename = secure_filename(file.filename)
                    file_path = os.path.join('./uploads/additional', filename)
                    os.makedirs('./uploads/additional', exist_ok=True)
                    file.save(file_path)
                    additional_images.append(file_path)

            meta_title = escape(data.get('metaTitle'))
            meta_description = escape(data.get('metaDescription'))

            cursor.execute("""
                INSERT INTO add_product (
                    userid, product_name, product_description, product_category, sub_category,
                    sub_sub_category, product_type, product_sku, unit,
                    unit_price, minimum_order_qty, current_stock_qty, discount_type, discount_amount,
                    tax_amount, tax_calculation, shipping_cost, shipping_cost_multiply,
                    product_thumbnail, additional_images, meta_title, meta_description
                )
                VALUES (
                    %s, %s, %s, %s, %s, %s, %s, %s, %s,
                    %s, %s, %s, %s, %s, %s, %s, %s, %s,
                    %s, %s, %s, %s
                )
            """, (
                user_id, product_name, product_description, product_category, sub_category,
                sub_sub_category, product_type, product_sku, unit,
                unit_price, minimum_order_qty, current_stock_qty, discount_type, discount_amount,
                tax_amount, tax_calculation, shipping_cost, shipping_cost_multiply,
                product_thumbnail_path, ','.join(additional_images), meta_title, meta_description
            ))
            conn.commit()

            return jsonify({'message': 'Product added successfully'}), 200

        except Exception as e:
            print("Error:", str(e))
            return jsonify({'error': 'Failed to add product'}), 400


def admin_product_details():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)

        cursor.execute("SELECT * FROM add_product;")
        products = cursor.fetchall()

        return jsonify({'products': products}), 200

    except Exception as e:
        print("Error:", str(e))
        return jsonify({'error': 'Failed to fetch product details'}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()


def product_details():

    token_payload = getattr(request, 'token_payload', None)

    if token_payload:
        user_id = token_payload.get('user_id')
    else:
        user_id = session.get('user_id')

    if not user_id:
        return jsonify({
            'error': 'Unable to determine user ID',
            'token_payload': token_payload,
            'session': dict(session)
        }), 401

    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)

        cursor.execute("SELECT * FROM add_product WHERE userid = %s;", (user_id,))
        products = cursor.fetchall()

        return jsonify({
            'products': products,
            'user_id': user_id
        }), 200

    except Exception as e:
        print("Database Error:", str(e))
        return jsonify({
            'error': 'Failed to fetch product details',
            'details': str(e)
        }), 500

    finally:
        if 'cursor' in locals() and cursor:
            cursor.close()
        if 'conn' in locals() and conn:
            conn.close()

def delete_product(pid):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        query = "DELETE FROM add_product WHERE pid = %s"
        cursor.execute(query, (pid,))
        conn.commit()

        if cursor.rowcount == 0:
            return jsonify({'error': 'Product not found'}), 404

        return jsonify({'message': 'Product deleted successfully'}), 200

    except Exception as e:
        print("Error:", str(e))
        return jsonify({'error': 'Failed to delete product'}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()


def edit_product(pid):
    try:
        update_data = request.json

        if not update_data:
            return jsonify({'error': 'No data provided for update'}), 400

        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)

        set_clauses = []
        values = []
        for column, value in update_data.items():
            if column not in ['pid', 'userid']:
                set_clauses.append(f"{column} = %s")
                values.append(value)

        values.append(pid)
        print("set_clauses:", set_clauses)
        print("values:", values)

        query = f"""
            UPDATE add_product
            SET {', '.join(set_clauses)}
            WHERE pid = %s
            RETURNING *;
        """
        print("Executing query:", query)

        cursor.execute(query, tuple(values))
        updated_product = cursor.fetchone()
        print("Updated Product:", updated_product)

        conn.commit()

        if not updated_product:
            return jsonify({'error': 'Product not found'}), 404

        return jsonify({'message': 'Product updated successfully', 'product': updated_product}), 200

    except Exception as e:
        print("Error:", str(e))
        return jsonify({'error': 'Failed to update product'}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

def admin_manufacture_list():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM seller_product_view")
    rows = cursor.fetchall()
    column_names = [desc[0] for desc in cursor.description]
    data = [dict(zip(column_names, row)) for row in rows]
    result = {}
    for item in data:
        userid = item["userid"]
        if userid not in result:
            result[userid] = {
                "userid": userid,
                "seller_name": item["seller_name"],
                "seller_email": item["seller_email"],
                "seller_mobile": item["seller_mobile"],
                "company_name": item["company_name"],
                "bank_name": item["bank_name"],
                "branch_ifsc_code": item["branch_ifsc_code"],
                "profile":f'{item["profile_picture_path"]}'.replace("./","") if item["profile_picture_path"] else None,
                "total_products": 0,
                "total_current_quantity": 0,
                "products": []
            }
        result[userid]["total_products"] += 1
        result[userid]["total_current_quantity"] += item["current_stock_qty"] if item["current_stock_qty"] is not None else 0

        result[userid]["products"].append({
            "product_name": item["product_name"],
            "product_category": item["product_category"],
            "sub_category": item["sub_category"],
            "product_description": item["product_description"],
            "unit_price": item["unit_price"],
            "current_stock_qty": item["current_stock_qty"],
            "product_thumbnail":f'{item["product_thumbnail"]}'.replace("./","") if item["product_thumbnail"] else None,
        })

    cursor.close()
    conn.close()
    return jsonify(list(result.values())), 200
def logout():
    session.pop('token', None)
    session.pop('user_id', None)
    session.clear()
    return jsonify({'message': 'Logged out successfully'}), 200