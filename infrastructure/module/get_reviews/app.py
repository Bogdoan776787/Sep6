import json
import boto3
from boto3.dynamodb.conditions import Key, Attr


db = boto3.resource('dynamodb')



def lambda_handler(event, context):
    STATUS_CODE = 200
    query_params = event["queryStringParameters"]
    items = dict()
    items["Reviews"] = getReviews(query_params["movieId"],query_params["type"])
    if("userId" in query_params.keys()):
            response = getReview(query_params["movieId"], query_params["userId"],query_params["type"])
            items["userReview"] = response;
    print(items)
    return {
        "statusCode": STATUS_CODE,
        "headers": {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*", 
            "Access-Control-Allow-Methods": "GET"  
        },
        "body": json.dumps(items),
    }


def getReviews(movieId,movieType):
    table = db.Table("Reviews")
    response = table.scan(
    FilterExpression=Attr('MovieId').eq(movieId) & Attr('type').eq(movieType)
    )
    return response["Items"]

def getReview(movieId,userId,movieType):
    table = db.Table("Reviews")
    response = table.scan(
    FilterExpression=Attr('MovieId').eq(movieId) & Attr('UserId').eq(userId)& Attr('type').eq(movieType)
    )
    return response["Items"]