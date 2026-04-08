from flask import Blueprint, request
from app.services.openai_service import chat_completion
from app.utils.helpers import success_response, error_response, handle_exception

tips_bp = Blueprint('tips', __name__)

@tips_bp.route('/travel-tips', methods=['POST'])
def travel_tips():
    try:
        body = request.get_json(silent=True) or {}
        destination = body.get('destination')
        if not destination:
            return error_response('destination is required')

        system = (
            "You are an experienced travel advisor. Provide practical, context-aware travel tips "
            "as a JSON object with keys: safety, culture, transport, food, money, communication, emergency."
        )
        result = chat_completion(system, f"Give travel tips for: {destination}")
        return success_response({'tips': result})
    except Exception as e:
        return handle_exception(e)
