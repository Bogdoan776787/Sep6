import json
import boto3
from boto3.dynamodb.conditions import Key, Attr


db = boto3.resource('dynamodb')



def lambda_handler(event, context):
    status_code = 200
    text_message="SUCCESS"
    query_params = event["queryStringParameters"]

    if("userId" in query_params.keys()):
        response = getReview(query_params["movieId"], query_params["userId"])
        items = response
    else:
        items = getReviews(query_params["movieId"])

    return {
        "statusCode": status_code,
        "headers": {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*", 
            "Access-Control-Allow-Methods": "GET"  
        },
        "body": json.dumps(items),
    }


def getReviews(movieId):
    table = db.Table("Reviews")
    response = table.scan(
    FilterExpression=Attr('MovieId').eq(movieId)
    )
    return response["Items"]

def getReview(movieId,userId):
    table = db.Table("Reviews")
    response = table.scan(
    FilterExpression=Attr('MovieId').eq(movieId) & Attr('UserId').eq(userId)
    )
    return response["Items"]