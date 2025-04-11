import os
class Config:
    SECRET_KEY = "pclinfo"
    MAX_CONTENT_LENGTH = 100 * 1024 * 1024
    UPLOAD_FOLDER= os.path.join(r'API_e-commerce\uploads')
    DB_NAME = "PCLMART"
    DB_USER = "postgres"
    DB_PASSWORD = "9514"
    DB_HOST = "localhost"
    DB_PORT = "5432"
