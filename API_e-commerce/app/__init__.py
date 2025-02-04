from flask_cors import CORS
from flask import Flask
from flask_session import Session
def create_app():
    app = Flask(__name__)
    app.config['SESSION_TYPE'] = 'filesystem'
    app.config['SESSION_COOKIE_SECURE'] = False  # Use True if running over HTTPS
    app.config['SESSION_COOKIE_HTTPONLY'] = True
    app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
    app.config['SECRET_KEY'] = 'pclinfo'

    Session(app)

    CORS(app, supports_credentials=True, resources={
        r"/*": {
            "origins": ["*"],
            "allow_headers": ["Content-Type", "Authorization", "Access-Control-Allow-Origin"],
            "methods": ["OPTIONS", "GET", "POST", "PUT", "DELETE"]
        }
    })

    with app.app_context():
        from .routes import blueprint
        app.register_blueprint(blueprint)

    return app


