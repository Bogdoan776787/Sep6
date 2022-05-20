import json
import boto3


db = boto3.resource('dynamodb')



def lambda_handler(event, context):
    status_code = 200
    body_params = json.loads(event["body"])
    text_message="SUCCESS"
    table = db.Table("Reviews")
    table.deleteItem(
        Item={
            "ReviewId":body_params["reviewId"]
        }
    )

    return {
        "statusCode": status_code,
        "body": json.dumps({
            "message": text_message
        }),
    }
