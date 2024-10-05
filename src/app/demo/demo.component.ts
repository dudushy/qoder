import { Component } from '@angular/core';

import { AppComponent } from '../app.component';

import * as QRCode from 'qrcode';

import { ZXingScannerModule } from '@zxing/ngx-scanner';

import jsQR from 'jsqr';

interface QRCodeType {
  value: string;
  label: string;
}

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [AppComponent, ZXingScannerModule],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss',
})
export class DemoComponent {
  TITLE = 'DemoComponent';

  debug: any = null;

  activeTab: string = 'generate';

  qrCodeTypes: QRCodeType[] = [
    { value: 'text', label: 'Text/URL' },
    { value: 'wifi', label: 'WiFi' },
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
    { value: 'sms', label: 'SMS' },
    { value: 'geo', label: 'Geo' },
    { value: 'contact', label: 'Contact' },
    { value: 'whatsapp', label: 'WhatsApp' },
  ];
  qrCodeType: string = this.qrCodeTypes[0].value;
  qrCodeImage: string = '';
  scannedResult: string = '';
  uploadedResult: string = '';

  constructor(public app: AppComponent) {
    const SCOPE = 'constructor';
    console.log(`[${this.TITLE}@${SCOPE}]`);

    // console.log(`[${this.TITLE}@${SCOPE}] this.app`, this.app);

    console.log(`[${this.TITLE}@${SCOPE}] this.activeTab`, this.activeTab);

    console.log(`[${this.TITLE}@${SCOPE}] this.qrCodeImage`, this.qrCodeImage);
    console.log(
      `[${this.TITLE}@${SCOPE}] this.scannedResult`,
      this.scannedResult,
    );
    console.log(
      `[${this.TITLE}@${SCOPE}] this.uploadedResult`,
      this.uploadedResult,
    );
  }

  toggleTab(tab: string) {
    const SCOPE = 'toggleTab';
    console.log(`[${this.TITLE}@${SCOPE}] tab`, tab);

    this.activeTab = tab;
    console.log(`[${this.TITLE}@${SCOPE}] this.activeTab`, this.activeTab);
  }

  formatQRCodeData(type: string, data: any): string {
    const SCOPE = 'formatQRCodeData';
    console.log(`[${this.TITLE}@${SCOPE}] type`, type);
    console.log(`[${this.TITLE}@${SCOPE}] data`, data);

    switch (type) {
      case 'text':
        return data;
      case 'wifi':
        return `WIFI:S:${data.ssid};T:${data.type || 'WPA'};P:${data.password};;`;
      case 'email':
        return `mailto:${data}`;
      case 'phone':
        return `tel:${data}`;
      case 'sms':
        return `sms:${data.number}:${data.message || ''}`;
      case 'geo':
        return `geo:${data.latitude},${data.longitude}`;
      case 'contact':
        return `MECARD:N:${data.name};ORG:${data.organization};TEL:${data.phone};EMAIL:${data.email};;`;
      case 'whatsapp':
        return `https://wa.me/${data}`;
      default:
        return data;
    }
  }

  onGenerateClick(data: any): void {
    const SCOPE = 'onGenerateClick';
    console.log(`[${this.TITLE}@${SCOPE}] this.qrCodeType`, this.qrCodeType);
    console.log(`[${this.TITLE}@${SCOPE}] data`, data);

    const formattedData = this.formatQRCodeData(this.qrCodeType, data);
    console.log(`[${this.TITLE}@${SCOPE}] formattedData`, formattedData);

    this.debug = formattedData;
    console.log(`[${this.TITLE}@${SCOPE}] this.debug`, this.debug);

    this.app.isLoading = true;

    QRCode.toDataURL(formattedData)
      .then((url: string) => {
        console.log(`[${this.TITLE}@${SCOPE}] url`, url);

        this.qrCodeImage = url;
        console.log(
          `[${this.TITLE}@${SCOPE}] this.qrCodeImage`,
          this.qrCodeImage,
        );

        this.app.isLoading = false;
      })
      .catch((err) => {
        console.error(`[${this.TITLE}@${SCOPE}] err`, err);

        this.app.isLoading = false;
      });
  }

  onCodeResult(result: any): void {
    const SCOPE = 'onCodeResult';
    console.log(`[${this.TITLE}@${SCOPE}] result`, result);

    const timeout = 1000;
    console.log(`[${this.TITLE}@${SCOPE}] timeout`, timeout);

    this.app.isLoading = true;

    setTimeout(() => {
      this.scannedResult = result;
      console.log(
        `[${this.TITLE}@${SCOPE}] this.scannedResult`,
        this.scannedResult,
      );

      this.app.isLoading = false;
    }, timeout);
  }

  onUploadFile(event: any): void {
    const SCOPE = 'onUploadFile';
    console.log(`[${this.TITLE}@${SCOPE}] event`, event);
    console.log(`[${this.TITLE}@${SCOPE}] event.target`, event.target);
    console.log(
      `[${this.TITLE}@${SCOPE}] event.target.files`,
      event.target.files,
    );

    const timeout = 1000;
    console.log(`[${this.TITLE}@${SCOPE}] timeout`, timeout);

    this.app.isLoading = true;

    setTimeout(() => {
      this.uploadedResult = 'Extracted QR Code Data';
      console.log(
        `[${this.TITLE}@${SCOPE}] this.uploadedResult`,
        this.uploadedResult,
      );

      this.app.isLoading = false;
    }, timeout);

    const file = event.target.files[0];
    console.log(`[${this.TITLE}@${SCOPE}] file`, file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        console.log(`[${this.TITLE}@${SCOPE}] e`, e);

        const img = new Image();
        img.src = e.target.result;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          console.log(`[${this.TITLE}@${SCOPE}] canvas`, canvas);

          const ctx = canvas.getContext('2d');
          console.log(`[${this.TITLE}@${SCOPE}] ctx`, ctx);

          if (ctx) {
            ctx.drawImage(img, 0, 0, img.width, img.height);

            const imageData = ctx.getImageData(0, 0, img.width, img.height);
            console.log(`[${this.TITLE}@${SCOPE}] imageData`, imageData);

            const code = jsQR(
              imageData.data,
              imageData.width,
              imageData.height,
            );
            console.log(`[${this.TITLE}@${SCOPE}] code`, code);

            if (code) {
              this.uploadedResult = code.data;
              console.log(
                `[${this.TITLE}@${SCOPE}] this.uploadedResult`,
                this.uploadedResult,
              );
            } else {
              console.log(`[${this.TITLE}@${SCOPE}] No QR code found`);
            }
          }
        };
      };
      reader.readAsDataURL(file);
    }
  }
}
