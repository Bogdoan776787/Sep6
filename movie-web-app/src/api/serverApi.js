import axiosClient from "./axiosClient";


const serverApi = {
    getWatchList(userId)
    {
        const url = "https://wtdmb0rn8g.execute-api.eu-central-1.amazonaws.com/Stage/watch-list?userId=" + userId
        return axiosClient.get(url);        
    }
}

export default serverApi;