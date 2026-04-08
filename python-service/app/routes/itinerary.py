from flask import Blueprint, request
from app.services.openai_service import chat_completion
from app.utils.helpers import success_response, error_response, handle_exception

itinerary_bp = Blueprint('itinerary', __name__)

@itinerary_bp.route('/generate-itinerary', methods=['POST'])
def generate_itinerary():
    try:
        body = request.get_json(silent=True) or {}
        prompt = body.get('prompt')
        if not prompt:
            return error_response('prompt is required')

        system = (
            "You are an expert travel planner. Generate a detailed day-by-day itinerary "
            "in JSON format with keys: title, destination, days (array of {day, location, activities[]})."
        )
        result = chat_completion(system, prompt)
        return success_response({'itinerary': result})
    except Exception as e:
        return handle_exception(e)
