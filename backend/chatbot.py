import requests
from dotenv import load_dotenv
import time
from backboard import BackboardClient
import asyncio
import os

load_dotenv()

API_KEY = os.environ.get('API_KEY')

def initialize_client():
    return BackboardClient(api_key=API_KEY)


async def create_assistant():
    client = initialize_client()
    assistant = await client.create_assistant(
        name="Assistant",
        description="An assistant that can analyze documents"
    )
    return assistant.assistant_id


async def upload_document(assistant_id , imagepath ):
    client = initialize_client()
    document = await client.upload_document_to_assistant(
        assistant_id,
        imagepath
    )

    print("Waiting for document to be indexed...")
    while True:
        status = await client.get_document_status(document.document_id)
        if status.status == "indexed":
            print("Document indexed successfully!")
            break
        elif status.status == "failed":
            print(f"Document indexing failed: {status.status_message}")
            return
        time.sleep(2)

async def create_thread(assistant_id):
    client = initialize_client()
    thread = await client.create_thread(assistant_id)
    return thread.thread_id

async def response(msg, thread_id):
    client = initialize_client()
    # thread = client.create_thread(assistant_id)
    response = await client.add_message(
        thread_id=thread_id,
        content=msg,
        memory="Auto",
        stream=False
    )

    return response.content


async def main():
    ass = await create_assistant()
    the = await create_thread(ass)
    resp = await response('hello',the)
    print(resp)
    resp = await response('hello again',the)
    print(resp)


if __name__ == "__main__":
    asyncio.run(main())
