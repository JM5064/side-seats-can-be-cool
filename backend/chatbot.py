import requests
from dotenv import load_dotenv
import time
from backboard import BackboardClient
import os

load_dotenv()

API_KEY = os.environ.get('API_KEY')
client = BackboardClient(api_key=API_KEY)


def create_assistant():
    assistant = client.create_assistant(
        name="Assistant",
        description="An assistant that can analyze documents"
    )
    return assistant.assistant_id


def upload_document(assistant_id , imagepath ):
    document = client.upload_document_to_assistant(
        assistant_id,
        imagepath
    )

    print("Waiting for document to be indexed...")
    while True:
        status = client.get_document_status(document.document_id)
        if status.status == "indexed":
            print("Document indexed successfully!")
            break
        elif status.status == "failed":
            print(f"Document indexing failed: {status.status_message}")
            return
        time.sleep(2)

def create_thread(assistant_id):
    thread = client.create_thread(assistant_id)
    return thread.thread_id

def response (msg , assistant_id , thread_id):
    thread = client.create_thread(assistant_id)
    response = client.add_message(
        thread_id=thread.thread_id,
        content=msg,
        memory="Auto",
        stream=False
    )
    
    return response.content
