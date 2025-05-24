import { Kafka } from 'kafkajs';
import { SERVICES } from '@my/common';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class OrdersKafkaProducerService implements OnModuleInit {
  private kafka = new Kafka({
    brokers: [`${SERVICES.KAFKA.host}:${SERVICES.KAFKA.port}`],
  });
  private producer = this.kafka.producer();

  async onModuleInit() {
    await this.producer.connect();
  }

  async emit(topic: string, message: any) {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  }
}
