from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token
from flask_cors import CORS
import pymysql

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Allow frontend to access the backend

# Configure Database (Replace with your MySQL credentials)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:12345@localhost/mydatabase'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your_secret_key'  # Change this to a strong secret key

# Initialize Extensions
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

# Create Database Tables
with app.app_context():
    db.create_all()

# Route: User Registration
@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({"success": False, "message": "Email and password are required"}), 400

        if User.query.filter_by(email=email).first():
            return jsonify({"success": False, "message": "Email already registered"}), 400

        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        new_user = User(email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"success": True, "message": "Registration successful"}), 201

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

# Route: User Login
@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({"success": False, "message": "Email and password are required"}), 400

        user = User.query.filter_by(email=email).first()
        if not user or not bcrypt.check_password_hash(user.password, password):
            return jsonify({"success": False, "message": "Invalid email or password"}), 401

        access_token = create_access_token(identity=user.id)
        return jsonify({"success": True, "token": access_token}), 200

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

# Run the server
if __name__ == '__main__':
    app.run(debug=True, port=8091)  # Ensure Flask runs on port 5000
