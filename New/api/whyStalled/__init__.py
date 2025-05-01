import azure.functions as func
import json

def main(req: func.HttpRequest) -> func.HttpResponse:
    try:
        data = req.get_json()
        msg_id = data.get("id")
        if not msg_id:
            return func.HttpResponse(
                json.dumps({"error": "Missing 'id' in request body."}),
                status_code=400,
                mimetype="application/json"
            )
        dummy = f"Root cause analysis for message {msg_id}..."
        return func.HttpResponse(
            json.dumps({"text": dummy}),
            status_code=200,
            mimetype="application/json"
        )
    except ValueError:
        return func.HttpResponse(
            json.dumps({"error": "Invalid JSON."}),
            status_code=400,
            mimetype="application/json"
        )
    except Exception as e:
        return func.HttpResponse(
            json.dumps({"error": str(e)}),
            status_code=500,
            mimetype="application/json"
        )
