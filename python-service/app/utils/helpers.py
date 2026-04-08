from flask import jsonify
import traceback

def success_response(data: dict, status: int = 200):
    return jsonify({'success': True, 'data': data}), status

def error_response(message: str, status: int = 400):
    return jsonify({'success': False, 'message': message}), status

def handle_exception(e: Exception):
    """Log and return a structured 500 response."""
    traceback.print_exc()
    return error_response(f"Internal AI service error: {str(e)}", 500)
