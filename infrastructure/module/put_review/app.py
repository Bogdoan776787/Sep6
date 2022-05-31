import json
import uuid
import boto3
from datetime import datetime


db = boto3.resource('dynamodb')



def lambda_handler(event, context):
    dt_iso = str(datetime.now().isoformat())
    #Generate Random ID
    id_db=uuid.uuid4()
    STATUS_CODE = 200
    body_params = json.loads(event["body"])
    text_message="SUCCESS"
    rating = body_params["movieRating"]
    movieId = body_params["movieId"]
    movieType = body_params["type"]

    table = db.Table("Reviews")
    table.put_item(
        Item={
            "ReviewId":str(id_db),
            "MovieId":body_params["movieId"],
            "UserId":body_params["userId"],
            "type":body_params["type"],
            "MovieRating":str(body_params["movieRating"]),
            "RatingComment":body_params["ratingComment"],
            "createdAt":dt_iso,
            "updatedAt":dt_iso
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
            "ReviewId":str(id_db),
            "MovieId":body_params["movieId"],
            "UserId":body_params["userId"],
            "type":body_params["type"],
            "MovieRating":int(body_params["movieRating"]),
            "RatingComment":body_params["ratingComment"],
        }),
    }