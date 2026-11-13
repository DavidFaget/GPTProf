# GPTProf – AI-Powered Personalized Test Generator

GPTProf is a web application and Progressive Web App (PWA) that uses generative AI to create personalized multiple-choice tests. Users can specify a subject, their educational background, and a difficulty level to generate tailored questions, interact with the test, and receive explanations for the answers.

The project aims to make personalized learning and self-assessment more accessible through AI-generated educational content.

## ✨ Features

- **Personalized test generation:** Generate tests based on a chosen theme, educational background, and difficulty level.
- **AI-powered questions:** Uses OpenAI's GPT-4o Mini to dynamically generate structured questions.
- **Interactive testing:** Select answers and receive feedback.
- **Explanations:** Understand why an answer is correct.
- **Progressive Web App:** Designed to be accessible through a web interface and PWA.

## 🛠️ Tech Stack

| Component | Technology |
|---|---|
| Backend | Python, FastAPI |
| Frontend | JavaScript, HTML, CSS |
| AI integration | OpenAI API (GPT-4o Mini) |
| Application type | Web application / PWA |

## 🚀 Getting Started

### Prerequisites

- Python 3.10+
- Node.js and npm
- An OpenAI API key

### 1. Clone the repository

```bash
git clone https://github.com/DavidFaget/GPTProf.git
cd GPTProf
```

### 2. Configure the backend

Navigate to the backend directory and install the dependencies:

```bash
cd backend
python -m venv venv
```

Activate the virtual environment:

```bash
# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Configure your OpenAI API key as an environment variable:

```bash
# macOS / Linux
export OPENAI_API_KEY="your-api-key"

# Windows PowerShell
$env:OPENAI_API_KEY="your-api-key"
```

### 3. Start the backend

From the backend directory, launch the FastAPI application using its configured application entry point:

```bash
uvicorn app.main:app --reload
```

### 4. Start the frontend

Open a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL provided by the frontend development server in your browser.

*Note: The commands above assume the conventional FastAPI entry point `app.main:app` and an npm-based frontend development script. Adjust them if the repository uses different entry points or scripts.*

## 🔑 Configuration

GPTProf requires a valid OpenAI API key to generate tests. Keep API credentials private and never commit them to the repository.

## ⚠️ Project Status

GPTProf is a personal development project. The current implementation is designed for use within a personal network and requires an OpenAI API key.

Public deployment and broader accessibility may require additional configuration.
