import emailjs from 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';

const EMAILJS_SERVICE_ID = 'YOUR_EMAILJS_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_EMAILJS_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY';
const DEFAULT_RECIPIENT = 'hello@delta3.io';

let emailClientReady = false;

export function initEmailClient() {
    if (emailClientReady) {
        return;
    }

    if (
        EMAILJS_SERVICE_ID.startsWith('YOUR_') ||
        EMAILJS_TEMPLATE_ID.startsWith('YOUR_') ||
        EMAILJS_PUBLIC_KEY.startsWith('YOUR_')
    ) {
        console.warn(
            'EmailJS ist noch nicht konfiguriert. Bitte tragen Sie Service-ID, Template-ID und Public Key in js/utils/emailClient.js ein.'
        );
        return;
    }

    emailjs.init(EMAILJS_PUBLIC_KEY);
    emailClientReady = true;
}

export async function sendContactEmail({
    fullName,
    fromEmail,
    subject,
    categoryLabel,
    message,
    attachment,
}) {
    if (!emailClientReady) {
        throw new Error('EmailJS nicht initialisiert. Bitte prüfen Sie die Konfiguration.');
    }

    const formattedSubject = `${categoryLabel} - ${subject}`;

    const templateParams = {
        to_email: DEFAULT_RECIPIENT,
        from_name: fullName,
        from_email: fromEmail,
        subject_line: formattedSubject,
        message_body: message,
        category_label: categoryLabel,
    };

    if (attachment) {
        templateParams.attachments = [
            {
                name: attachment.name,
                data: attachment.data,
            },
        ];
    }

    return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
}
