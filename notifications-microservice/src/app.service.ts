import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { OrderCreatedEvent } from '@my/common';

// Type guard fonksiyonu (sınıf dışında tanımlanır)
function isTransporter(obj: unknown): obj is nodemailer.Transporter {
  return typeof obj === 'object' && obj !== null && 'sendMail' in obj;
}

@Injectable()
export class AppService {
  private readonly transporter: nodemailer.Transporter;

  constructor() {
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    if (isTransporter(transport)) {
      // Type assertion ile ESLint ve TS hatası engellenir
      this.transporter = transport as nodemailer.Transporter;
    } else {
      throw new Error('Failed to create nodemailer transporter');
    }
  }

  async orderCreatedEventHandler(orderCreatedEvent: OrderCreatedEvent) {
    console.log(orderCreatedEvent);
    await this.transporter.sendMail({
      from: 'E-Commerce App <noreply@ecommerce.com>',
      to: 'onurcan.svnc@yandex.com',
      subject: 'Order Created',
      text: 'Order Created',
    });
  }
}
