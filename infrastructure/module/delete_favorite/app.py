import json
import boto3


db = boto3.resource('dynamodb')



def lambda_handler(event, context):
    #Generate Random ID
    status_code = 200
    body_params = event["queryStringParameters"]
    text_message="SUCCESS"
    table = db.Table("Favorites")
    table.delete_item(
        Key={
            "FavoriteId":body_params["favoriteId"]
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
