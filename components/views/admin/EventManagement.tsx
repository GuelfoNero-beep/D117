import React, { useState, useEffect } from 'react';
import { Event } from '../../../types';
import Button from '../../ui/Button';
import Input from '../../ui/Input';

// FIX: Define a separate type for the form data to handle string dates for input fields.
type EventFormData = Omit<Event, 'id' | 'dataInizio' | 'dataFine'> & {
    id?: string;
    dataInizio: string;
    dataFine: string;
};

interface EventFormProps {
    // FIX: Simplify the event prop to accept only types with Date objects, which matches what the parent component provides.
    event: Event | Omit<Event, 'id'> | null;
    onSave: (event: Event | Omit<Event, 'id'>) => void;
    onCancel: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ event, onSave, onCancel }) => {
    // FIX: Use the new EventFormData type for the form state to avoid type conflicts.
    const [formData, setFormData] = useState<EventFormData | null>(null);
    const isEditing = event && 'id' in event;

    useEffect(() => {
        // FIX: Consistently convert Date objects from props to a string format required by datetime-local inputs.
        if (event) {
            const convertDate = (date: Date) => {
                const pad = (num: number) => num.toString().padStart(2, '0');
                return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
            };
            setFormData({
                ...event,
                dataInizio: convertDate(event.dataInizio),
                dataFine: convertDate(event.dataFine),
            });
        }
    }, [event]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => prev ? { ...prev, [name]: value } : null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData) {
            // FIX: Convert string dates from the form back to Date objects before saving.
            const dataToSave = {
                ...formData,
                dataInizio: new Date(formData.dataInizio),
                dataFine: new Date(formData.dataFine),
            };
            onSave(dataToSave as Event | Omit<Event, 'id'>);
        }
    };

    if (!formData) return null;

    return (
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-bold text-white mb-4">{isEditing ? 'Modifica Evento' : 'Aggiungi Nuovo Evento'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome Evento" required />
                <textarea name="descrizione" value={formData.descrizione} onChange={handleChange} placeholder="Descrizione" required 
                    className="w-full h-32 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"/>
                <Input name="urlImmagine" value={formData.urlImmagine} onChange={handleChange} placeholder="URL Immagine" required />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="dataInizio" className="block text-sm font-medium text-gray-300 mb-1">Inizio Evento</label>
                        {/* FIX: The value is now correctly a string, resolving the error. */}
                        <Input id="dataInizio" name="dataInizio" type="datetime-local" value={formData.dataInizio} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="dataFine" className="block text-sm font-medium text-gray-300 mb-1">Fine Evento</label>
                        {/* FIX: The value is now correctly a string, resolving the error. */}
                        <Input id="dataFine" name="dataFine" type="datetime-local" value={formData.dataFine} onChange={handleChange} required />
                    </div>
                </div>
                <div className="flex justify-end space-x-3">
                    <Button type="button" variant="secondary" onClick={onCancel}>Annulla</Button>
                    <Button type="submit">{isEditing ? 'Aggiorna Evento' : 'Salva Evento'}</Button>
                </div>
            </form>
        </div>
    );
};


interface EventManagementProps {
    events: Event[];
    onAdd: (event: Omit<Event, 'id'>) => void;
    onUpdate: (event: Event) => void;
    onDelete: (eventId: string) => void;
}

const EventManagement: React.FC<EventManagementProps> = ({ events, onAdd, onUpdate, onDelete }) => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    
    const emptyEvent: Omit<Event, 'id'> = {
        nome: '', descrizione: '', urlImmagine: '', dataInizio: new Date(), dataFine: new Date()
    };

    const handleAddNew = () => {
        setEditingEvent(null);
        setIsFormVisible(true);
    };

    const handleEdit = (event: Event) => {
        setEditingEvent(event);
        setIsFormVisible(true);
    };

    const handleSave = (event: Event | Omit<Event, 'id'>) => {
        if ('id' in event) {
            onUpdate(event);
        } else {
            onAdd(event);
        }
        setIsFormVisible(false);
        setEditingEvent(null);
    };
    
    const sortedEvents = [...events].sort((a, b) => a.dataInizio.getTime() - b.dataInizio.getTime());

    return (
        <div>
             <div className="flex justify-end mb-4">
                <Button onClick={handleAddNew}>Aggiungi Evento</Button>
            </div>
            
            {isFormVisible && (
                <EventForm 
                    // FIX: This prop passing is now type-correct due to the change in EventFormProps, resolving the assignment error.
                    event={editingEvent || emptyEvent}
                    onSave={handleSave}
                    onCancel={() => setIsFormVisible(false)}
                />
            )}

            <div className="bg-gray-800 rounded-lg shadow-lg overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="p-4 font-semibold">Nome Evento</th>
                            <th className="p-4 font-semibold">Data Inizio</th>
                            <th className="p-4 font-semibold text-right">Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedEvents.map(event => (
                            <tr key={event.id} className="border-b border-gray-700 last:border-b-0 hover:bg-gray-700/50">
                                <td className="p-4">{event.nome}</td>
                                <td className="p-4">{event.dataInizio.toLocaleString('it-IT')}</td>
                                <td className="p-4 flex justify-end space-x-2">
                                    <Button variant="secondary" onClick={() => handleEdit(event)}>Modifica</Button>
                                    <Button variant="danger" onClick={() => onDelete(event.id)}>Elimina</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EventManagement;
