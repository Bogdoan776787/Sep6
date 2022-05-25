import axios from 'axios';


const serverApi = {
    //WATCH LIST APIs
    getWatchList(userId) {
        const url = "https://wtdmb0rn8g.execute-api.eu-central-1.amazonaws.com/Stage/watch-list?userId=" + userId
        console.log(url)
        return axios.get(url);
    },
    removeFromWatchList(listId) {
        const url = "https://wtdmb0rn8g.execute-api.eu-central-1.amazonaws.com/Stage/watch-list?listId=" + listId
        console.log(url)
        return axios.delete(url);
    },
    addToWatchList(userId, movieId, type) {
        //Type should be either tv or movie
        const url = "https://wtdmb0rn8g.execute-api.eu-central-1.amazonaws.com/Stage/watch-list"
        let data = {
            userId: userId,
            movieId: movieId,
            type: type
        }
        return axios.put(url, data);
    },
    getOneFromWatchList(userId, movieId, type) {
        const url = "https://wtdmb0rn8g.execute-api.eu-central-1.amazonaws.com/Stage/watch-list?userId=" + userId + "&movieId=" + movieId + "&type=" + type
        return axios.get(url);
    },

    //Reviews APIs
    putReviewForMovie(userId, movieId, type, movieRating, ratingComment) {
        const url = "https://wtdmb0rn8g.execute-api.eu-central-1.amazonaws.com/Stage/reviews"
        let data =
        {
            userId: userId,
            movieId: movieId,
            type: type,
            movieRating: movieRating,
            ratingComment: ratingComment
        }
        return axios.put(url, data);
    },

    getReviewsForMovie(movieId) {
        const url = "https://wtdmb0rn8g.execute-api.eu-central-1.amazonaws.com/Stage/reviews?movieId=" + movieId
        return axios.get(url)
    },

    getReviewForMovieByUser(movieId, userId) {
        const url = "https://wtdmb0rn8g.execute-api.eu-central-1.amazonaws.com/Stage/reviews?movieId=" + movieId + "&userId=" + userId
        return axios.get(url)
    },


    //Comments APIs
    putCommentForMovie(movieId, userId, type, commentText) {
        const url = "https://wtdmb0rn8g.execute-api.eu-central-1.amazonaws.com/Stage/comments"
        let data =
        {
            movieId: movieId,
            userId: userId,
            type: type,
            commentText: commentText
        }
        return axios.put(url, data)

    },

    getCommentsForMovie(movieId) {
        const url = "https://wtdmb0rn8g.execute-api.eu-central-1.amazonaws.com/Stage/comments?movieId=" + movieId
        return axios.get(url)
    },



    //Favorite APIs
    getFavoriteShows(userId) {
        const url = "https://wtdmb0rn8g.execute-api.eu-central-1.amazonaws.com/Stage/favorite?userId=" + userId
        console.log(url)
        return axios.get(url);
    },
    removeFromFavorite(favoriteId) {
        const url = "https://wtdmb0rn8g.execute-api.eu-central-1.amazonaws.com/Stage/favorite?favoriteId=" + favoriteId
        console.log(url)
        return axios.delete(url);
    },
    addShowToFavorite(userId, movieId, type) {
        //Type should be either tv or movie
        const url = "https://wtdmb0rn8g.execute-api.eu-central-1.amazonaws.com/Stage/favorite"
        let data = {
            userId: userId,
            movieId: movieId,
            type: type
        }
        return axios.put(url, data);
    },
    getOneShowFromFavorite(userId, movieId, type) {
        const url = "https://wtdmb0rn8g.execute-api.eu-central-1.amazonaws.com/Stage/watch-list?favorite=" + userId + "&movieId=" + movieId + "&type=" + type
        return axios.get(url);
    },
}

export default serverApi;