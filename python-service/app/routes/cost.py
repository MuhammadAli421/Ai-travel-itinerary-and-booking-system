from flask import Blueprint, request
from app.services.ml_service import estimate_cost
from app.utils.helpers import success_response, error_response, handle_exception

cost_bp = Blueprint('cost', __name__)

@cost_bp.route('/cost-prediction', methods=['POST'])
def cost_prediction():
    try:
        body = request.get_json(silent=True) or {}
        destination   = body.get('destination')
        duration_days = int(body.get('duration_days', 7))
        travel_style  = body.get('travel_style', 'mid-range')

        if not destination:
            return error_response('destination is required')

        result = estimate_cost(destination, duration_days, travel_style)
        return success_response(result)
    except Exception as e:
        return handle_exception(e)
