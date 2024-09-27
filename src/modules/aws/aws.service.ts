import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsService {
  sesClient: SESClient;
  constructor(private configService: ConfigService) {
    this.sesClient = new SESClient({
      region: 'ap-northeast-2',
      credentials: {
        secretAccessKey: this.configService.get('app.awsPrivateKey'),
        accessKeyId: this.configService.get('app.awsAccessKey'),
      },
    });
  }

  async sendMailBySES(email: string, subject: string) {
    try {
      const command = new SendEmailCommand({
        // 받는사람
        Destination: {
          CcAddresses: [],
          ToAddresses: [email],
        },
        // 메일 메시지
        Message: {
          // 메일 제목
          Subject: {
            Charset: 'UTF-8',
            Data: subject,
          },
          // 메일 본문
          Body: {
            Html: {
              Data: `123`,
            },
          },
        },
        Source: 'no-reply@kwkang.net',
      });

      const response = await this.sesClient.send(command);

      console.log('response', response);
    } catch (e) {
      console.log({
        credentials: {
          secretAccessKey: this.configService.get('app.awsPrivateKey'),
          accessKeyId: this.configService.get('app.awsAccessKey'),
        },
      });
      throw e;
    }
  }
}
