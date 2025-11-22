
// Using a const assertion creates a safer runtime object than a standard enum
// preventing "ReferenceError: UserRole is not defined" in some bundlers/environments.
export const UserRole = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

// Extract the type from the values of the const object
export type UserRole = typeof UserRole[keyof typeof UserRole];

export interface User {
  uid: string;
  nome: string;
  cognome: string;
  telefono: string;
  nickname: string;
  passwordHash: string; // This would be a real hash in a real app
  ruolo: UserRole;
}

export interface Event {
  id: string;
  nome: string;
  descrizione: string;
  urlImmagine: string;
  dataInizio: Date;
  dataFine: Date;
}

export interface Booking {
  id: string;
  eventId: string;
  userId: string;
  dataPrenotazione: Date;
}

export interface AudioGuide {
  id: string;
  nomeFile: string;
  urlAudio: string;
  urlImmagine: string;
  ordinamento: number;
}

export interface DirectoryMember {
  id: string;
  userId?: string; // Optional link to a user account
  nome: string;
  cognome: string;
  telefono: string;
  professione: string;
  indirizzo: string;
  azienda: string;
}

export interface UsefulReference {
  id: string;
  titolo: string;
  descrizione: string;
}