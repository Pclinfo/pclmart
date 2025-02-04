import jwt
from flask import request, session, jsonify
from functools import wraps
from datetime import datetime, timedelta

SECRET_KEY = "pclinfo"

def generate_token(user_data, expiration_minutes=60):

    payload = user_data.copy()
    payload['exp'] = datetime.utcnow() + timedelta(minutes=expiration_minutes)
    payload['iat'] = datetime.utcnow()

    try:
        token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
        return token
    except Exception as e:
        print(f"Token Generation Error: {e}")
        return None


def validate_token(token):
    """
    Validate and decode the JWT token

    :param token: JWT token string
    :return: Decoded payload or None
    """
    try:
        decoded_payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return decoded_payload
    except jwt.ExpiredSignatureError:
        print("Token has expired")
        return None
    except jwt.InvalidTokenError as e:
        print(f"Invalid Token Error: {e}")
        return None
    except Exception as e:
        print(f"Unexpected Token Validation Error: {e}")
        return None


def token_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = None

        auth_header = request.headers.get('Authorization')
        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header.split(' ')[1]

        if not token:
            token = session.get('token')

        if not token:
            return jsonify({'error': 'Authentication token is missing'}), 401

        if not isinstance(token, str) or '.' not in token:
            return jsonify({'error': 'Invalid token format'}), 401

        decoded_token = validate_token(token)
        if not decoded_token:
            return jsonify({'error': 'Invalid or expired token'}), 401

        request.token_payload = decoded_token

        return f(*args, **kwargs)

    return decorated_function