
import { User, UserRole, Event, AudioGuide, DirectoryMember, Booking, UsefulReference } from './types.ts';

export const MOCK_USERS: User[] = [
  { uid: 'admin01', nome: 'Maestro', cognome: 'Venerabile', telefono: '111222333', nickname: 'admin', passwordHash: 'admin', ruolo: UserRole.ADMIN },
  { uid: 'user01', nome: 'Mario', cognome: 'Rossi', telefono: '333444555', nickname: 'mario', passwordHash: 'password', ruolo: UserRole.USER },
  { uid: 'user02', nome: 'Luca', cognome: 'Bianchi', telefono: '333666777', nickname: 'luca', passwordHash: 'password', ruolo: UserRole.USER },
  { uid: 'user03', nome: 'Giovanni', cognome: 'Verdi', telefono: '333888999', nickname: 'giovanni', passwordHash: 'password', ruolo: UserRole.USER },
];

export const MOCK_EVENTS: Event[] = [
  { 
    id: 'evt01',
    nome: 'Tornata Rituale',
    descrizione: 'Lavori rituali nel tempio. Si prega di arrivare con 15 minuti di anticipo. Seguirà un\'agape fraterna.',
    urlImmagine: 'https://picsum.photos/seed/masonic1/800/400',
    dataInizio: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), 
    dataFine: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
  },
  { 
    id: 'evt02',
    nome: 'Conferenza Pubblica: Simbolismo',
    descrizione: 'Una conferenza aperta al pubblico sul ruolo del simbolismo nella società moderna. Relatore: Prof. Bianchi.',
    urlImmagine: 'https://picsum.photos/seed/masonic2/800/400',
    dataInizio: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000), 
    dataFine: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000),
  },
  { 
    id: 'evt03',
    nome: 'Solstizio d\'Estate',
    descrizione: 'Celebrazione del Solstizio d\'Estate con una tornata speciale seguita da una cena all\'aperto.',
    urlImmagine: 'https://picsum.photos/seed/masonic3/800/400',
    dataInizio: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000), 
    dataFine: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000),
  }
];

export const MOCK_AUDIO_GUIDES: AudioGuide[] = [
  { id: 'ag01', nomeFile: 'Introduzione al Simbolismo', urlAudio: 'audio/sample1.mp3', urlImmagine: 'https://picsum.photos/seed/audio1/300/300', ordinamento: 1 },
  { id: 'ag02', nomeFile: 'La Storia della Loggia', urlAudio: 'audio/sample2.mp3', urlImmagine: 'https://picsum.photos/seed/audio2/300/300', ordinamento: 2 },
  { id: 'ag03', nomeFile: 'Meditazione Guidata', urlAudio: 'audio/sample3.mp3', urlImmagine: 'https://picsum.photos/seed/audio3/300/300', ordinamento: 3 },
];

export const MOCK_DIRECTORY: DirectoryMember[] = [
  { id: 'dir01', userId: 'user01', nome: 'Mario', cognome: 'Rossi', telefono: '333444555', professione: 'Architetto', indirizzo: 'Via Roma 1, Firenze', azienda: 'Studio Architettura Rossi' },
  { id: 'dir02', userId: 'user02', nome: 'Luca', cognome: 'Bianchi', telefono: '333666777', professione: 'Medico', indirizzo: 'Via Cavour 10, Firenze', azienda: 'Ospedale Careggi' },
  { id: 'dir03', userId: 'user03', nome: 'Giovanni', cognome: 'Verdi', telefono: '333888999', professione: 'Avvocato', indirizzo: 'Piazza della Signoria 5, Firenze', azienda: 'Studio Legale Verdi & Associati' },
  { id: 'dir04', nome: 'Paolo', cognome: 'Neri', telefono: '333111222', professione: 'Ingegnere', indirizzo: 'Viale Europa 20, Firenze', azienda: 'Neri Engineering' },
];

export const MOCK_BOOKINGS: Booking[] = [];

export const MOCK_USEFUL_REFERENCES: UsefulReference[] = [
  { id: 'ref01', titolo: 'Statuto della Loggia', descrizione: 'Il regolamento interno che disciplina i lavori e la condotta dei fratelli.' },
  { id: 'ref02', titolo: 'Calendario dei Lavori', descrizione: 'Documento PDF scaricabile con le date di tutte le tornate dell\'anno in corso.' },
  { id: 'ref03', titolo: 'Contatti Segreteria', descrizione: 'Email: segreteria@dante117.it - Telefono urgenze: 333-0000000' },
  { id: 'ref04', titolo: 'Codice IBAN Tesoreria', descrizione: 'IT00 X000 0000 0000 0000 0000 0000 000 - Intestato a Associazione Culturale Dante' },
  { id: 'ref05', titolo: 'Procedura di Tegolatura', descrizione: 'Linee guida per l\'accoglienza dei fratelli visitatori.' },
  { id: 'ref06', titolo: 'Link Gran Loggia', descrizione: 'www.grandeloggia.it - Portale ufficiale.' },
  { id: 'ref07', titolo: 'Emergenze', descrizione: 'Procedura di evacuazione del Tempio in caso di incendio.' },
];
