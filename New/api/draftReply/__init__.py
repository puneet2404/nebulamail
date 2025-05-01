import azure.functions as func

def main(req: func.HttpRequest) -> func.HttpResponse:
    # TODO: Call Graph API to create a reply
    return func.HttpResponse("{\"result\": \"stub\"}", mimetype="application/json")
