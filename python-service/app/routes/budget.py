from flask import Blueprint, request
from app.services.openai_service import chat_completion
from app.utils.helpers import success_response, error_response, handle_exception

budget_bp = Blueprint('budget', __name__)

@budget_bp.route('/budget-optimize', methods=['POST'])
def budget_optimize():
    try:
        body = request.get_json(silent=True) or {}
        total_budget = body.get('total_budget')
        destination  = body.get('destination')
        duration     = body.get('duration_days', 7)

        if not total_budget or not destination:
            return error_response('total_budget and destination are required')

        system = (
            "You are a travel budget expert. Provide an optimized budget breakdown as JSON: "
            "{accommodation, food, transport, activities, miscellaneous, tips}. "
            "All values in USD."
        )
        user_prompt = f"Total budget: ${total_budget} for {duration} days in {destination}."
        result = chat_completion(system, user_prompt)
        return success_response({'budget_plan': result})
    except Exception as e:
        return handle_exception(e)
