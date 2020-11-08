import axios from 'axios';
import webhook from 'webhook-discord';

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
 
    const Hook = new webhook.Webhook("URL");
     
var ts_hms = new Date();

var dt = ts_hms.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });

const msg = new webhook.MessageBuilder()
                .setName("KiwiNetwork")
                .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/France_road_sign_A14.svg/220px-France_road_sign_A14.svg.png")
                .setTitle("YOLO LE TITRE")
                .setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non augue facilisis, volutpat odio ultricies, euismod dui. Phasellus volutpat erat et magna faucibus, eget blandit augue blandit. Vestibulum vitae ultrices quam. Sed et mattis est, ut gravida urna. Pellentesque ac justo urna. Aenean et massa at est fermentum ultricies a vel erat. Aliquam commodo vitae odio placerat ornare. Morbi non fermentum sem. Nullam elementum fermentum iaculis. Suspendisse vel diam mauris. Curabitur tempus euismod ante eu vestibulum. Duis dictum ante id orci mattis efficitur. Vestibulum porttitor eros auctor diam fringilla fermentum. Nunc nibh nisl, porta non metus et, tempor varius velit. Sed dignissim vel mi sit amet sagittis.")
                .setFooter(dt)
                .setColor("#fc0317");
Hook.send(msg);

    return false;
  }

}
