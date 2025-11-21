
import React, { useState, useEffect } from 'react';
import { AudioGuide } from '../../../types.ts';
import Button from '../../ui/Button.tsx';
import Input from '../../ui/Input.tsx';

interface AudioGuideFormProps {
    guide: AudioGuide | Omit<AudioGuide, 'id'> | null;
    onSave: (guide: AudioGuide | Omit<AudioGuide, 'id'>) => void;
    onCancel: () => void;
}

const AudioGuideForm: React.FC<AudioGuideFormProps> = ({ guide, onSave, onCancel }) => {
    const [formData, setFormData] = useState(guide);
    const isEditing = guide && 'id' in guide;

    useEffect(() => {
        setFormData(guide);
    }, [guide]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => prev ? { ...prev, [name]: type === 'number' ? parseInt(value) || 0 : value } : null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData) {
            onSave(formData);
        }
    };

    if (!formData) return null;

    return (
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-bold text-white mb-4">{isEditing ? 'Modifica Guida Audio' : 'Aggiungi Guida Audio'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input name="nomeFile" value={formData.nomeFile} onChange={handleChange} placeholder="Nome File" required />
                <Input name="urlAudio" value={formData.urlAudio} onChange={handleChange} placeholder="URL File Audio (.mp3)" required />
                <Input name="urlImmagine" value={formData.urlImmagine} onChange={handleChange} placeholder="URL Immagine Copertina" required />
                <Input name="ordinamento" type="number" value={formData.ordinamento} onChange={handleChange} placeholder="Ordinamento" required />

                <div className="flex justify-end space-x-3">
                    <Button type="button" variant="secondary" onClick={onCancel}>Annulla</Button>
                    <Button type="submit">{isEditing ? 'Aggiorna Guida' : 'Salva Guida'}</Button>
                </div>
            </form>
        </div>
    );
};

interface AudioGuideManagementProps {
    guides: AudioGuide[];
    onAdd: (guide: Omit<AudioGuide, 'id'>) => void;
    onUpdate: (guide: AudioGuide) => void;
    onDelete: (guideId: string) => void;
}

const AudioGuideManagement: React.FC<AudioGuideManagementProps> = ({ guides, onAdd, onUpdate, onDelete }) => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingGuide, setEditingGuide] = useState<AudioGuide | null>(null);
    
    const emptyGuide: Omit<AudioGuide, 'id'> = {
        nomeFile: '', urlAudio: '', urlImmagine: '', ordinamento: 0
    };

    const handleAddNew = () => {
        setEditingGuide(null);
        setIsFormVisible(true);
    };

    const handleEdit = (guide: AudioGuide) => {
        setEditingGuide(guide);
        setIsFormVisible(true);
    };

    const handleSave = (guide: AudioGuide | Omit<AudioGuide, 'id'>) => {
        if ('id' in guide) {
            onUpdate(guide);
        } else {
            onAdd(guide);
        }
        setIsFormVisible(false);
        setEditingGuide(null);
    };

    const sortedGuides = [...guides].sort((a,b) => a.ordinamento - b.ordinamento);

    return (
        <div>
             <div className="flex justify-end mb-4">
                <Button onClick={handleAddNew}>Aggiungi Guida Audio</Button>
            </div>
            
            {isFormVisible && (
                <AudioGuideForm 
                    guide={editingGuide || emptyGuide}
                    onSave={handleSave}
                    onCancel={() => setIsFormVisible(false)}
                />
            )}

            <div className="bg-gray-800 rounded-lg shadow-lg overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="p-4 font-semibold">Ordinamento</th>
                            <th className="p-4 font-semibold">Nome File</th>
                            <th className="p-4 font-semibold text-right">Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedGuides.map(guide => (
                            <tr key={guide.id} className="border-b border-gray-700 last:border-b-0 hover:bg-gray-700/50">
                                <td className="p-4">{guide.ordinamento}</td>
                                <td className="p-4">{guide.nomeFile}</td>
                                <td className="p-4 flex justify-end space-x-2">
                                    <Button variant="secondary" onClick={() => handleEdit(guide)}>Modifica</Button>
                                    <Button variant="danger" onClick={() => onDelete(guide.id)}>Elimina</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AudioGuideManagement;
