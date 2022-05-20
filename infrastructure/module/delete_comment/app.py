import json
import boto3


db = boto3.resource('dynamodb')



def lambda_handler(event, context):
    status_code = 200
    body_params = json.loads(event["body"])
    text_message="SUCCESS"
    table = db.Table("Comments")
    table.deleteItem(
        Item={
            "CommentId":body_params["commentId"]
        }
    )

    return {
        "statusCode": status_code,
        "body": json.dumps({
            "message": text_message
        }),
    }
