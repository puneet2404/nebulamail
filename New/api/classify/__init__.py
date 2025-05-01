import azure.functions as func

def main(req: func.HttpRequest) -> func.HttpResponse:
    # TODO: Proxy to Azure AI Agent Service
    return func.HttpResponse("{\"result\": \"stub\"}", mimetype="application/json")
