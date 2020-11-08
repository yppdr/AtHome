import axios from "axios"

/**
 * Weather API Mapper for OpenWeather API
 * @property {string} token
 */
export default class Weather {

    /**
     * Construct the weather instance
     * @param {string} token 
     */
    constructor(token) {
        this.token = token
    }

    /**
     * Retrieve weather status from given location
     * @param {string} city 
     * 
     * @returns {Object}
     */
    getCurrentWeather(city) {
        try {
            let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.token}&units=metric&lang=fr`)
            console.log(response)
            return response.data
        } catch(e) {
            console.log(`${e.response.status} ${e.response.statusText} - ${e.response.data.error.message}`)
            return {
                status: e.response.status,
                statusText: e.response.statusText,
                message: e.response.data.error.message
            };
        }
    }
}