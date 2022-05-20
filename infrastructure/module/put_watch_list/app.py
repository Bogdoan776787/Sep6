import json
import uuid
import boto3
from datetime import datetime


db = boto3.resource('dynamodb')



def lambda_handler(event, context):
    dt_iso = str(datetime.now().isoformat())
    #Generate Random ID
    id_db=uuid.uuid4()
    status_code = 200
    body_params = json.loads(event["body"])
    text_message="SUCCESS"
    table = db.Table("WatchList")
    table.put_item(
        Item={
            "listId":str(id_db),
            "movieId":body_params["movieId"],
            "userId":body_params["userId"],
            "createdAt":dt_iso,
            "updatedAt":dt_iso
        }
    )

    return {
        "statusCode": status_code,
        "body": json.dumps({
            "message": text_message
        }),
    }
