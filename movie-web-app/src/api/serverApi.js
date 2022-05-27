import axios from 'axios';

const serverIP = "https://dt3tv45peg.execute-api.eu-central-1.amazonaws.com"
const serverApi = {
    //WATCH LIST APIs
    getWatchList(userId) {
        const url = serverIP + "/Stage/watch-list?userId=" + userId
        
        return axios.get(url);
    },
    removeFromWatchList(listId) {
        const url = serverIP + "/Stage/watch-list?listId=" + listId
        
        return axios.delete(url);
    },
    addToWatchList(userId, movieId, type) {
        //Type should be either tv or movie
        const url =serverIP +"/Stage/watch-list"
        let data = {
            userId: userId,
            movieId: movieId,
            type: type
        }
        return axios.put(url, data);
    },
    getOneFromWatchList(userId, movieId, type) {
        const url = serverIP + "/Stage/watch-list?userId=" + userId + "&movieId=" + movieId + "&type=" + type
        return axios.get(url);
    },

    //Reviews APIs
    putReviewForMovie(userId, movieId, type, movieRating) {
        
        const url = serverIP + "/Stage/reviews"
        let data =
        {
            userId: userId,
            movieId: movieId,
            type: type,
            movieRating: movieRating.toString(),
            ratingComment: ""
        }
        return axios.put(url, data);
    },

    getReviewsForMovie(movieId) {
        const url = serverIP + "/Stage/reviews?movieId=" + movieId
        return axios.get(url)
    },

    getReviewForMovieByUser(userId, movieId,movieType) {
        const url = serverIP + "/Stage/reviews?movieId=" + movieId + "&userId=" + userId + "&type=" + movieType
        
        return axios.get(url)
    },
    deleteReview(id)
    {
        const url = serverIP + "/Stage/reviews?reviewId=" + id
        return axios.delete(url)
    },


    //Comments APIs
    putCommentForMovie(movieId, userId, type, commentText) {
        const url = serverIP + "/Stage/comments"
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
        const url = serverIP + "/Stage/comments?movieId=" + movieId
        return axios.get(url)
    },



    //Favorite APIs
    getFavoriteShows(userId) {
        const url = serverIP + "/Stage/favorites?userId=" + userId
        
        return axios.get(url);
    },
    removeFromFavorite(favoriteId) {
        const url = serverIP + "/Stage/favorites?favoriteId=" + favoriteId
        
        return axios.delete(url);
    },
    addShowToFavorite(userId, movieId, type) {
        //Type should be either tv or movie
        const url = serverIP + "/Stage/favorites"
        let data = {
            userId: userId,
            movieId: movieId,
            type: type
        }
        return axios.put(url, data);
    },
    getOneShowFromFavorite(userId, movieId, type) {
        
        const url = serverIP + "/Stage/favorites?userId=" + userId + "&movieId=" + movieId + "&type=" + type
        return axios.get(url);
    },
}

export default serverApi;