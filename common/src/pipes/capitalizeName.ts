import { Injectable } from '@nestjs/common';

@Injectable()
export class CapitalizeNamePipe {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: string): string {
    if (!value || typeof value !== 'string') return value;

    const words = value.split(' ');
    const capitalizedWords = words.map((word) => {
      if (word.length > 2) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      } else {
        return word.toLowerCase();
      }
    });

    return capitalizedWords.join(' ');
  }
}
