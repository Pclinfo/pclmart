from app.database import get_db_connection

def create():
    con = get_db_connection()
    cursor = con.cursor()
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS user_address (
    id SERIAL PRIMARY KEY,
    userid INT NOT NULL,
    FOREIGN KEY (userid) REFERENCES users_login(id) ON DELETE CASCADE,
    name text,
    phone_number text,
    pincode text,
    locality text,
    address text,
    state text,
    landmark text,
    alternate_phone text,
    address_type text,
    addressPurpose text,
    latitude text,
    longitude text
    );
''')
    con.commit()

create()


