import axios from 'axios';


const serverApi = {
    getWatchList(userId)
    {
        const url = "https://wtdmb0rn8g.execute-api.eu-central-1.amazonaws.com/Stage/watch-list?userId=" + userId
        console.log(url)
        return axios.get(url);        
    },
    removeFromWatchList(listId)
    {
        const url = "https://wtdmb0rn8g.execute-api.eu-central-1.amazonaws.com/Stage/watch-list?listId="+listId
        console.log(url)
        return axios.delete(url);  
    },
    addToWatchList(userId,movieId,type)
    {
        //Type should be either tv or movie
        const url = "https://wtdmb0rn8g.execute-api.eu-central-1.amazonaws.com/Stage/watch-list"
        let data = {
            userId:userId,
            movieId:movieId,
            type:type
        }
        return axios.put(url,data);  
    },
    getOneFromWatchList(userId,movieId,type)
    {
        const url = "https://wtdmb0rn8g.execute-api.eu-central-1.amazonaws.com/Stage/watch-list?userId=" + userId + "&movieId=" + movieId + "&type=" + type
        return axios.get(url);  
    }
}

export default serverApi;