import json
import boto3


db = boto3.resource('dynamodb')



def lambda_handler(event, context):
    STATUS_CODE = 200
    body_params = json.loads(event["body"])
    text_message="SUCCESS"
    table = db.Table("Comments")
    table.deleteItem(
        Item={
            "CommentId":body_params["commentId"]
        }
    )

    return {
        "statusCode": STATUS_CODE,
        "headers": {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*", 
            "Access-Control-Allow-Methods": "GET"  
        },
        "body": json.dumps({
            "message": text_message
        }),
    }
