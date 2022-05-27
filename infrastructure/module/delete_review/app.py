import json
import boto3


db = boto3.resource('dynamodb')



def lambda_handler(event, context):
    status_code = 200
    body_params = event["queryStringParameters"]
    text_message="SUCCESS"
    table = db.Table("Reviews")
    table.delete_item(
        Key={
            "ReviewId":body_params["reviewId"]
        }
    )

    return {
        "statusCode": status_code,
        "headers": {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*", 
            "Access-Control-Allow-Methods": "GET"  
        },
        "body": json.dumps({
            "message": text_message
        }),
    }
