import json
import boto3
from boto3.dynamodb.conditions import Key, Attr


db = boto3.resource('dynamodb')



def lambda_handler(event, context):
    STATUS_CODE = 200
    text_message="SUCCESS"
    query_params = event["queryStringParameters"]

    table = db.Table("Comments")
    response = table.scan(
    FilterExpression=Attr('MovieId').eq(query_params["movieId"]) & Attr('type').eq(query_params["type"])
    )

    return {
        "statusCode": STATUS_CODE,
        "headers": {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*", 
            "Access-Control-Allow-Methods": "GET"  
        },
        "body": json.dumps(response["Items"]),
    }