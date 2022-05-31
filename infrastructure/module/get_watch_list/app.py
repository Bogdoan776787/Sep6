import json
import boto3
from boto3.dynamodb.conditions import Key, Attr
import requests

db = boto3.resource('dynamodb')



def lambda_handler(event, context):
    
    STATUS_CODE = 200

    #calling tmdb in order to extract rating
    API_EXTERNAL_KEY = "2bc24570068939f0e5e7d4182262a186"
    url = "https://api.themoviedb.org/3/TYPE/MOVIE_ID?api_key="+ API_EXTERNAL_KEY+ "&language=en-US"
    query_params = event["queryStringParameters"]
    if("movieId" in query_params.keys()):
        response = getMovieFromWatchListTable(query_params["userId"],query_params["movieId"],query_params["type"])
        print(response)
        items = response
    
    else:
        items = getWatchListTable(query_params["userId"])

        #get reviews and add review to the item data
        for item in items:
            movieUrl = url.replace("MOVIE_ID", item["movieId"])
            movieUrl = movieUrl.replace("TYPE", item["type"])
            movieTitleTag = "title" if item["type"] == "movie"  else "name"
            releaseDate = "release_date" if item["type"] == "movie"  else "first_air_date"
            resp = requests.get(movieUrl).json()
            item["movieRating"] = getRating(item["movieId"],resp["vote_average"],resp["vote_count"])
            item["movieName"] = resp[movieTitleTag]
            item["movieDescription"] = resp["overview"]
            item["moviePhoto_src"] =  "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + resp["poster_path"]
            item["movieReleaseData"] = resp[releaseDate]

    return {
        "statusCode": STATUS_CODE,
        "headers": {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*", 
            "Access-Control-Allow-Methods": "GET"  
        },
        "body": json.dumps(items),
    }


def getWatchListTable(userId):
    table = db.Table("WatchList")
    response = table.scan(
    FilterExpression=Attr('userId').eq(userId)
    )
    return response["Items"]
    

def getMovieFromWatchListTable(userId,movieId,movieType):
    table = db.Table("WatchList")
    response = table.scan(
        FilterExpression=Attr('userId').eq(userId) & Attr('movieId').eq(movieId) & Attr('type').eq(movieType)
    )
    return response["Items"]

def getRating(movieId,rating,nrOfVotes):
    table = db.Table("Reviews")
    response = table.scan(
        FilterExpression=Attr('MovieId').eq(movieId)
    )
    new_rating = rating*nrOfVotes
    for k in response["Items"]:
        new_rating += int(k["MovieRating"])
    new_rating = new_rating/(len(response["Items"]) + nrOfVotes)
    return new_rating;
    
