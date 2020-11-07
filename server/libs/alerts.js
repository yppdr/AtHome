import axios from "axios"

 class alerts{
    
    /**
     * If the const status passes to true it means that the notification has been made
     * @param {boolean} status 
     */
    constructor(){
        this.status = false;
    }

    /**
     * @param {string} type 
     * @param {string} message 
     */
    sms(type, message){

        axios.get('https://apifree.kiwinetwork.xyz/msg=efjkejfosjefjiosefjio')
        .then(function (response) {
            this.status = true;
        })
        .catch(function (error) {
            console.log(error);
            this.status = false;  
        })
        console.log(this.status);
        return this.status
    }

    /**
     * @param {string} type 
     * @param {string} message 
     */
    discord(type, message){
        
        return this.status
    }

    /** 
     * @param {string} type 
     * @param {string} message
     */
    email(type, message, mail){

        return this.status
    }


 }