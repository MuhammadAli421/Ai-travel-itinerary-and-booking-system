from flask import Blueprint, request
from app.services.openai_service import chat_completion
from app.utils.helpers import success_response, error_response, handle_exception

weather_bp = Blueprint('weather', __name__)

@weather_bp.route('/weather-insights', methods=['POST'])
def weather_insights():
    try:
        body = request.get_json(silent=True) or {}
        destination  = body.get('destination')
        travel_dates = body.get('travel_dates', 'not specified')

        if not destination:
            return error_response('destination is required')

        system = (
            "You are a travel weather expert. Provide weather insights and packing recommendations "
            "as JSON with keys: expected_weather, packing_list, best_time_to_visit, warnings."
        )
        result = chat_completion(system, f"Destination: {destination}. Travel dates: {travel_dates}")
        return success_response({'insights': result})
    except Exception as e:
        return handle_exception(e)
