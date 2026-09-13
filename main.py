from flask import Flask, send_file
from flask_restful import Resource, Api, reqparse
import secrets
import string
import math
import os

# Initialize Flask app and specify the static folder
app = Flask(__name__, static_folder="static")
api = Api(app)

def calculate_entropy(length: int, pool_size: int) -> float:
    """
    Calculates Shannon Entropy based on Information Theory.
    Formula: H = L * log2(N)
    """
    return length * math.log2(pool_size)

class PasswordGenerator(Resource):
    def get(self):
        # Set up request parsing for the 'length' query parameter
        parser = reqparse.RequestParser()
        parser.add_argument('length', type=int, default=16, location='args')
        args = parser.parse_args()
        
        length = args['length']

        if not (6 <= length <= 16):
            return {"message": "Length must be between 6 and 16."}, 400

        lower = string.ascii_lowercase
        upper = string.ascii_uppercase
        digits = string.digits
        symbols = "[]{}()*/_-:" 
        
        pool = lower + upper + digits + symbols
        pool_size = len(pool)

        while True:
            password = ''.join(secrets.choice(pool) for _ in range(length))
            
            # Verify modern password protocols
            if (any(c in lower for c in password) and
                any(c in upper for c in password) and
                any(c in digits for c in password) and
                any(c in symbols for c in password)):
                break

        # Calculate cryptographic entropy
        entropy = calculate_entropy(length, pool_size)
        
        # Classify strength based on bits of entropy
        if entropy < 50:
            strength = "Weak"
        elif entropy < 70:
            strength = "Moderate"
        else:
            strength = "Strong"

        return {
            "password": password, 
            "entropy": round(entropy, 2), 
            "strength": strength
        }, 200

# Route the API endpoint
api.add_resource(PasswordGenerator, '/api/generate')

# Route the frontend index page
@app.route("/")
def read_index():
    return send_file(os.path.join(app.static_folder, "index.html"))

if __name__ == "__main__":
    # Run the Flask development server
    app.run(debug=True, port=5002)