import json
import boto3
from boto3.dynamodb.conditions import Key, Attr
import requests

db = boto3.resource('dynamodb')



def lambda_handler(event, context):
    
    status_code = 200
    text_message="SUCCESS"

    #calling tmdb in order to extract rating
    api_external_key = "2bc24570068939f0e5e7d4182262a186"
    url = "https://api.themoviedb.org/3/movie/MOVIE_ID?api_key=2bc24570068939f0e5e7d4182262a186&language=en-US"
    query_params = event["queryStringParameters"]


    items = getWatchListTable(query_params["userId"])

    #get reviews and add review to the item data
    for item in items:
        movieUrl = url.replace("MOVIE_ID", item["movieId"])
        resp = requests.get(movieUrl).json()
        item["movieRating"] = resp["vote_average"]
        item["movieName"] = resp["title"]
        item["movieDescription"] = resp["overview"]
        item["moviePhoto_src"] =  "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + resp["poster_path"]
        item["movieReleaseData"] = resp["release_date"]

    return {
        "statusCode": status_code,
        "body": json.dumps(items),
    }


def getWatchListTable(userId):
    table = db.Table("WatchList")
    response = table.scan(
    FilterExpression=Attr('userId').eq(userId)
    )
    return response["Items"]