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
    url = "https://api.themoviedb.org/3/TYPE/MOVIE_ID?api_key="+ api_external_key+ "&language=en-US"
    query_params = event["queryStringParameters"]
    if("movieId" in query_params.keys()):
        response = getMovieFromWatchListTable(query_params["userId"],query_params["movieId"])
        print(response)
        items = {
            "message": True if len(response)>0 else False
        }
    
    else:
        items = getWatchListTable(query_params["userId"])

        #get reviews and add review to the item data
        for item in items:
            movieUrl = url.replace("MOVIE_ID", item["movieId"])
            movieUrl = movieUrl.replace("TYPE", item["type"])
            movieTitleTag = "title" if item["type"] == "movie"  else "original_name"
            releaseDate = "release_date" if item["type"] == "movie"  else "first_air_date"
            resp = requests.get(movieUrl).json()
            item["movieRating"] = resp["vote_average"]
            item["movieName"] = resp[movieTitleTag]
            item["movieDescription"] = resp["overview"]
            item["moviePhoto_src"] =  "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + resp["poster_path"]
            item["movieReleaseData"] = resp[releaseDate]

    return {
        "statusCode": status_code,
        "headers": {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*", 
            "Access-Control-Allow-Methods": "GET"  
        },
        "body": json.dumps(items),
    }


def getWatchListTable(userId):
    table = db.Table("Favorite")
    response = table.scan(
    FilterExpression=Attr('userId').eq(userId)
    )
    return response["Items"]
    

def getMovieFromWatchListTable(userId,movieId):
    table = db.Table("Favorite")
    response = table.scan(
        FilterExpression=Attr('userId').eq(userId) & Attr('movieId').eq(movieId)
    )
    return response["Items"]