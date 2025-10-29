import { initEmailClient, sendContactEmail } from '../utils/emailClient.js';

const CATEGORY_CONFIG = {
    general: {
        subject: 'Allgemeine Anfrage',
        placeholder: 'Wie können wir Sie unterstützen?',
        fileLabel: 'Optional: Dokument (optional)',
        uploadText: 'Optional: Dokument hochladen',
        uploadHint: 'PDF, DOC, DOCX (Max. 10MB)',
        buttonText: 'Nachricht senden',
    },
    produkte: {
        subject: 'Anfrage zu delta3 Produkten',
        placeholder: 'Welche Produkte interessieren Sie? Gibt es konkrete Fragen?',
        fileLabel: 'Dokument hochladen (optional)',
        uploadText: 'Optional: Spezifikationen oder Anforderungen hochladen',
        uploadHint: 'PDF, DOC, DOCX (Max. 10MB)',
        buttonText: 'Anfrage senden',
    },
    service: {
        subject: 'Service & Support Anfrage',
        placeholder: 'Beschreiben Sie Ihr Anliegen oder Problem...',
        fileLabel: 'Dokument hochladen (optional)',
        uploadText: 'Optional: Logfiles oder Screenshots hochladen',
        uploadHint: 'PDF, DOC, DOCX (Max. 10MB)',
        buttonText: 'Support anfragen',
    },
    blog: {
        subject: 'Blog- / Wissen-Anfrage',
        placeholder: 'Zu welchen Themen wünschen Sie Informationen?',
        fileLabel: 'Dokument hochladen (optional)',
        uploadText: 'Optional: Dokument hochladen',
        uploadHint: 'PDF, DOC, DOCX (Max. 10MB)',
        buttonText: 'Nachricht senden',
    },
    karriere: {
        subject: 'Bewerbung / Karriere',
        placeholder: 'Für welche Position bewerben Sie sich? Welche Erfahrungen bringen Sie mit?',
        fileLabel: 'Bewerbungsunterlagen hochladen',
        fileRequired: true,
        uploadText: 'Lebenslauf oder Bewerbungsunterlagen hochladen',
        uploadHint: 'PDF (Max. 10MB)',
        buttonText: 'Bewerbung absenden',
        noteTitle: 'Bewerbung bei delta3',
        noteText: 'Bitte fügen Sie Ihren Lebenslauf sowie weitere relevante Unterlagen als PDF hinzu. Maximale Dateigröße: 10MB.',
        noteClass: 'info',
    },
    whitepaper: {
        subject: 'Whitepaper / Forschung',
        placeholder: 'Welche Forschungsergebnisse interessieren Sie?',
        fileLabel: 'Dokument hochladen (optional)',
        uploadText: 'Optional: Dokument hochladen',
        uploadHint: 'PDF, DOC, DOCX (Max. 10MB)',
        buttonText: 'Anfrage senden',
    },
    demo: {
        subject: 'Demo Anfrage',
        placeholder: 'Teilen Sie uns mit, welche Lösungen Sie testen möchten und wann ein Termin passt.',
        fileLabel: 'Dokument hochladen (optional)',
        uploadText: 'Optional: Anwendungsbeschreibung hochladen',
        uploadHint: 'PDF, DOC, DOCX (Max. 10MB)',
        buttonText: 'Demo anfragen',
        noteTitle: 'Demo-Anfrage',
        noteText: 'Wir melden uns innerhalb von 2 Werktagen, um einen passenden Termin abzustimmen.',
        noteClass: 'info',
    },
    other: {
        subject: 'Sonstige Anfrage',
        placeholder: 'Wie können wir Ihnen helfen?',
        fileLabel: 'Optional: Dokument (optional)',
        uploadText: 'Optional: Dokument hochladen',
        uploadHint: 'PDF, DOC, DOCX (Max. 10MB)',
        buttonText: 'Nachricht senden',
    },
};

function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function showSubmissionFeedback(container, message, type = 'success') {
    if (!container) return;
    container.textContent = message;
    container.className = `form-feedback ${type}`;
    container.style.display = 'block';
}

function hideSubmissionFeedback(container) {
    if (!container) return;
    container.textContent = '';
    container.className = 'form-feedback';
    container.style.display = 'none';
}

function applyCategoryConfig({
    config,
    subjectInput,
    messageTextarea,
    fileUploadLabel,
    fileRequired,
    fileUploadArea,
    uploadText,
    uploadHint,
    submitBtn,
    formNote,
    noteTitle,
    noteText,
    fileInput,
}) {
    if (config) {
        subjectInput.value = config.subject || '';
        messageTextarea.placeholder = config.placeholder || 'Ihre Nachricht an uns...';
        fileUploadLabel.textContent = config.fileLabel || 'Dokument hochladen (optional)';
        uploadText.textContent = config.uploadText || 'Klicken Sie hier oder ziehen Sie eine Datei hierher';
        uploadHint.textContent = config.uploadHint || 'PDF, DOC, DOCX (Max. 10MB)';
        submitBtn.textContent = config.buttonText || 'Nachricht senden';

        if (config.fileRequired) {
            fileRequired.style.display = 'inline';
            fileInput.required = true;
            fileUploadArea.style.borderColor = '#418FDE';
        } else {
            fileRequired.style.display = 'none';
            fileInput.required = false;
            fileUploadArea.style.borderColor = '#e0e0e0';
        }

        if (config.noteTitle) {
            formNote.style.display = 'block';
            formNote.className = config.noteClass ? `form-note ${config.noteClass}` : 'form-note';
            noteTitle.textContent = config.noteTitle;
            noteText.textContent = config.noteText || '';
        } else {
            formNote.style.display = 'none';
        }
    } else {
        subjectInput.value = '';
        messageTextarea.placeholder = 'Ihre Nachricht an uns...';
        fileUploadLabel.textContent = 'Dokument hochladen (optional)';
        fileRequired.style.display = 'none';
        fileInput.required = false;
        uploadText.textContent = 'Klicken Sie hier oder ziehen Sie eine Datei hierher';
        uploadHint.textContent = 'PDF, DOC, DOCX (Max. 10MB)';
        submitBtn.textContent = 'Nachricht senden';
        formNote.style.display = 'none';
        fileUploadArea.style.borderColor = '#e0e0e0';
    }
}

function prefillFromQuery({ categorySelect, subjectInput, messageTextarea }) {
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get('category');
    const demoParam = params.get('demo');
    const karriereParam = params.get('karriere');
    const positionParam = params.get('position');

    if (karriereParam === 'true' || categoryParam === 'karriere') {
        categorySelect.value = 'karriere';
    } else if (demoParam === 'true' || categoryParam === 'demo') {
        categorySelect.value = 'demo';
    } else if (categoryParam && CATEGORY_CONFIG[categoryParam]) {
        categorySelect.value = categoryParam;
    }

    if (positionParam) {
        subjectInput.value = `Bewerbung - ${positionParam}`;
        messageTextarea.placeholder = 'Beschreiben Sie kurz Ihre Motivation und Erfahrungen für diese Position...';
    }
}

export function initContactPage() {
    const form = document.getElementById('contactForm');
    if (!form) {
        return;
    }

    initEmailClient();

    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const categorySelect = document.getElementById('category');
    const subjectInput = document.getElementById('subject');
    const messageTextarea = document.getElementById('message');
    const fileUploadLabel = document.getElementById('fileUploadLabel');
    const fileRequired = document.getElementById('fileRequired');
    const fileUploadArea = document.getElementById('fileUploadArea');
    const uploadText = document.getElementById('uploadText');
    const uploadHint = document.getElementById('uploadHint');
    const submitBtn = document.getElementById('submitBtn');
    const formNote = document.getElementById('formNote');
    const noteTitle = document.getElementById('noteTitle');
    const noteText = document.getElementById('noteText');
    const fileInput = document.getElementById('fileInput');
    const selectedFileDiv = document.getElementById('selectedFile');
    const fileNameSpan = document.getElementById('fileName');
    const removeFileBtn = document.getElementById('removeFileBtn');

    const feedbackContainer = document.createElement('div');
    feedbackContainer.className = 'form-feedback';
    feedbackContainer.style.display = 'none';
    submitBtn.insertAdjacentElement('afterend', feedbackContainer);

    categorySelect.addEventListener('change', () => {
        const config = CATEGORY_CONFIG[categorySelect.value];
        applyCategoryConfig({
            config,
            subjectInput,
            messageTextarea,
            fileUploadLabel,
            fileRequired,
            fileUploadArea,
            uploadText,
            uploadHint,
            submitBtn,
            formNote,
            noteTitle,
            noteText,
            fileInput,
        });
        hideSubmissionFeedback(feedbackContainer);
    });

    fileUploadArea.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', () => {
        const [file] = fileInput.files;
        if (!file) {
            selectedFileDiv.style.display = 'none';
            fileUploadArea.style.display = 'block';
            return;
        }

        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            alert('Die Datei ist zu groß. Maximale Größe: 10MB');
            fileInput.value = '';
            return;
        }

        fileNameSpan.textContent = file.name;
        selectedFileDiv.style.display = 'flex';
        fileUploadArea.style.display = 'none';
    });

    removeFileBtn.addEventListener('click', () => {
        fileInput.value = '';
        selectedFileDiv.style.display = 'none';
        fileUploadArea.style.display = 'block';
    });

    fileUploadArea.addEventListener('dragover', (event) => {
        event.preventDefault();
        fileUploadArea.classList.add('dragover');
    });

    fileUploadArea.addEventListener('dragleave', () => {
        fileUploadArea.classList.remove('dragover');
    });

    fileUploadArea.addEventListener('drop', (event) => {
        event.preventDefault();
        fileUploadArea.classList.remove('dragover');

        if (event.dataTransfer.files.length > 0) {
            fileInput.files = event.dataTransfer.files;
            fileInput.dispatchEvent(new Event('change'));
        }
    });

    prefillFromQuery({ categorySelect, subjectInput, messageTextarea });

    if (categorySelect.value) {
        const config = CATEGORY_CONFIG[categorySelect.value];
        applyCategoryConfig({
            config,
            subjectInput,
            messageTextarea,
            fileUploadLabel,
            fileRequired,
            fileUploadArea,
            uploadText,
            uploadHint,
            submitBtn,
            formNote,
            noteTitle,
            noteText,
            fileInput,
        });
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        hideSubmissionFeedback(feedbackContainer);

        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const fromEmail = emailInput.value.trim();
        const categoryValue = categorySelect.value;
        const subject = subjectInput.value.trim();
        const message = messageTextarea.value.trim();

        if (!firstName || !lastName || !fromEmail || !categoryValue || !subject || !message) {
            showSubmissionFeedback(feedbackContainer, 'Bitte füllen Sie alle Pflichtfelder aus.', 'error');
            return;
        }

        const selectedOption = categorySelect.options[categorySelect.selectedIndex];
        const categoryLabel = selectedOption ? selectedOption.text : categoryValue;
        const fullName = `${firstName} ${lastName}`.trim();

        const file = fileInput.files[0];
        let attachment;
        if (file) {
            try {
                const dataUrl = await readFileAsDataUrl(file);
                attachment = {
                    name: file.name,
                    data: dataUrl,
                };
            } catch (error) {
                console.error('Fehler beim Lesen der Datei', error);
                showSubmissionFeedback(feedbackContainer, 'Die Datei konnte nicht verarbeitet werden. Bitte erneut versuchen.', 'error');
                return;
            }
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Wird gesendet…';

        try {
            await sendContactEmail({
                fullName,
                fromEmail,
                subject,
                categoryLabel,
                message,
                attachment,
            });

            showSubmissionFeedback(feedbackContainer, 'Vielen Dank! Ihre Nachricht wurde erfolgreich versendet.', 'success');
            form.reset();
            selectedFileDiv.style.display = 'none';
            fileUploadArea.style.display = 'block';

            const resetConfig = CATEGORY_CONFIG[categorySelect.value];
            applyCategoryConfig({
                config: resetConfig,
                subjectInput,
                messageTextarea,
                fileUploadLabel,
                fileRequired,
                fileUploadArea,
                uploadText,
                uploadHint,
                submitBtn,
                formNote,
                noteTitle,
                noteText,
                fileInput,
            });
        } catch (error) {
            console.error('E-Mail Versand fehlgeschlagen', error);
            showSubmissionFeedback(
                feedbackContainer,
                'Es ist ein Fehler beim Senden aufgetreten. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt über hello@delta3.io.',
                'error'
            );
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = CATEGORY_CONFIG[categorySelect.value]?.buttonText || 'Nachricht senden';
        }
    });
}
