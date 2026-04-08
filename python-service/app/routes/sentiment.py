from flask import Blueprint, request
from app.services.openai_service import chat_completion
from app.utils.helpers import success_response, error_response, handle_exception

sentiment_bp = Blueprint('sentiment', __name__)

@sentiment_bp.route('/sentiment', methods=['POST'])
def sentiment():
    try:
        body = request.get_json(silent=True) or {}
        reviews = body.get('reviews')
        if not reviews:
            return error_response('reviews are required')

        system = (
            "Analyze the sentiment of the following travel reviews. "
            "Return JSON with: overall_sentiment, score (0-1), summary, highlights, concerns."
        )
        result = chat_completion(system, str(reviews))
        return success_response({'analysis': result})
    except Exception as e:
        return handle_exception(e)
