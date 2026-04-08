from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Load env vars before anything else
load_dotenv()

def create_app():
    app = Flask(__name__)

    # Allow all origins for internal service-to-service calls
    CORS(app)

    from app.routes.itinerary       import itinerary_bp
    from app.routes.cost            import cost_bp
    from app.routes.recommendations import recommendations_bp
    from app.routes.sentiment       import sentiment_bp
    from app.routes.weather         import weather_bp
    from app.routes.translate       import translate_bp
    from app.routes.budget          import budget_bp
    from app.routes.tips            import tips_bp

    app.register_blueprint(itinerary_bp,       url_prefix='/ai')
    app.register_blueprint(cost_bp,            url_prefix='/ai')
    app.register_blueprint(recommendations_bp, url_prefix='/ai')
    app.register_blueprint(sentiment_bp,       url_prefix='/ai')
    app.register_blueprint(weather_bp,         url_prefix='/ai')
    app.register_blueprint(translate_bp,       url_prefix='/ai')
    app.register_blueprint(budget_bp,          url_prefix='/ai')
    app.register_blueprint(tips_bp,            url_prefix='/ai')

    # Health check endpoint
    @app.route('/health')
    def health():
        return {'status': 'ok', 'service': 'AI Travel Planner'}, 200

    return app
