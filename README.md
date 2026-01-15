<div align="center">

<a href="https://jm5064.github.io/side-seats-can-be-cool/" target="_blank" title="Check out Side seats can be cool"><img width="144px" alt="logo" src=".github/sscbc.svg"></a>

# Side Seats Can Be Cool

<p><i>In-browser app that uses <a href="https://backboard.io/" style="text-decoration: underline">backboard.io</a>, computer vision, and LLMs to help students excel from any seat in the classroom.</i></p>

</div>

## Table of Contents
- [💫 Features](#features)
  - [See the board as if from directly in front of it](#-see-the-board-as-if-from-directly-in-front-of-it)
  - [Chat with an LLM about the class material](#chat-with-an-llm-about-the-class-material)
- [📖 Usage](#-usage)
    - [Adding a class](#adding-a-class)
    - [Setting up the video transform](#setting-up-the-video-transform)
    - [Taking a snapshot](#taking-a-snapshot)
    - [Talking to the chatbot](#talking-to-the-chatbot)
- [🛠️ Installation and self-hosting](#️-installation-and-self-hosting)
  - [Requirements](#requirements)
  - [How to build](#how-to-build)
  - [How to run](#how-to-run)

## 💫 Features

If you've ever had to crane your neck to see what the professor's writing on the chalkboard, Side Seats Can Be Cool is your friend. It has two main features:

### See the board as if from directly in front of it

It uses your camera, along with guide points that you provide, to transform live video of the chalkboard into a much easier-to-see perspective.

- Accurate and custom calibration of the transformation
- Take photos of the board when you want to capture important information

### Chat with an LLM about the class material

You can ask the built-in chatbot to analyze the photos, elaborate on class material, suggest practice questions, and more.

- Images taken of the board are directly sent to the chatbot
- Add a designated thread for each class and easily switch between them

The interface can switch between light and dark mode, whichever one is best for the classroom lighting.

## 📖 Usage

### Adding a class

Click the <kbd>+ Add Class</kbd> button in the sidebar and enter a name for your class. Names must be unique.

### Setting up the video transform

Switch to the <kbd>Video</kbd> tab using the toggle at the top. The default video should be what your camera is seeing. 

Click the four corners of the board to mark them, and click a fifth time to apply the transform. If you're not satisfied with the result, click again to reset the video.

### Taking a snapshot

Use the camera button at the bottom of the video to capture the current view.

The shapshot will be sent to the chat of whichever class you have open (as indicated by the header).

### Talking to the chatbot

Switch to the <kbd>Chatbot</kbd> tab using the toggle at the top and make sure you have the correct class selected.

Message history should automatically load! Send messages using the input bar at the bottom as you would with any other chatbot.

## 🛠️ Installation and self-hosting

Side Seats Can Be Cool runs in your browser, so make sure yours is up-to-date for the best experience.

### Requirements

You should be able to install and run Side Seats Can Be Cool on Windows, MacOS, or Linux. Below are the instructions for Windows with Git Bash.

To self-host, you'll need the following:

| Requirement | Version | Notes |
| --- | --- | --- |
| [Python3](https://www.python.org/) | 3.13 | Including `pip` and `python-venv` |
| [Node.js](https://nodejs.org/en) | 20.0 | Including `npm` |


### How to build

1. Clone the repository and switch into it

```console
$ git clone https://github.com/JM5064/side-seats-can-be-cool.git
```

2. Create a Python virtual environment for the backend (good practice but not required).

```console
$ cd side-seats-can-be-cool
$ python3 -m venv venv
$ source venv/Scripts/activate
```

3. Install necessary Python packages for the backend

```console
$ pip install -r backend/requirements.txt
```

4. Install necessary Node.js packages for the frontend

```console
$ cd frontend
$ npm install 
```

### How to run

This is mainly for development purposes. From the main folder (`side-seats-can-be-cool`), open two terminals:

1. Start the backend

```console
$ cd backend
$ python3 ./app.py
```

2. Start the frontend

```console
$ cd frontend
$ npm run dev
```

The app can be found at `http://localhost:5173/`
