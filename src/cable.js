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
  connected;

  constructor(url) {
    this.cable = createCable(url);
    this.channel = new MessageChannel();
    this.init();
  }

  async init() {
    await this.cable.subscribe(this.channel);
    console.log("[AnyCable] success subscribe to channel: ");
    console.log(this.channel);
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
  }
}
