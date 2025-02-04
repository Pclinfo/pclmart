from flask import Blueprint, send_from_directory
from app.auth import register, login, admin_login, check_session, user, handle_seller_registration, add_product, logout
from app.auth import edit_product, delete_product, admin_product_details, product_details, product_detail_id,admin_manufacture_list
from app.models import get_dashboard_data
from flask_cors import cross_origin
from app.authTokens import token_required
from app.users.login import user_login, user_login_id, user_register, user_product_details, get_single_product_details
from app.users.login import user_profile_edit, create_ticket,view_ticket ,delete_ticket
from app.users.address import address,address_view,address_delete,edit_address
import os
from app.admin.database import create
from app.admin.auth import toggle_product_status, toggle_product_featured, get_product_status
from app.users.product import new_arrivals,best_selling,get_top_selling,add_rating,add_to_cart,get_featured_deals, set_featured,get_user_orders
from app.users.product import order_insert
blueprint = Blueprint('routes', __name__)

UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')


@blueprint.route("/register", methods=['GET', 'POST'])
def register_route():
    return register()


@blueprint.route("/login", methods=["POST"])
def login_route():
    return login()


@blueprint.route('/dashboard/<int:userid>', methods=['GET', 'POST'])
def dashboard_route(userid):
    return get_dashboard_data(userid)


@blueprint.route('/check_session', methods=['GET', 'POST'])
def check_session_route():
    return check_session()


@blueprint.route('/user/<int:user_id>', methods=['GET', 'POST'])
@cross_origin()
def user_route(user_id):
    return user(user_id)


@blueprint.route('/register-seller', methods=['GET', 'POST'])
@cross_origin()
@token_required
def seller_register():
    return handle_seller_registration()


@blueprint.route('/seller-add-new-product', methods=['GET', 'POST'])
@cross_origin()
@token_required
def seller_add_new_product():
    return add_product()


@blueprint.route('/admin_product_details', methods=['GET', 'POST'])
def admin_product_detail_route():
    return admin_product_details()




@blueprint.route('/product_details/', methods=['GET', 'POST'])
@token_required
@cross_origin()
def get_product_detail():
    return product_details()


@blueprint.route('/product_detail/<int:pid>', methods=['GET', 'POST'])
@token_required
@cross_origin()
def product_detail_route(pid):
    return product_detail_id(pid)


@blueprint.route('/uploads/<path:filename>', methods=['GET', 'POST'])
def serve_uploads(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)


@blueprint.route('/delete_product/<int:pid>', methods=['DELETE'])
def delete_product_route(pid):
    return delete_product(pid)


@blueprint.route('/edit-product/<int:pid>', methods=['PATCH'])
@cross_origin()
@token_required
def edit_product_route(pid):
    return edit_product(pid)


@blueprint.route('/admin_login', methods=["POST", "GET"])
def admin_login_route():
    return admin_login()


@blueprint.route("/user_login", methods=["POST"])
def user_login_id_route():
    return user_login()


@blueprint.route("/user_login/<int:user_id>", methods=['GET', "POST"])
@token_required
@cross_origin()
def user_login_route(user_id):
    return user_login_id(user_id)


@blueprint.route("/user_register", methods=['GET', 'POST'])
def user_register_route():
    return user_register()


@blueprint.route('/logout', methods=['GET', 'POST'])
def logout_route():
    return logout()


@blueprint.route('/admin_manufacture_list', methods=['GET', 'POST'])
def admin_manufacture_list_route():
    return admin_manufacture_list()


@blueprint.route('/active_products', methods=['GET', 'POST'])
def user_product_detail_route():
    return user_product_details()


@blueprint.route('/user_active_product/<int:pid>', methods=['GET'])
def single_product_detail_route(pid):
    return get_single_product_details(pid)


@blueprint.route('/product_status/<int:product_id>', methods=['GET', 'POST'])
def toggle_product_status_route(product_id):
    return toggle_product_status(product_id)


@blueprint.route('/product_featured/<int:product_id>', methods=['GET', 'POST'])
def toggle_product_featured_route(product_id):
    return toggle_product_featured(product_id)


@blueprint.route('/get_product_status', methods=['GET'])
def status_route():
    return get_product_status()


@blueprint.route('/update-profile', methods=['POST', 'GET', 'PATCH', 'PUT'])
@cross_origin()
@token_required
def user_profile_edit_route():
    return user_profile_edit()


@blueprint.route('/create-ticket', methods=['GET', 'POST'])
@cross_origin()
@token_required
def create_ticket_route():
    return create_ticket()

@blueprint.route('/view-ticket', methods=['GET', 'POST'])
@cross_origin()
@token_required
def view_ticket_route():
    return view_ticket()

@blueprint.route('/delete-ticket', methods=['GET', 'POST'])
@cross_origin()
def delete_ticket_route():
    return delete_ticket()

@blueprint.route('/add-address', methods=['GET', 'POST'])
@cross_origin()
@token_required
def add_address_route():
    return address()

@blueprint.route('/user-address', methods=['GET', 'POST'])
@cross_origin()
@token_required
def user_address_id_route():
    return address_view()

@blueprint.route('/delete-address/<int:id>', methods=['GET', 'POST'])
@cross_origin()
def delete_address_route(id):
    return address_delete(id)

@blueprint.route('/edit-address/<int:id>', methods=['GET', 'POST'])
@cross_origin()
@token_required
def edit_address_route(id):
    return edit_address(id)

@blueprint.route('/new_arrivals', methods=['GET', 'POST'])
def new_arrivals_route():
    return new_arrivals()

@blueprint.route('/best_selling', methods=['GET', 'POST'])
def best_selling_route():
    return best_selling()

@blueprint.route('/top_selling', methods=['GET', 'POST'])
def top_selling_route():
    return get_top_selling()

@blueprint.route('/add_rating', methods=['POST'])
def add_rating_route():
    return add_rating()

@blueprint.route('/add_to_cart', methods=['POST'])
def add_to_cart_route():
    return add_to_cart()


@blueprint.route('/get_featured_deals', methods=['GET'])
def get_featured_deals_route():
    return get_featured_deals()

@blueprint.route('/set_featured', methods=['POST'])
def set_featured_route():
    return set_featured()

@blueprint.route('/orders', methods=['GET','POST'])
@token_required
@cross_origin()
def get_user_orders_route():
    return get_user_orders()

@blueprint.route('/insert_order',methods=['GET','POST'])
@token_required
@cross_origin()
def order_insert_route(I):
    return order_insert()