import os
from openai import OpenAI

def get_client():
    """Lazy-load client so OPENAI_API_KEY is always read after dotenv loads."""
    api_key = os.getenv('OPENAI_API_KEY')
    if not api_key:
        raise ValueError("OPENAI_API_KEY is not set in environment variables.")
    return OpenAI(api_key=api_key)

def chat_completion(system_prompt: str, user_prompt: str, model: str = 'gpt-4o') -> str:
    """Send a chat completion request and return the text response."""
    client = get_client()
    response = client.chat.completions.create(
        model=model,
        messages=[
            {'role': 'system', 'content': system_prompt},
            {'role': 'user',   'content': user_prompt},
        ],
        temperature=0.7,
    )
    return response.choices[0].message.content
