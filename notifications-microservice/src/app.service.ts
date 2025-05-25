import { lastValueFrom } from 'rxjs';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  OrderCreatedEvent,
  SERVICES,
  UserPatterns,
  UserType,
} from '@my/common';

// Type guard fonksiyonu
function isTransporter(obj: unknown): obj is nodemailer.Transporter {
  return typeof obj === 'object' && obj !== null && 'sendMail' in obj;
}

@Injectable()
export class AppService {
  private readonly transporter: nodemailer.Transporter;
  constructor(
    @Inject(SERVICES.USERS.name)
    private readonly usersMicroservice: ClientProxy,
    configService: ConfigService,
  ) {
    const transport = nodemailer.createTransport({
      host: configService.get<string>('SMTP_HOST'),
      port: Number(configService.get<string>('SMTP_PORT')),
      secure: true,
      auth: {
        user: configService.get<string>('SMTP_USER'),
        pass: configService.get<string>('SMTP_PASS'),
      },
    });

    if (isTransporter(transport)) {
      this.transporter = transport as nodemailer.Transporter;
    } else {
      throw new Error('Failed to create nodemailer transporter');
    }
  }

  async orderCreatedEventHandler(orderCreatedEvent: OrderCreatedEvent) {
    return;
    const user = (await lastValueFrom(
      this.usersMicroservice.send(
        { cmd: UserPatterns.FindOne },
        { id: orderCreatedEvent.userId },
      ),
    )) as unknown as UserType;

    const mailOptions = {
      from: 'E-Commerce App <info@ecommerce.com>',
      to: user.email,
      subject: 'Siparişiniz Alındı! 🎉',
      html: orderCreatedHtmlTemplate(orderCreatedEvent),
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw new Error(`Failed to send email: ${error?.message}`);
    }
  }
}

function orderCreatedHtmlTemplate(order: {
  orderId: number;
  userId: number;
  totalPrice: number;
  items: { productId: number; quantity: number; price: number }[];
}) {
  return `
    <div style="font-family: Arial, sans-serif; color: #222;">
      <h2>Siparişiniz Alındı! 🎉</h2>
      <p>Merhaba,</p>
      <p><b>Sipariş Numaranız:</b> ${order.orderId}</p>
      <p><b>Toplam Tutar:</b> <span style="color: #27ae60;">${order.totalPrice} ₺</span></p>
      <h3>Ürünler:</h3>
      <table style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px;">Ürün ID</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Adet</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Birim Fiyat</th>
          </tr>
        </thead>
        <tbody>
          ${order.items
            .map(
              (item) => `
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">${item.productId}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${item.quantity}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${item.price} ₺</td>
            </tr>
          `,
            )
            .join('')}
        </tbody>
      </table>
      <p style="margin-top: 24px;">Siparişiniz en kısa sürede kargoya verilecektir.<br>Teşekkürler!</p>
      <hr>
      <small style="color: #888;">E-Commerce App | steamlevelmarket.com</small>
    </div>
  `;
}
