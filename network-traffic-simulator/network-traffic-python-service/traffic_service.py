from flask import Flask, jsonify
import psutil

app = Flask(__name__)

@app.route('/traffic')
def traffic():
    net_io = psutil.net_io_counters()
    traffic_data = {
        'bytes_sent': net_io.bytes_sent,
        'bytes_recv': net_io.bytes_recv,
        'packets_sent': net_io.packets_sent,
        'packets_recv': net_io.packets_recv
    }
    return jsonify(traffic_data)

if __name__ == '__main__':
    app.run(port=4000)
