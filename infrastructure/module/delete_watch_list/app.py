import json
import boto3


db = boto3.resource('dynamodb')



def lambda_handler(event, context):
    STATUS_CODE = 200
    body_params = event["queryStringParameters"]
    text_message="SUCCESS"
    table = db.Table("WatchList")
    table.delete_item(
        Key={
            "listId":body_params["listId"]
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
