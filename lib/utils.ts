
import { Event } from '../types.ts';

export const formatDateRange = (start: Date, end: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: false
  };
  const startDate = new Intl.DateTimeFormat('it-IT', options).format(start);
  const endDate = new Intl.DateTimeFormat('it-IT', { hour: '2-digit', minute: '2-digit', hour12: false }).format(end);
  return `${startDate} - ${endDate}`;
};

const toICSDate = (date: Date): string => {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
};

export const generateICSFile = (event: Event) => {
  const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//OrienteD117//App//IT
BEGIN:VEVENT
UID:${event.id}@oriented117.it
DTSTAMP:${toICSDate(new Date())}
DTSTART:${toICSDate(event.dataInizio)}
DTEND:${toICSDate(event.dataFine)}
SUMMARY:${event.nome}
DESCRIPTION:${event.descrizione.replace(/\n/g, '\\n')}
END:VEVENT
END:VCALENDAR
  `.trim();

  const blob = new Blob([icsContent], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${event.nome.replace(/\s/g, '_')}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
