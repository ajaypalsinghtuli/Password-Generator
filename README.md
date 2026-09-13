# Full-Stack Secure Password Generator

A full-stack password generator built with **FastAPI** (Python) and Vanilla JS, incorporating Information Theory to mathematically score password strength.

Unlike standard scripts, this application acts as a microservice. The backend handles secure cryptographic generation and calculates the **Shannon Entropy** of the string, while the frontend dynamically fetches and visualizes this data.

## Features
- **FastAPI Backend:** High-performance, production-ready Python API.
- **Cryptographic Security:** Uses the `secrets` module, entirely abandoning predictable pseudo-random number generators.
- **Data Analytics:** Evaluates password strength using Shannon Entropy.
- **Protocol Compliant:** Guarantees inclusion of uppercase, lowercase, numbers, and symbols.

## The Mathematics of Password Strength
The backend calculates the Information Entropy ($E$) of the generated password to determine resistance to brute-force attacks using the following formula:

$$E = L \times \log_2(R)$$

Where:
- $L$ = Length of the password
- $R$ = Size of the character pool (71 characters)

## How to Run Locally

**1. Install Dependencies**
Ensure you have Python installed, then install the required packages:
```bash
pip install -r requirements.txt