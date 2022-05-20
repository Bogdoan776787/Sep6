import json
import boto3
from boto3.dynamodb.conditions import Key, Attr


db = boto3.resource('dynamodb')



def lambda_handler(event, context):
    status_code = 200
    text_message="SUCCESS"
    query_params = event["queryStringParameters"]

    table = db.Table("WatchList")
    response = table.scan(
    FilterExpression=Attr('userId').eq(query_params["userId"])
    )
    items = response["items"]
    
    return {
        "statusCode": status_code,
        "body": json.dumps(response["Items"]),
    }
