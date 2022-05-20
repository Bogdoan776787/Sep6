import json
import boto3
from boto3.dynamodb.conditions import Key, Attr


db = boto3.resource('dynamodb')



def lambda_handler(event, context):
    status_code = 200
    text_message="SUCCESS"
    query_params = event["queryStringParameters"]

    table = db.Table("Reviews")
    response = table.scan(
    FilterExpression=Attr('MovieId').eq(query_params["movieId"])
    )

    return {
        "statusCode": status_code,
        "body": json.dumps(response["Items"]),
    }