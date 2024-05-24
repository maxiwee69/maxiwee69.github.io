from flask import Flask, request, Response, jsonify
from flask_cors import CORS
import sqlite3
import datetime
import socket

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

@app.route('/submit', methods=['POST'])
def submit_text():
    data = request.get_json()
    print(f"Received data: {data}")  # This line prints the received data
    text = data['text']
    ip_address = request.remote_addr

    # Get the current timestamp
    timestamp = datetime.datetime.now()

    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    # Include the timestamp when inserting data into the database
    c.execute("INSERT INTO submissions (ip_address, text, timestamp) VALUES (?, ?, ?)", (ip_address, text, timestamp))
    conn.commit()
    conn.close()

    return 'Success', 200

@app.route('/getData', methods=['GET'])
def get_data():
    # Set the server's IP address
    server_ip = '192.168.178.44'
    # Set the allowed client's IP addresses
    allowed_client_ips = ['192.168.178.77', '127.0.0.1']
    # Get the client's IP address
    client_ip = request.remote_addr

    # If the client's IP address is not in the list of allowed client's IP addresses, return an error
    if client_ip not in allowed_client_ips and client_ip != server_ip:
        print(f"Access denied for IP address: {client_ip}")  # Print a message to the console
        return 'Access denied', 403

    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    # Fetch the timestamp from the database
    c.execute("SELECT ip_address, text, timestamp FROM submissions")
    data = c.fetchall()
    conn.close()

    return jsonify(data), 200

@app.route('/clearDb', methods=['POST'])
def clear_db():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute("DELETE FROM submissions")
    conn.commit()
    conn.close()

    return 'Success', 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)