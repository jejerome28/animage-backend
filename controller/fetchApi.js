const axios = require('axios');


const getAnime = async (url, params={}) => {
    const results = await axios({
        url: url,
        method: 'GET',
        params: params
    })
    
    return results.data.data
}



module.exports = getAnime;