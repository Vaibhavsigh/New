from flask import Flask
from .algorithms import algorithms_bp

def register_routes(app: Flask):
    app.register_blueprint(algorithms_bp, url_prefix='/api/algorithms')
