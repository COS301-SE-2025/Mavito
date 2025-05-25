# Python Setup Instructions
These steps ensure that all Python dependencies are correctly installed using the requirements.txt file.

## Prerequisites
- Python 3.8+ (OS package manager)
- pip (usually comes with Python)

## Setup Steps
Create a virtual enviroment
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```
Install dependencies:
```bash
pip install -r requirements.txt
```

Verify Installation
```bash
pip list
```
