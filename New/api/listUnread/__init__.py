import azure.functions as func, requests, json

def main(req: func.HttpRequest) -> func.HttpResponse:
    token = req.headers.get("authorization").split()[1]
    graph = "https://graph.microsoft.com/v1.0/me/messages"
    params = {"$filter": "isRead eq false", "$top": "20",
              "$select": "id,subject,from,bodyPreview"}
    res = requests.get(graph, headers={"Authorization": f"Bearer {token}"}, params=params, timeout=10)
    return func.HttpResponse(res.text, mimetype="application/json")
