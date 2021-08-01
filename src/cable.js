import { Channel, createCable } from "@anycable/core";

// channels/chat.js
class MessageChannel extends Channel {
  // Unique channel identifier (channel class for Action Cable)
  static identifier = "MessageChannel";

  async sendToken(message) {
    return this.perform("token", { message });
  }

  receive(message) {
    // if (message) {
    //   console.log(
    //     `[CableService] MessageChannel - incoming message: ${message}`,
    //   );
    // }
    // Fallback to the default behaviour
    super.receive(message);
  }
}

export default class CableService {
  cable;
  channel;
  setConnected;

  constructor(url, setConnected) {
    this.cable = createCable(url);
    this.channel = new MessageChannel();
    this.setConnected = setConnected;
    this.init();
  }

  async init() {
    console.log("[AnyCable] Subscribe to MessageChannel now...");

    await this.cable.subscribe(this.channel);
    console.log("[AnyCable] Success subscribe to MessageChannel: ");
    console.log(this.channel);
    this.setConnected(true);
    // const _ = await channel.perform('speak', { msg: 'Hello' })

    this.channel.on("message", (msg) => {
      console.log(`[AnyCable] incoming message: ${msg}`);
    });
  }

  async sendToken(message) {
    console.log(`[AnyCable] sending token: ${message}`);
    return this.channel.sendToken(message);
  }

  async disconnect() {
    console.log("[AnyCable] disconnecting any cable: ");
    await this.channel.disconnect();
    console.log("[AnyCable] successfully disconnect!");
    this.setConnected(false);
  }
}
