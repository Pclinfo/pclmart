from app.database import get_db_connection


def create():
    con = get_db_connection()
    cursor = con.cursor()
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS product_status (
        id SERIAL PRIMARY KEY,
        pid INT NOT NULL,
        userid INT NOT NULL,
        active_status BOOLEAN DEFAULT TRUE,
        is_featured BOOLEAN DEFAULT FALSE,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (pid) REFERENCES add_product(PID) ON DELETE CASCADE,
        FOREIGN KEY (userid) REFERENCES seller_users(id) ON DELETE CASCADE
        );
    
    CREATE TABLE IF NOT EXISTS terms_and_conditions (
        id SERIAL PRIMARY KEY,
        terms TEXT
        );
    CREATE TABLE IF NOT EXISTS refund_policy (
        id SERIAL PRIMARY KEY,
        refund TEXT
        );
    CREATE TABLE IF NOT EXISTS privacy_policy (
        id SERIAL PRIMARY KEY,
        privacy TEXT
        );
    CREATE TABLE IF NOT EXISTS return_policy (
        id SERIAL PRIMARY KEY,
        return TEXT
        );
    CREATE TABLE IF NOT EXISTS cancellation_policy (
        id SERIAL PRIMARY KEY,
        cancellation TEXT
        );
    CREATE TABLE IF NOT EXISTS shipping_policy (
        id SERIAL PRIMARY KEY,
        shipping TEXT
        );
   CREATE TABLE IF NOT EXISTS about_us (
        id SERIAL PRIMARY KEY,
        about TEXT
        );
   CREATE TABLE IF NOT EXISTS faq (
        id SERIAL PRIMARY KEY,
        faq TEXT
        );
   CREATE TABLE IF NOT EXISTS company_reliability (
        id SERIAL PRIMARY KEY,
        reliability TEXT
        );
   Create table if not exists social_media(
       facebook text,
       instagram text,
       X text,
       linkedin text,
       pinterest text,
       whatsapp text
   );
   
    CREATE TABLE IF NOT EXISTS banner_setup (
       id SERIAL PRIMARY KEY,
       image TEXT,
       banner_type TEXT,
       published BOOLEAN DEFAULT FALSE
    );

    CREATE TABLE IF NOT EXISTS coupons (
    id SERIAL PRIMARY KEY,
    coupon_type TEXT,
    coupon_title TEXT,
    coupon_code TEXT UNIQUE,
    coupon_Bearer TEXT,  
    vendor TEXT,
    customer TEXT,  
    usage_limit INT,
    discount_type TEXT,
    discount_amount INT,
    minimum_purchase INT,
    start_date DATE,
    expiry_date DATE  
    );
    CREATE TABLE IF NOT EXISTS flash_deals (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255),
            image_path text,
            duration VARCHAR(255),
            status VARCHAR(50),
            active_products INT,
            is_published BOOLEAN
        );
    CREATE TABLE if not exists deals_of_the_day (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    product VARCHAR(255) NOT NULL,
    status BOOLEAN NOT NULL DEFAULT TRUE
    );
    
    CREATE TABLE if not exists feature_deals (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(20) CHECK (status IN ('Active', 'Expired')) NOT NULL,
    is_active BOOLEAN NOT NULL
);

CREATE TABLE if not exists vendors (
    id SERIAL PRIMARY KEY,
    user_id int not null,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone VARCHAR(20),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    shop_name VARCHAR(100),
    shop_address TEXT,
    FOREIGN KEY (user_id) REFERENCES seller_users(id) ON DELETE CASCADE
);


''')
    con.commit()


create()
