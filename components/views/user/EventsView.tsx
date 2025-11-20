
import React, { useContext, useMemo } from 'react';
import { Event, Booking } from '../../../types';
import { AuthContext } from '../../../contexts/AuthContext';
import { formatDateRange, generateICSFile } from '../../../lib/utils';
import Button from '../../ui/Button';

const EventCard: React.FC<{ event: Event; onBook: (event: Event) => void; isBooked: boolean }> = ({ event, onBook, isBooked }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 duration-300">
      <img src={event.urlImmagine} alt={event.nome} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{event.nome}</h3>
        <p className="text-amber-400 text-sm mb-3">{formatDateRange(event.dataInizio, event.dataFine)}</p>
        <p className="text-gray-300 mb-4 h-24 overflow-y-auto">{event.descrizione}</p>
        <Button onClick={() => onBook(event)} disabled={isBooked} className="w-full">
          {isBooked ? 'Prenotato' : 'Prenota Evento'}
        </Button>
      </div>
    </div>
  );
};


interface EventsViewProps {
  events: Event[];
  bookings: Booking[];
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
}

const EventsView: React.FC<EventsViewProps> = ({ events, bookings, setBookings }) => {
  const { currentUser } = useContext(AuthContext);

  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => a.dataInizio.getTime() - b.dataInizio.getTime());
  }, [events]);

  const handleBookEvent = (event: Event) => {
    if (!currentUser) return;
    const newBooking: Booking = {
      id: `book${Date.now()}`,
      eventId: event.id,
      userId: currentUser.uid,
      dataPrenotazione: new Date(),
    };
    setBookings(prev => [...prev, newBooking]);
    alert(`Evento "${event.nome}" prenotato con successo! Aggiungi un promemoria al tuo calendario.`);
    generateICSFile(event);
  };
  
  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">Eventi Futuri</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedEvents.map(event => {
            const isBooked = bookings.some(b => b.eventId === event.id && b.userId === currentUser?.uid);
            return (
                <EventCard key={event.id} event={event} onBook={handleBookEvent} isBooked={isBooked} />
            );
        })}
      </div>
    </div>
  );
};

export default EventsView;
