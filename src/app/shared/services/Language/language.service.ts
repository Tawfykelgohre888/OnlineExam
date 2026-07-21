import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly defaultLanguage = 'en';

  constructor(private translate: TranslateService) {
    this.initializeLanguage();
  }

  private initializeLanguage(): void {
    this.translate.addLangs(['en', 'ar']);

    this.translate.setFallbackLang(this.defaultLanguage);

    const savedLanguage = localStorage.getItem('language');

    if (savedLanguage) {
      this.translate.use(savedLanguage);
    } else {
      this.translate.use(this.defaultLanguage);
    }
  }

  changeLanguage(language: string): void {
    this.translate.use(language);

    localStorage.setItem('language', language);
  }

  getCurrentLanguage() {
    return this.translate.currentLang;
  }
}
