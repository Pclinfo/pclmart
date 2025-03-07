import os.path

from flask import request, jsonify, session, redirect, make_response
from app.database import get_db_connection, verify_user, verify_admin_user
from psycopg2.extras import RealDictCursor
from werkzeug.utils import secure_filename


def get_product_status():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute("SELECT pid,active_status, is_featured FROM product_status")
        status_record = cursor.fetchall()

        if not status_record:
            return jsonify({'error': 'Product not found'}), 404

        return jsonify({'status': status_record}), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({'error': 'Internal server error'}), 500

    finally:
        cursor.close()
        conn.close()


def toggle_product_status(product_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)

        cursor.execute("SELECT active_status FROM product_status WHERE pid = %s", (product_id,))
        status_record = cursor.fetchone()

        if not status_record:
            return jsonify({'error': 'Product not found'}), 404

        current_status = status_record['active_status']
        new_status = not current_status

        cursor.execute(
            "UPDATE product_status SET active_status = %s WHERE pid = %s",
            (new_status, product_id)
        )
        conn.commit()

        return jsonify({'success': True, 'active_status': new_status}), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({'error': 'Internal server error'}), 500
    finally:
        cursor.close()
        conn.close()


def toggle_product_featured(product_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)

        cursor.execute("SELECT is_featured FROM product_status WHERE pid = %s", (product_id,))
        featured_record = cursor.fetchone()

        if not featured_record:
            return jsonify({'error': 'Product not found'}), 404

        current_featured = featured_record['is_featured']
        new_featured = not current_featured

        # Update the featured status
        cursor.execute(
            "UPDATE product_status SET is_featured = %s WHERE pid = %s",
            (new_featured, product_id)
        )
        conn.commit()

        return jsonify({'success': True, 'is_featured': new_featured}), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({'error': 'Internal server error'}), 500
    finally:
        cursor.close()
        conn.close()


def add_policy(policy):
    table_mapping = {
        "terms": ("terms_and_conditions", "terms"),
        "refund": ("refund_policy", "refund"),
        "privacy": ("privacy_policy", "privacy"),
        "return": ("return_policy", "return"),
        "cancellation": ("cancellation_policy", "cancellation"),
        "shipping": ("shipping_policy", "shipping"),
        "about": ("about_us", "about"),
        "faq": ("faq", "faq"),
        "reliability": ("company_reliability", "reliability")
    }

    if policy not in table_mapping:
        return jsonify({"error": "Invalid policy type"}), 400

    table_name, column_name = table_mapping[policy]
    try:
        con = get_db_connection()
        cur = con.cursor(cursor_factory=RealDictCursor)
        data = request.json
        text = data.get(column_name)

        cur.execute(f"SELECT id FROM {table_name} LIMIT 1")
        existing_record = cur.fetchone()

        if existing_record:
            cur.execute(f"UPDATE {table_name} SET {column_name} = %s WHERE id = %s", (text, existing_record[0]))
            message = f"{policy.replace('_', ' ').title()} updated successfully"
        else:
            cur.execute(f"INSERT INTO {table_name} ({column_name}) VALUES (%s)", (text,))
            message = f"{policy.replace('_', ' ').title()} added successfully"

        con.commit()
        cur.close()
        con.close()
        return jsonify({"message": message}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def show_policy(policy):
    table_mapping = {
        "terms": ("terms_and_conditions", "terms"),
        "refund": ("refund_policy", "refund"),
        "privacy": ("privacy_policy", "privacy"),
        "return": ("return_policy", "return"),
        "cancellation": ("cancellation_policy", "cancellation"),
        "shipping": ("shipping_policy", "shipping"),
        "about": ("about_us", "about"),
        "faq": ("faq", "faq"),
        "reliability": ("company_reliability", "reliability")
    }

    if policy not in table_mapping:
        return jsonify({"error": "Invalid policy type"}), 400

    table_name, column_name = table_mapping[policy]

    try:
        con = get_db_connection()
        cur = con.cursor(cursor_factory=RealDictCursor)

        cur.execute(f"SELECT {column_name} FROM {table_name} LIMIT 1")
        record = cur.fetchone()

        cur.close()
        con.close()

        if record:
            return jsonify(record), 200
        else:
            return jsonify({"message": "No data found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500


def social_media():
    try:
        data = request.json
        social_fields = ["facebook", "instagram", "X", "linkedin", "pinterest", "whatsapp"]
        filled_fields = {key: value for key, value in data.items() if value and key in social_fields}

        if len(filled_fields) != 1:
            return jsonify({"error": "Only one social media field should be filled at a time"}), 400
        column_name, column_value = next(iter(filled_fields.items()))

        con = get_db_connection()
        cur = con.cursor(cursor_factory=RealDictCursor)
        cur.execute(f"UPDATE social_media SET {column_name} = %s WHERE {column_name} IS NOT NULL", (column_value,))

        if cur.rowcount == 0:
            cur.execute(f"INSERT INTO social_media ({column_name}) VALUES (%s)", (column_value,))

        con.commit()
        cur.close()
        con.close()

        return jsonify({"message": f"{column_name} updated successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


def show_media():
    con = get_db_connection()
    cur = con.cursor(cursor_factory=RealDictCursor)

    cur.execute(f"SELECT * FROM social_media")
    record = cur.fetchall()

    if record:
        return jsonify({"media": record}), 200
    else:
        return jsonify({"message": "No data found"}), 404


def banner_setup():
    con = get_db_connection()
    cur = con.cursor(cursor_factory=RealDictCursor)

    data = request.form.to_dict()
    files = request.files

    banner_image = files.get('banner_image')
    banner_type = data.get('banner_type')
    published = data.get('published')

    if banner_image and banner_image.filename:
        file_name = secure_filename(banner_image.filename)
        file_path = os.path.join('./uploads/banner', file_name)
        os.makedirs('./uploads/banner', exist_ok=True)
        banner_image.save(file_path)

    cur.execute('''
    Insert into banner_setup (image,banner_type,published) values (%s,%s,%s) RETURNING id
    ''', (file_path, banner_type, published))
    banner_id = cur.fetchone()['id']
    con.commit()
    cur.close()
    con.close()
    return jsonify({"message": "Banner added", "id": banner_id})


def get_banners():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT * FROM banner_setup;")
    banners = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(banners)


def update_banner(id):
    data = request.json
    banner_image = data.get('image')
    banner_type = data.get('banner_type')
    published = data.get('published')

    if banner_image and banner_image.filename:
        file_name = secure_filename(banner_image.filename)
        file_path = os.path.join('./uploads/banner', file_name)
        os.makedirs('./uploads/banner', exist_ok=True)
        banner_image.save(file_path)

    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute(
        "UPDATE banner_setup SET image=%s, banner_type=%s, published=%s WHERE id=%s RETURNING id;",
        (file_path, banner_type, published, id)
    )
    updated_id = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()

    if updated_id:
        return jsonify({"message": "Banner updated", "id": id})
    else:
        return jsonify({"error": "Banner not found"}), 404


def delete_banner(id):
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("DELETE FROM banner_setup WHERE id=%s RETURNING id;", (id,))
    deleted_id = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()

    if deleted_id:
        return jsonify({"message": "Banner deleted", "id": id})
    else:
        return jsonify({"error": "Banner not found"}), 404


def add_coupon():
    data = request.json
    keys = ["coupon_type", "coupon_title", "coupon_code", "coupon_Bearer", "vendor",
            "customer", "usage_limit", "discount_type", "discount_amount", "minimum_purchase",
            "start_date", "expiry_date"]

    values = [data.get(k) for k in keys]

    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute(
        f"INSERT INTO coupons ({', '.join(keys)}) VALUES ({', '.join(['%s'] * len(keys))}) RETURNING id;",
        values
    )
    coupon_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({"message": "Coupon added", "id": coupon_id}), 201


def get_coupons():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("SELECT * FROM coupons;")
    coupons = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(coupons)


def update_coupon(id):
    data = request.json
    update_fields = [f"{key}=%s" for key in data.keys()]
    values = list(data.values()) + [id]

    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute(
        f"UPDATE coupons SET {', '.join(update_fields)} WHERE id=%s RETURNING id;",
        values
    )
    updated_id = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()

    if updated_id:
        return jsonify({"message": "Coupon updated", "id": id})
    else:
        return jsonify({"error": "Coupon not found"}), 404


def delete_coupon(id):
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("DELETE FROM coupons WHERE id=%s RETURNING id;", (id,))
    deleted_id = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()

    if deleted_id:
        return jsonify({"message": "Coupon deleted", "id": id})
    else:
        return jsonify({"error": "Coupon not found"}), 404


def get_flash_deals():
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    cursor.execute("SELECT id, title, duration, status, active_products, is_published FROM flash_deals")
    deals = cursor.fetchall()
    conn.close()
    return jsonify(deals)


def add_flash_deal():
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    data = request.json
    files = request.files
    flash_image = files.get("image")
    if flash_image and flash_image.filename:
        file_name = secure_filename(flash_image.filename)
        file_path = os.path.join('./uploads/flash', file_name)
        os.makedirs('./uploads/flash', exist_ok=True)
        flash_image.save(file_path)

    cursor.execute(
        "INSERT INTO flash_deals (title, duration, status, active_products, is_published) VALUES (%s, %s, %s, %s, %s)",
        (data["title"], data["duration"], data["status"], data["activeProducts"], data["isPublished"]))
    conn.commit()
    conn.close()
    return {"message": "Flash deal added successfully!"}, 201


def update_flash_deal(deal_id):
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    data = request.json
    print(data)
    cursor.execute(
        "UPDATE flash_deals SET title=%s, duration=%s, status=%s, active_products=%s, is_published=%s WHERE id=%s",
        (data["title"], data["duration"], data["status"], data["activeProducts"], data["isPublished"], deal_id))
    conn.commit()
    conn.close()
    return {"message": "Flash deal updated successfully!"}


def delete_flash_deal(deal_id):
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("DELETE FROM flash_deals WHERE id=%s", (deal_id,))
    conn.commit()
    conn.close()
    return {"message": "Flash deal deleted successfully!"}


def get_day_deals():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute("SELECT id, title, product, status FROM deals_of_the_day")
        deals = cursor.fetchall()
        cursor.close()
        return jsonify({"success": True, "deals": deals}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


def add_day_deal():
    try:
        data = request.json
        print(data)
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute(
            "INSERT INTO deals_of_the_day (title, product, status) VALUES (%s, %s, %s) RETURNING id",
            (data["title"], data["product"], data["status"]),
        )
        deal_id = cursor.fetchone()
        # deal_id = "success"
        conn.commit()
        cursor.close()
        return jsonify({"success": True, "deal_id": deal_id}), 201
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


def update_day_deal(deal_id):
    try:
        data = request.json
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute(
            "UPDATE deals_of_the_day SET title=%s, product=%s, status=%s WHERE id=%s",
            (data["title"], data["product"], data["status"], deal_id),
        )
        conn.commit()
        cursor.close()
        return jsonify({"success": True, "message": "Deal updated"}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


def delete_day_deal(deal_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute("DELETE FROM deals_of_the_day WHERE id = %s", (deal_id,))
        conn.commit()
        cursor.close()
        return jsonify({"success": True, "message": "Deal deleted"}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


def get_feature_deal():
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT * FROM feature_deals ORDER BY id ASC")
    deals = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(deals)


def add_feature_deal():
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    query = """
    INSERT INTO feature_deals (title, start_date, end_date, status, is_active)
    VALUES (%s, %s, %s, %s, %s) RETURNING id;
    """
    cursor.execute(query, (data['title'], data['start_date'], data['end_date'], data['status'], data['is_active']))
    new_id = cursor.fetchone()
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Feature deal added successfully!", "id": new_id}), 201


def update_feature_deal(id):
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()
    query = """
    UPDATE feature_deals 
    SET title = %s, start_date = %s, end_date = %s, status = %s, is_active = %s 
    WHERE id = %s;
    """
    cursor.execute(query, (data['title'], data['start_date'], data['end_date'], data['status'], data['is_active'], id))

    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Feature deal updated successfully!"})


def delete_feature_deal(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM feature_deals WHERE id = %s", (id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Feature deal deleted successfully!"})


def get_customers():
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("""SELECT u.id, u.name, u.email,o.quantity,u.mobile_number,  
                      TO_CHAR(u.created_at, 'DD/MM/YYYY') AS created_at
               FROM users_login u
               FULL JOIN orders o ON u.id = o.user_id
            """)
    customers = cursor.fetchall()
    conn.close()
    return jsonify(customers)


def filter_customers():
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    query = """
        SELECT u.id, u.name, u.email, o.quantity, u.mobile_number,  
               TO_CHAR(u.created_at, 'DD/MM/YYYY') AS created_at 
        FROM users_login u
        FULL JOIN orders o ON u.id = o.user_id
    """

    params = []
    conditions = []

    if 'searchTerm' in data and data['searchTerm']:
        conditions.append("u.name ILIKE %s OR u.email ILIKE %s OR u.mobile_number ILIKE %s")
        search_term = f"%{data['searchTerm']}%"
        params.extend([search_term, search_term, search_term])

    if conditions:
        query += " WHERE " + " AND ".join(conditions)

    query += " ORDER BY u.id LIMIT %s"
    params.append(data.get('limit', 100))

    cursor.execute(query, params)
    customers = cursor.fetchall()
    conn.close()
    return jsonify(customers)

def add_new_vendor():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "Invalid input"}), 400

        token_payload = getattr(request, 'token_payload', None)

        if token_payload:
            user_id = token_payload.get('user_id')
        else:
            user_id = session.get('user_id')

        first_name = data.get("firstName")
        last_name = data.get("lastName")
        phone = data.get("phone")
        email = data.get("email")
        password = data.get("password")
        shop_name = data.get("shopName")
        shop_address = data.get("shopAddress")

        if not (first_name and last_name and phone and email and password and shop_name and shop_address):
            return jsonify({"error": "Missing required fields"}), 400

        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)

        cursor.execute("SELECT * FROM vendors WHERE email = %s", (email,))
        existing_vendor = cursor.fetchone()
        if existing_vendor:
            return jsonify({"error": "Vendor with this email already exists"}), 409

        # Insert vendor into the database
        cursor.execute("""
            INSERT INTO vendors (user_id,first_name, last_name, phone, email, password, shop_name, shop_address)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id
        """, (user_id,first_name, last_name, phone, email, password, shop_name, shop_address))
        vendor_id = cursor.fetchone()["id"]
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Vendor added successfully", "vendor_id": vendor_id}), 201

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Internal server error"}), 500


def get_vendors():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)

        cursor.execute("SELECT * FROM vendors;")
        vendors = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify(vendors), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def get_vendor(vendor_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)

        cursor.execute("SELECT * FROM vendors WHERE id = %s;", (vendor_id,))
        vendor = cursor.fetchone()

        cursor.close()
        conn.close()

        if vendor:
            return jsonify(vendor), 200
        else:
            return jsonify({"message": "Vendor not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def update_vendor(vendor_id):
    try:
        data = request.json
        conn = get_db_connection()
        cursor = conn.cursor()

        query = """
        UPDATE vendors 
        SET first_name = %s, last_name = %s, phone = %s, email = %s, shop_name = %s, shop_address = %s
        WHERE id = %s;
        """
        cursor.execute(query, (
            data['firstName'], data['lastName'], data['phone'], data['email'],
            data['shopName'], data['shopAddress'], vendor_id
        ))

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"message": "Vendor updated successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def delete_vendor(vendor_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("DELETE FROM vendors WHERE id = %s;", (vendor_id,))
        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({"message": "Vendor deleted successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500