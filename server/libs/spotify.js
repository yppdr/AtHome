import axios from "axios"

export default class Spotify {

    /**
     * Construct the spotify instance
     * @param {string} token 
     */
    constructor (token) {
        this.token = token
        this.headers = { 
            'Authorization': `Bearer ${this.token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    /**
     * Retrieve the current playing song from the Spotify API
     * @returns {Object}
     */
    async getNowPlaying () {
        try {
            let response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing?market=ES&additional_types=episode', { headers: this.headers})
            let data = { title: response.data.item.name, artist: response.data.item.artists, album: response.data.item.album.name, thumbs: response.data.item.album.images, isPlaying: response.data.actions.is_playing }
            return data
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