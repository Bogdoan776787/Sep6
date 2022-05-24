import json
import uuid
import boto3
from datetime import datetime
import requests


db = boto3.resource('dynamodb')



def lambda_handler(event, context):
    dt_iso = str(datetime.now().isoformat())
    #Generate Random ID
    id_db=uuid.uuid4()
    status_code = 200
    body_params = json.loads(event["body"])
    text_message="SUCCESS"
    rating = body_params["movieRating"]
    movieId = body_params["movieId"]
    movieType = body_params["type"]
    sendReviewTotmdb(rating,movieId,movieType)
    
    table = db.Table("Reviews")
    table.put_item(
        Item={
            "ReviewId":str(id_db),
            "MovieId":body_params["movieId"],
            "UserId":body_params["userId"],
            "type":body_params["type"],
            "MovieRating":int(body_params["movieRating"]),
            "RatingComment":body_params["ratingComment"],
            "createdAt":dt_iso,
            "updatedAt":dt_iso
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


def sendReviewTotmdb(rating,movieId,movieType):
    api_external_key = "2bc24570068939f0e5e7d4182262a186"
    url = "https://api.themoviedb.org/3/" + movieType +  "/" + movieId + "/rating?api_key=" + api_external_key
    accessToken = getGuestSessionToken(api_external_key)
    body = {
        "value":rating,
        "guest_session_id" : accessToken
    }
    req = requests.post(url, data = body).json()
    return req
    
    
def getGuestSessionToken(api_key):
    url = "https://api.themoviedb.org/3/authentication/guest_session/new?api_key=" + api_key
    req = requests.get(url).json()
    return req["guest_session_id"]