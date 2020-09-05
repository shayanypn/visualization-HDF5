import time
from flask import Flask, jsonify, make_response

def create_app():
	app = Flask(__name__)

	@app.route('/')
	def home_route():
		return make_response(jsonify({'status': 'ok'}), 200)

	return app

if __name__ == "__main__":
	app = create_app()
	app.run(debug=True)
	# serve the application on port 7410
	app.run(host='0.0.0.0', port=7410)