import pandas as pd
from sklearn.preprocessing import StandardScaler

# Placeholder for trained models.
# In production, load pre-trained .pkl models here using joblib.

def estimate_cost(destination: str, duration_days: int, travel_style: str) -> dict:
    """
    Naive cost estimation. Replace with a trained regression model.
    """
    base_rates = {'budget': 80, 'mid-range': 200, 'luxury': 500}
    daily_rate = base_rates.get(travel_style, 200)
    total = daily_rate * duration_days
    return {
        'estimated_total': total,
        'daily_average': daily_rate,
        'currency': 'USD',
        'confidence': 'low - placeholder model',
    }
