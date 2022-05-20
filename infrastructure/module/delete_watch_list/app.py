import json
import boto3


db = boto3.resource('dynamodb')



def lambda_handler(event, context):
    #Generate Random ID
    status_code = 200
    body_params = json.loads(event["body"])
    text_message="SUCCESS"
    table = db.Table("WatchList")
    table.deleteItem(
        Item={
            "listId":body_params["watchMovieId"]
        }
    )

    return {
        "statusCode": status_code,
        "body": json.dumps({
            "message": text_message
        }),
    }
