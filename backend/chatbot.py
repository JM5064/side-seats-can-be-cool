import requests
from dotenv import load_dotenv
import time
from backboard import BackboardClient
import asyncio
import os
from log import log
import base64
from google import genai

load_dotenv()


API_KEY = os.environ.get('API_KEY')

def initialize_client():
    return BackboardClient(api_key=API_KEY)


async def create_assistant():
    client = initialize_client()
    assistant = await client.create_assistant(
        name="Assistant",
        description="An assistant that can analyze text in images"
    )
    return assistant.assistant_id


async def image_description(imagepath):
        
    client = genai.Client()
    with open(imagepath, "rb") as f:
        base64_image = base64.b64encode(f.read()).decode('utf-8')

    interaction = client.interactions.create(
        model="gemini-3-flash-preview",
        input=[
            {"type": "text", "text": "exctract all text in the image and keep the description as brief as possible"},
            {"type": "image", "data": base64_image, "mime_type": "image/png"}
        ]
    )

    content = interaction.outputs[-1].text
    # content = 'dummy'
    # filename = imagepath.rpartition('/')[-1]
    # filename = filename.removesuffix(".jpeg")
    # filename = f'{filename}.txt' 
    # with open(filename, 'w') as f:
    #     f.write(content)    
    # docs_dir = os.path.join(os.getcwd(), "documents")
    # full_path = f'{docs_dir}/{filename}'
    # os.rename(filename, full_path)

    return content

    

async def upload_document(assistant_id , imagepath):
    # docpath = await image_description(imagepath)
    client = initialize_client()
    # log(imagepath)
    document = await client.upload_document_to_assistant(
        assistant_id,
        imagepath
    )

    print("Waiting for document to be indexed...")
    log(imagepath)
    while True:
        status = await client.get_document_status(document.document_id)
        log(status)
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
        llm_provider="google",
        model_name="gemini-2.5-flash",
        stream=False
    )

    return response.content


async def main():
    ass = await create_assistant()
    the = await create_thread(ass)
    full_path = os.path.abspath('requirements.txt')
    #await upload_document(ass,full_path)
    resp = await response(f'can you describe what the document says in one line',the)
    print(resp)
    print('oke')




if __name__ == "__main__":
    asyncio.run(main())
