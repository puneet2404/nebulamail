import logging
import azure.functions as func
import os
import openai
from typing import List
import numpy as np

MEMORIES = [
    {"id": 1, "title": "Q2 Compliance Report", "content": "Feedback and review required for Q2 compliance report. Deadline: May 1, 2025."},
    {"id": 2, "title": "AI Onboarding Research", "content": "Long-term research on AI-powered onboarding for new hires. No immediate action."},
    {"id": 3, "title": "Security Policy Review", "content": "Review security policy and check for PII leaks. Due: May 8, 2025."},
    {"id": 4, "title": "Project Roadmap Update", "content": "Update project roadmap with Q3 milestones and new feature rollout."},
]

MEMORY_EMBEDDINGS = None

def get_embedding(text: str, azure_api_key: str, model: str = "gpt-4o") -> List[float]:
    openai.api_key = azure_api_key
    openai.api_base = "https://api.openai.com/v1"
    openai.api_type = "open_ai"
    openai.api_version = None
    resp = openai.Embedding.create(
        input=text,
        model="text-embedding-3-small" if model == "gpt-4o" else model
    )
    return resp["data"][0]["embedding"]

def cosine_sim(a, b):
    a = np.array(a)
    b = np.array(b)
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))

def ensure_memory_embeddings(azure_api_key: str, model: str = "gpt-4o"):
    global MEMORY_EMBEDDINGS
    if MEMORY_EMBEDDINGS is None:
        MEMORY_EMBEDDINGS = [get_embedding(m["content"], azure_api_key, model) for m in MEMORIES]

app = func.FunctionApp()

@app.route(route="mindpalaceSearch", methods=["POST"])
def mindpalace_search(req: func.HttpRequest) -> func.HttpResponse:
    try:
        data = req.get_json()
        query = data.get("query", "")
        azure_api_key = data.get("azureApiKey", "")
        model = data.get("model", "gpt-4o")
        if not query or not azure_api_key:
            return func.HttpResponse("Missing query or azureApiKey", status_code=400)
        ensure_memory_embeddings(azure_api_key, model)
        query_emb = get_embedding(query, azure_api_key, model)
        sims = [cosine_sim(query_emb, mem_emb) for mem_emb in MEMORY_EMBEDDINGS]
        top_idx = np.argsort(sims)[::-1][:3]
        results = [MEMORIES[i] for i in top_idx]
        import json
        return func.HttpResponse(
            body=json.dumps(results),
            mimetype="application/json",
            status_code=200
        )
    except Exception as e:
        logging.exception("Error in mindpalace_search")
        return func.HttpResponse(f"Error: {e}", status_code=500)
