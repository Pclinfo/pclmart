from flask import Blueprint, send_from_directory
from app.auth import register, login, admin_login, check_session, user, handle_seller_registration, add_product, logout
from app.auth import edit_product, delete_product, admin_product_details, product_details, product_detail_id, \
    admin_manufacture_list
from app.models import get_dashboard_data
from flask_cors import cross_origin
from app.authTokens import token_required
from app.users.login import user_login, user_login_id, user_register, user_product_details, get_single_product_details,update_tem_close
from app.users.login import user_profile_edit, create_ticket, view_ticket, delete_ticket,get_tem_close_status
from app.users.address import address, address_view, address_delete, edit_address
import os
from app.admin.database import create
from app.admin.auth import toggle_product_status, toggle_product_featured, get_product_status, add_policy, show_policy, \
    social_media, show_media,add_new_vendor
from app.admin.auth import banner_setup, get_banners, delete_banner, update_banner, add_coupon, get_coupons, \
    update_coupon, delete_coupon
from app.admin.auth import add_feature_deal,get_feature_deal,delete_feature_deal,update_feature_deal
from app.admin.auth import get_flash_deals, add_flash_deal, delete_flash_deal, update_flash_deal, get_day_deals, \
    update_day_deal, delete_day_deal, add_day_deal,filter_customers,get_customers
from app.users.product import new_arrivals, best_selling, get_top_selling, add_rating, add_to_cart, get_featured_deals, \
    set_featured, get_user_orders
from app.users.product import order_insert

blueprint = Blueprint('routes', __name__)

UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')


@blueprint.route("/", methods=['GET', 'POST'])
def home():
    return "<H1>Connected</H1>"


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


@blueprint.route('/admin_product_details', methods=['POST'])
def admin_product_detail_route():
    return admin_product_details()


@blueprint.route('/product_details/', methods=['POST'])
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


@blueprint.route('/orders', methods=['GET', 'POST'])
@token_required
@cross_origin()
def get_user_orders_route():
    return get_user_orders()


@blueprint.route('/insert_order', methods=['GET', 'POST'])
@token_required
@cross_origin()
def order_insert_route():
    return order_insert()


@blueprint.route('/terms&conditions/<policy>', methods=['GET', 'POST'])
@cross_origin()
def termsandconditions_route(policy):
    return add_policy(policy)


@blueprint.route('/show_terms/<policy>', methods=['GET', 'POST'])
@cross_origin()
def show_terms_route(policy):
    return show_policy(policy)


@blueprint.route('/social_media', methods=['GET', 'POST'])
@cross_origin()
def social_media_route():
    return social_media()


@blueprint.route('/show_media', methods=['GET', 'POST'])
@cross_origin()
def show_media_route():
    return show_media()


@blueprint.route('/banner', methods=['GET', 'POST'])
@cross_origin()
def banner_route():
    return banner_setup()


@blueprint.route('/show_banner', methods=['GET'])
@cross_origin()
def show_banner_route():
    return get_banners()


@blueprint.route('/update_banner/<int:id>', methods=['PUT'])
@cross_origin()
def update_banner_route(id):
    return update_banner(id)


@blueprint.route('/delete_banner/<int:id>', methods=['DELETE'])
@cross_origin()
def delete_banner_route(id):
    return delete_banner(id)


@blueprint.route('/add_coupon', methods=['POST'])
@cross_origin()
def add_coupon_route():
    return add_coupon()


@blueprint.route('/show_coupon', methods=['GET'])
@cross_origin()
def show_coupon_route():
    return get_coupons()


@blueprint.route('/update_coupon/<int:id>', methods=['PUT'])
@cross_origin()
def update_coupon_route(id):
    return update_coupon(id)


@blueprint.route('/delete_coupon/<int:id>', methods=['PUT'])
@cross_origin()
def delete_coupon_route(id):
    return delete_coupon(id)


@blueprint.route('/flash-deals', methods=["GET"])
@cross_origin()
def get_deals():
    return get_flash_deals()


@blueprint.route('/flash-deals', methods=["POST"])
@cross_origin()
def add_deals():
    return add_flash_deal()


@blueprint.route('/flash-deals/<int:deal_id>', methods=["PUT"])
@cross_origin()
def update_deals(deal_id):
    return update_flash_deal(deal_id)


@blueprint.route('/flash-deals/<int:deal_id>', methods=["DELETE"])
@cross_origin()
def del_deals(deal_id):
    return delete_flash_deal(deal_id)


@blueprint.route("/day_deals", methods=["GET"])
@cross_origin()
def get_day_deals_route():
    return get_day_deals()


@blueprint.route("/day_deals", methods=["POST"])
@cross_origin()
def add_day_deal_route():
    return add_day_deal()


@blueprint.route("/day_deals/<int:deal_id>", methods=["PUT"])
@cross_origin()
def update_day_deal_route(deal_id):
    return update_day_deal(deal_id)


@blueprint.route("/day_deals/<int:deal_id>", methods=["DELETE"])
@cross_origin()
def delete_day_deal_route(deal_id):
    return delete_day_deal(deal_id)

@blueprint.route('/feature_deal',methods=["GET"])
@cross_origin()
def get_feature_deal_route():
    return get_feature_deal()
    

@blueprint.route('/feature_deal',methods=["POST"])
@cross_origin()
def add_feature_deals_route():
    return add_feature_deal()


@blueprint.route('/feature_deal/<int:id>',methods=["PUT"])
@cross_origin()
def update_feature_deals_route(id):
    return update_feature_deal(id)

@blueprint.route('/feature_deal/<int:id>',methods=["DELETE"])
@cross_origin()
def delete_feature_deals_route(id):
    return delete_feature_deal(id)

@blueprint.route('/customer_list',methods=['GET'])
@cross_origin()
def customer_list_route():
    return get_customers()


@blueprint.route('/filter_customer_list',methods=['POST'])
@cross_origin()
def filter_list_route():
    return filter_customers()

@blueprint.route('/update_tem_close',methods=['GET','POST'])
@token_required
@cross_origin()
def update_tem_close_route():
    return update_tem_close()

@blueprint.route('/get_tem_close_status', methods=['GET'])
@token_required
@cross_origin()
def get_tem_close_status_route():
    return get_tem_close_status()

@blueprint.route('/add_new_vendor',methods=['GET','POST'])
@token_required
@cross_origin()
def add_new_vendor_route():
    add_new_vendor()