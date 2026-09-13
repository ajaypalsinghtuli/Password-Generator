# Full-Stack Secure Password Generator

A full-stack password generator built with **Flask** (Python) and Vanilla JS, incorporating Information Theory to mathematically score password strength.

Unlike standard scripts, this application acts as a microservice. The backend handles secure cryptographic generation and calculates the **Shannon Entropy** of the string, while the frontend dynamically fetches and visualizes this data.

## Features
- **Flask-RESTful Backend:** High-performance, production-ready Python API.
- **Cryptographic Security:** Uses the `secrets` module, entirely abandoning predictable pseudo-random number generators.
- **Data Analytics:** Evaluates password strength using Shannon Entropy.
- **Protocol Compliant:** Guarantees inclusion of uppercase, lowercase, numbers, and symbols.

## The Mathematics of Password Strength
The backend calculates the Information Entropy ($E$) of the generated password to determine resistance to brute-force attacks using the following formula:

$$E = L \times \log_2(R)$$

Where:
- $L$ = Length of the password
- $R$ = Size of the character pool (73 characters: 26 lowercase + 26 uppercase + 10 numbers + 11 symbols)

## How to Run Locally

You can set up the environment using either **Conda** (recommended for data science workflows) or standard **pip**.

### Option 1: Conda Environment (Recommended)
Using Conda ensures a clean, isolated environment without conflicting with your system packages.

```bash
# 1. Create a new conda environment
conda create --name secure-pass-env python=3.10 -y

# 2. Activate the environment
conda activate secure-pass-env

# 3. Install dependencies via conda-forge
conda install -c conda-forge flask flask-restful -y
```

### Option 2: Pip (Alternative)
Ensure you have Python installed, then install the required packages using the requirements file:
```bash
pip install -r requirements.txt
```

### Start the Server
Once your environment is configured and dependencies are installed, run the Flask application directly:
```bash
python main.py
```
Then, open your web browser and navigate to: `http://127.0.0.1:5002`
