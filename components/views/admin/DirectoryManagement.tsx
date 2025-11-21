
import React, { useState, useEffect } from 'react';
import { DirectoryMember } from '../../../types.ts';
import Button from '../../ui/Button.tsx';
import Input from '../../ui/Input.tsx';

interface DirectoryMemberFormProps {
    member: DirectoryMember | Omit<DirectoryMember, 'id'> | null;
    onSave: (member: DirectoryMember | Omit<DirectoryMember, 'id'>) => void;
    onCancel: () => void;
}

const DirectoryMemberForm: React.FC<DirectoryMemberFormProps> = ({ member, onSave, onCancel }) => {
    const [formData, setFormData] = useState(member);
    const isEditing = member && 'id' in member;

    useEffect(() => {
        setFormData(member);
    }, [member]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            <h3 className="text-xl font-bold text-white mb-4">{isEditing ? 'Modifica Membro' : 'Aggiungi Nuovo Membro'}</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome" required />
                <Input name="cognome" value={formData.cognome} onChange={handleChange} placeholder="Cognome" required />
                <Input name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Telefono" required />
                <Input name="professione" value={formData.professione} onChange={handleChange} placeholder="Professione" required />
                <Input name="azienda" value={formData.azienda} onChange={handleChange} placeholder="Azienda" required />
                <Input name="indirizzo" value={formData.indirizzo} onChange={handleChange} placeholder="Indirizzo" required className="md:col-span-2" />
                
                <div className="md:col-span-2 flex justify-end space-x-3">
                    <Button type="button" variant="secondary" onClick={onCancel}>Annulla</Button>
                    <Button type="submit">{isEditing ? 'Aggiorna Membro' : 'Salva Membro'}</Button>
                </div>
            </form>
        </div>
    );
};

interface DirectoryManagementProps {
    directory: DirectoryMember[];
    onAdd: (member: Omit<DirectoryMember, 'id'>) => void;
    onUpdate: (member: DirectoryMember) => void;
    onDelete: (memberId: string) => void;
}

const DirectoryManagement: React.FC<DirectoryManagementProps> = ({ directory, onAdd, onUpdate, onDelete }) => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingMember, setEditingMember] = useState<DirectoryMember | null>(null);
    
    const emptyMember: Omit<DirectoryMember, 'id'> = {
        nome: '', cognome: '', telefono: '', professione: '', indirizzo: '', azienda: ''
    };

    const handleAddNew = () => {
        setEditingMember(null);
        setIsFormVisible(true);
    };

    const handleEdit = (member: DirectoryMember) => {
        setEditingMember(member);
        setIsFormVisible(true);
    };

    const handleSave = (member: DirectoryMember | Omit<DirectoryMember, 'id'>) => {
        if ('id' in member) {
            onUpdate(member);
        } else {
            onAdd(member);
        }
        setIsFormVisible(false);
        setEditingMember(null);
    };

    return (
        <div>
             <div className="flex justify-end mb-4">
                <Button onClick={handleAddNew}>Aggiungi Membro</Button>
            </div>
            
            {isFormVisible && (
                <DirectoryMemberForm
                    member={editingMember || emptyMember}
                    onSave={handleSave}
                    onCancel={() => setIsFormVisible(false)}
                />
            )}

            <div className="bg-gray-800 rounded-lg shadow-lg overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="p-4 font-semibold">Nome</th>
                            <th className="p-4 font-semibold">Professione</th>
                            <th className="p-4 font-semibold">Azienda</th>
                            <th className="p-4 font-semibold text-right">Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {directory.map(member => (
                            <tr key={member.id} className="border-b border-gray-700 last:border-b-0 hover:bg-gray-700/50">
                                <td className="p-4">{member.nome} {member.cognome}</td>
                                <td className="p-4">{member.professione}</td>
                                <td className="p-4">{member.azienda}</td>
                                <td className="p-4 flex justify-end space-x-2">
                                    <Button variant="secondary" onClick={() => handleEdit(member)}>Modifica</Button>
                                    <Button variant="danger" onClick={() => onDelete(member.id)}>Elimina</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DirectoryManagement;
