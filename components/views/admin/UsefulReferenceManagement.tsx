
import React, { useState, useEffect } from 'react';
import { UsefulReference } from '../../../types.ts';
import Button from '../../ui/Button.tsx';
import Input from '../../ui/Input.tsx';

interface UsefulReferenceFormProps {
    reference: UsefulReference | Omit<UsefulReference, 'id'> | null;
    onSave: (reference: UsefulReference | Omit<UsefulReference, 'id'>) => void;
    onCancel: () => void;
}

const UsefulReferenceForm: React.FC<UsefulReferenceFormProps> = ({ reference, onSave, onCancel }) => {
    const [formData, setFormData] = useState(reference);
    const isEditing = reference && 'id' in reference;

    useEffect(() => {
        setFormData(reference);
    }, [reference]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => prev ? { ...prev, [name]: value } : null);
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
            <h3 className="text-xl font-bold text-white mb-4">{isEditing ? 'Modifica Riferimento' : 'Aggiungi Riferimento'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input name="titolo" value={formData.titolo} onChange={handleChange} placeholder="Titolo" required />
                <textarea 
                    name="descrizione" 
                    value={formData.descrizione} 
                    onChange={handleChange} 
                    placeholder="Descrizione" 
                    required 
                    className="w-full h-32 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                
                <div className="flex justify-end space-x-3">
                    <Button type="button" variant="secondary" onClick={onCancel}>Annulla</Button>
                    <Button type="submit">{isEditing ? 'Aggiorna' : 'Salva'}</Button>
                </div>
            </form>
        </div>
    );
};

interface UsefulReferenceManagementProps {
    references: UsefulReference[];
    onAdd: (reference: Omit<UsefulReference, 'id'>) => void;
    onUpdate: (reference: UsefulReference) => void;
    onDelete: (id: string) => void;
}

const UsefulReferenceManagement: React.FC<UsefulReferenceManagementProps> = ({ references, onAdd, onUpdate, onDelete }) => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingRef, setEditingRef] = useState<UsefulReference | null>(null);
    
    const emptyRef: Omit<UsefulReference, 'id'> = {
        titolo: '', descrizione: ''
    };

    const handleAddNew = () => {
        setEditingRef(null);
        setIsFormVisible(true);
    };

    const handleEdit = (reference: UsefulReference) => {
        setEditingRef(reference);
        setIsFormVisible(true);
    };

    const handleSave = (reference: UsefulReference | Omit<UsefulReference, 'id'>) => {
        if ('id' in reference) {
            onUpdate(reference);
        } else {
            onAdd(reference);
        }
        setIsFormVisible(false);
        setEditingRef(null);
    };

    return (
        <div>
             <div className="flex justify-end mb-4">
                <Button onClick={handleAddNew}>Aggiungi Riferimento</Button>
            </div>
            
            {isFormVisible && (
                <UsefulReferenceForm
                    reference={editingRef || emptyRef}
                    onSave={handleSave}
                    onCancel={() => setIsFormVisible(false)}
                />
            )}

            <div className="bg-gray-800 rounded-lg shadow-lg overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="p-4 font-semibold w-1/3">Titolo</th>
                            <th className="p-4 font-semibold">Descrizione</th>
                            <th className="p-4 font-semibold text-right w-1/6">Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {references.map(ref => (
                            <tr key={ref.id} className="border-b border-gray-700 last:border-b-0 hover:bg-gray-700/50">
                                <td className="p-4 font-medium text-amber-500 align-top">{ref.titolo}</td>
                                <td className="p-4 text-gray-300 align-top whitespace-pre-wrap">{ref.descrizione}</td>
                                <td className="p-4 flex justify-end space-x-2 align-top">
                                    <Button variant="secondary" onClick={() => handleEdit(ref)}>Modifica</Button>
                                    <Button variant="danger" onClick={() => onDelete(ref.id)}>Elimina</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsefulReferenceManagement;
