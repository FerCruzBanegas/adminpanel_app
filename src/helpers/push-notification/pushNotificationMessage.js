/*

Supported languages

 // English - en
  // Spanish - es
  // French - fr
  // Russian - ru
  // Japanese - ja	
  // Indonesian - id
  // Croatian - hr
  // Chinese - zh
  // Swedish - sv
*/

import { capitalizeFirstLetter } from '../capitalizeFirst';

export async function pushNotificationMessage(type, requestData, lang) {
    let title = '', message = '', requestLang;
    let supportedLang = ['en', 'es', 'fr', 'ru', 'ja', 'id', 'hr', 'zh', 'sv', 'ar'];
    requestLang = lang ? lang : 'en';
    requestLang = (supportedLang.indexOf(requestLang) >= 0) ? requestLang : 'en';

    if (type === 'banService') {
        if (requestLang == 'en') {
            title = `One-Moment-Please! Your account has been banned!`;
            message = `One-Moment-Please! Your account has been banned! Please contact our support for any help.`;
        } else if (requestLang == 'es') {
            title = '¡Un momento por favor! ¡Tu cuenta ha sido baneada!';
            message = `¡Un momento por favor! ¡Tu cuenta ha sido baneada! Póngase en contacto con nuestro soporte para cualquier ayuda.`;
        } else if (requestLang == 'fr') {
            title = "Un instant s'il vous plaît! Votre compte a été banni !";
            message = `Un instant s'il vous plaît! Votre compte a été banni ! Veuillez contacter notre support pour toute aide.`;
        } else if (requestLang == 'ru') {
            title = 'Один момент, пожалуйста! Ваш аккаунт заблокирован!';
            message = `Один момент, пожалуйста! Ваш аккаунт заблокирован! Пожалуйста, свяжитесь с нашей службой поддержки для любой помощи.`;
        } else if (requestLang == 'ja') {
            title = 'ちょっと待ってください！あなたのアカウントは禁止されました！';
            message = `ちょっと待ってください！あなたのアカウントは禁止されました！ヘルプが必要な場合は、サポートにお問い合わせください。`;
        } else if (requestLang == 'id') {
            title = 'Tolong tunggu sebentar! Akun Anda telah diblokir!';
            message = `Tolong tunggu sebentar! Akun Anda telah diblokir! Silakan hubungi dukungan kami untuk bantuan apa pun.`;
        } else if (requestLang == 'hr') {
            title = 'Tolong tunggu sebentar! Akun Anda telah diblokir!';
            message = `Trenutak molim! Vaš račun je zabranjen! Molimo kontaktirajte našu podršku za bilo kakvu pomoć.`;
        } else if (requestLang == 'zh') {
            title = '稍等一会儿！您的帐户已被禁止！';
            message = `稍等一会儿！您的帐户已被禁止！如需任何帮助，请联系我们的支持人员。`;
        } else if (requestLang == 'sv') {
            title = 'Ett ögonblick tack! Ditt konto har förbjudits!';
            message = `Ett ögonblick tack! Ditt konto har förbjudits! Kontakta vår support för all hjälp.`;
        } else if (requestLang == 'ar') {
            title = 'لحظة واحدة من فضلك! تم حظر الحساب الخاص بك!';
            message = `لحظة واحدة من فضلك! تم حظر الحساب الخاص بك! يرجى الاتصال بدعمنا للحصول على أي مساعدة.`;
        }
    }

    return {
        title,
        message
    };
}

export function formatAmount(amount, currency, locale) {
    let convertCurrency = 'USD';
    if (amount) {
        convertCurrency = currency ? currency : convertCurrency;
        return amount.toLocaleString(locale, { style: 'currency', currency: convertCurrency });
    } else {
        return null;
    }
}

export function formatText(text) {
    let capitalizedText = capitalizeFirstLetter(text);
    return capitalizedText ? capitalizedText.trim() : '';
}