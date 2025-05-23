import psycopg2
from config.settings import Config
from werkzeug.security import check_password_hash
import bcrypt


def get_db_connection():
    return psycopg2.connect(
        database=Config.DB_NAME,
        user=Config.DB_USER,
        password=Config.DB_PASSWORD,
        host=Config.DB_HOST,
        port=Config.DB_PORT
    )


def verify_user(username, password):
    con = get_db_connection()
    try:
        with con.cursor() as cur:
            cur.execute(
                "SELECT id, password FROM seller_users WHERE email = %s ",
                (username.strip(),)
            )
            result = cur.fetchone()
            if result:
                user_id, hashed_pass = result
                if check_password_hash(hashed_pass, password.strip()):
                    return user_id
            return None
    finally:
        con.close()


def verify_admin_user(email, password):
    con = get_db_connection()
    try:
        with con.cursor() as cur:
            cur.execute("SELECT id, password FROM admin_users WHERE email = %s", (email,))
            result = cur.fetchone()
            if result:
                user_id, hashed_password = result
                if bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8')):
                    return user_id
            return None
    finally:
        con.close()


def create():
    con = get_db_connection()
    cursor = con.cursor()
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS seller_users(
        id SERIAL PRIMARY KEY,
        first_name TEXT NOT NULL,
        last_name  TEXT Default NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT Default 'password',
        phone_number Text default null,
        profile_path Text default null,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        
    );

   Create table if not exists dashboard(
   userid int not null,
   FOREIGN KEY (userid) REFERENCES seller_users(id) ON DELETE CASCADE,
   total_order Int Default Null,
   Total_stores Int  Default Null,
   Total_products Int  Default Null,
   Total_customers Int  Default Null,
   Pending Int  Default Null,
   confirmed Int  Default Null,                                                                                                                                                                                                                                                                                                        
   Packaging Int  Default Null,
   out_of_delivery Int  Default Null,
   Delivered Int  Default Null,
   Canceled Int  Default Null,
   Returned Int  Default Null,
   Failed_to_delivery Int  Default Null,
   in_house_earning decimal(20,2)  Default Null,
   commision_earned decimal(20,2)  Default Null,
   delivery_charge_earned decimal(20,2)  Default Null,
   Total_tax_collected decimal(20,2)  Default Null,
   pending_amount decimal(20,2)  Default Null
   );
   
Create table if not exists Seller_Registation(
    userid int not null,
    FOREIGN KEY (userid) REFERENCES seller_users(id) ON DELETE CASCADE,
    name VARCHAR(255),
    dob DATE,
    country VARCHAR(100),
    state VARCHAR(100),
    place VARCHAR(100),
    mobile_no VARCHAR(50),
    email VARCHAR(255),
    profile_picture_path TEXT,
    company_name VARCHAR(255),
    official_mobile_no VARCHAR(15),
    official_email VARCHAR(255),
    certificate_path TEXT,
    bank_name VARCHAR(255),
    branch_ifsc_code VARCHAR(20),
    account_holder_name VARCHAR(255),
    account_number VARCHAR(100),
    swift_bic VARCHAR(100),
    upi_id VARCHAR(100),
    paypal_email VARCHAR(255),
    payment_terms_accepted BOOLEAN,
    ie_code VARCHAR(50),
    ie_certificate_path TEXT,
    exporter_terms_accepted BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
    
    
CREATE TABLE IF NOT EXISTS add_product (
    PID Serial Primary Key,
    userid INT NOT NULL,                  
    product_name VARCHAR(255) DEFAULT NULL,           
    product_description TEXT DEFAULT NULL,            
    product_category VARCHAR(255) DEFAULT NULL,       
    sub_category VARCHAR(255) DEFAULT NULL,           
    sub_sub_category VARCHAR(255) DEFAULT NULL,          
    product_type VARCHAR(255) DEFAULT NULL,           
    product_sku VARCHAR(100) DEFAULT NULL,            
    unit VARCHAR(50) DEFAULT NULL,                                
    unit_price DECIMAL(10, 2) DEFAULT NULL,           
    minimum_order_qty INT DEFAULT NULL,               
    current_stock_qty INT DEFAULT NULL,               
    discount_type VARCHAR(50) DEFAULT NULL,           
    discount_amount DECIMAL(10, 2) DEFAULT NULL,      
    tax_amount DECIMAL(10, 2) DEFAULT NULL,           
    tax_calculation VARCHAR(50) DEFAULT NULL,         
    shipping_cost DECIMAL(10, 2) DEFAULT NULL,        
    shipping_cost_multiply BOOLEAN DEFAULT NULL,    
    product_thumbnail TEXT DEFAULT NULL,              
    additional_images TEXT DEFAULT NULL,                    

    meta_title VARCHAR(255) DEFAULT NULL,             
    meta_description TEXT DEFAULT NULL,  
    tem_closed Boolean Default False,

    FOREIGN KEY (userid) REFERENCES seller_users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS admin_users(
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT Default 'password'
    );
CREATE TABLE IF NOT EXISTS users_login(
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        mobile_number VARCHAR(50),
        password TEXT Default 'password',
        profile_path Text,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
CREATE TABLE IF NOT EXISTS customer_ticket (
   pid SERIAL PRIMARY KEY,
   user_id INT NOT NULL,
   FOREIGN KEY (user_id) REFERENCES users_login(id) ON DELETE CASCADE,
   subject TEXT NOT NULL,
   type TEXT,
   priority TEXT,
   description TEXT,
   attachment TEXT,
   status TEXT,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE IF NOT EXISTS product_selling (
    pid SERIAL PRIMARY KEY,
    id INT NOT NULL,
    FOREIGN KEY (id) REFERENCES add_product(pid) ON DELETE CASCADE,
    featured_deal BOOLEAN DEFAULT FALSE,
    best_selling INT DEFAULT 0, -- Number of times added to cart
    top_selling INT DEFAULT 0,  -- Number of times sold in the last 3 months
    top_rating NUMERIC(2, 1) DEFAULT 0, -- Average rating (e.g., 4.5 out of 5)
    rating_count INT DEFAULT 0, -- Total number of ratings
    new_arrival DATE DEFAULT CURRENT_DATE
);

Create table if not exists brands(
    id SERIAL PRIMARY KEY,
    Brand_name varchar(255) unique,
    image_alt_name text,
    image_filename text
);

CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    priority INTEGER DEFAULT 1,
    image TEXT,
    home_category BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS sub_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category_id INT NOT NULL,
    priority INTEGER DEFAULT 1,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS sub_sub_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sub_category_id INT NOT NULL,
    category_id INT NOT NULL,
    priority INTEGER DEFAULT 1,
    FOREIGN KEY (sub_category_id) REFERENCES sub_categories(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

CREATE TABLE if not exists attributes (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT,
    count INTEGER DEFAULT 1,
    status BOOLEAN DEFAULT TRUE
);
    
CREATE TABLE IF NOT EXISTS push_notifications (
    id SERIAL PRIMARY KEY,
    notification_id INTEGER REFERENCES notifications(id) ON DELETE CASCADE,
    language VARCHAR(10) NOT NULL CHECK (language IN ('en', 'ar', 'bd', 'hi')),
    notification_type TEXT NOT NULL,
    message TEXT NOT NULL,
    enabled BOOLEAN DEFAULT FALSE
);

CREATE TABLE if not exists announcements (
    id SERIAL PRIMARY KEY,
    status VARCHAR(10) NOT NULL,
    background_color VARCHAR(10) NOT NULL,
    text_color VARCHAR(10) NOT NULL,
    announcement_text TEXT NOT NULL
);



''')
    con.commit()

create()