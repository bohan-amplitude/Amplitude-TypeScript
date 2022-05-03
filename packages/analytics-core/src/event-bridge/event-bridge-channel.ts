import { Event, EventBridgeReceiver } from '@amplitude/analytics-types';

export class EventBridgeChannel {
  channel: string;
  queue: Event[] = [];
  receiver: EventBridgeReceiver | undefined;

  constructor(channel: string) {
    this.channel = channel;
  }

  sendEvent(event: Event) {
    if (!this.receiver) {
      this.queue.push(event);
      return;
    }
    this.receiver.receive(this.channel, event);
  }

  setReceiver(receiver: EventBridgeReceiver) {
    if (this.receiver) {
      return;
    }
    this.receiver = receiver;
    const events = this.queue;
    this.queue = [];
    events.forEach((event) => {
      this.receiver?.receive(this.channel, event);
    });
  }
}
