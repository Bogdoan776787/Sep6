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
    print("put comments")
    text_message="SUCCESS"
    table = db.Table("Comments")
    table.put_item(
        Item={
            "CommentId ":str(id_db),
            "MovieId":body_params["movieId"],
            "UserId":body_params["userId"],
            "CommentText":body_params["commentText"],
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