from flask import Blueprint, request
from app.services.openai_service import chat_completion
from app.utils.helpers import success_response, error_response, handle_exception

recommendations_bp = Blueprint('recommendations', __name__)

@recommendations_bp.route('/recommendations', methods=['POST'])
def recommendations():
    try:
        body = request.get_json(silent=True) or {}
        preferences = body.get('preferences', {})

        system = "You are a travel expert. Suggest 5 personalized travel destinations as a JSON array with name, country, description, best_for, estimated_budget_per_day."
        result = chat_completion(system, f"User preferences: {preferences}")
        return success_response({'recommendations': result})
    except Exception as e:
        return handle_exception(e)
