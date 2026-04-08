from flask import Blueprint, request
from app.services.openai_service import chat_completion
from app.utils.helpers import success_response, error_response, handle_exception

translate_bp = Blueprint('translate', __name__)

@translate_bp.route('/translate', methods=['POST'])
def translate():
    try:
        body = request.get_json(silent=True) or {}
        text        = body.get('text')
        target_lang = body.get('target_language', 'Spanish')

        if not text:
            return error_response('text is required')

        system = (
            f"Translate the following text to {target_lang}. "
            "Return JSON with: translated_text, useful_phrases (array of {phrase, translation, pronunciation})."
        )
        result = chat_completion(system, text)
        return success_response({'result': result})
    except Exception as e:
        return handle_exception(e)
