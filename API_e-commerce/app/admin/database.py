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
''')
    con.commit()

create()


