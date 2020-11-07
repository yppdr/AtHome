import axios from 'axios';

export default class Alert {
  /**
   * If the const status passes to true it means that the notification has been made
   */
  constructor() {}

  /**
   * @param {string} type
   * @param {string} message
   */
  async sms(type, message) {
    try {
      await axios.get(
        `https://apifree.kiwinetwork.xyz/msg=${type} : ${message}`
      );
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * @param {string} type
   * @param {string} message
   */
  discord(type, message) {
    return false;
  }

  /**
   * @param {string} type
   * @param {string} message
   */
  email(type, message, mail) {
    return false;
  }
}
