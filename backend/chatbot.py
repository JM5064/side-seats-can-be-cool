import requests

API_KEY = "your_api_key"
BASE_URL = "https://app.backboard.io/api"
HEADERS = {"X-API-Key": API_KEY}


response = requests.post(
    f"{BASE_URL}/assistants",
    json={"name": "Support Bot"},
    headers=HEADERS,
)
assistant_id = response.json()["assistant_id"]


def creat_thread_id(assistant_id = assistant_id) :
    response = requests.post(
        f"{BASE_URL}/assisttants/{assistant_id}/threads",
        json={},
        headers=HEADERS,
    )

    thread_id = response.json()["thread_id"]
    return thread_id


def response(thread_id, question):
    response = requests.post(
        f"{BASE_URL}/threads/{thread_id}/messages",
        headers=HEADERS,
        data={"content": question , "stream": "false", "memory": "Auto"},
    )
    return response.json().get("content")
    