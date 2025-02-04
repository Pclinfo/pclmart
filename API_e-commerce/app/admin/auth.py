from flask import request, jsonify, session, redirect, make_response
from app.database import get_db_connection, verify_user, verify_admin_user

from psycopg2.extras import RealDictCursor


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

        # Get current active_status
        cursor.execute("SELECT active_status FROM product_status WHERE pid = %s", (product_id,))
        status_record = cursor.fetchone()

        if not status_record:
            return jsonify({'error': 'Product not found'}), 404

        current_status = status_record['active_status']
        new_status = not current_status

        # Update the status
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

        # Get current is_featured
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
