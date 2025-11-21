
import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../../../types.ts';
import Button from '../../ui/Button.tsx';
import Input from '../../ui/Input.tsx';

interface UserFormProps {
    user: User | Omit<User, 'uid'> | null;
    onSave: (user: User | Omit<User, 'uid'>) => void;
    onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSave, onCancel }) => {
    const [formData, setFormData] = useState(user);
    const isEditing = user && 'uid' in user;

    useEffect(() => {
        setFormData(user);
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
            <h3 className="text-xl font-bold text-white mb-4">{isEditing ? 'Modifica Utente' : 'Aggiungi Nuovo Utente'}</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome" required />
                <Input name="cognome" value={formData.cognome} onChange={handleChange} placeholder="Cognome" required />
                <Input name="nickname" value={formData.nickname} onChange={handleChange} placeholder="Nickname" required />
                <Input name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Telefono" required />
                 {!isEditing && <Input name="passwordHash" type="password" value={formData.passwordHash} onChange={handleChange} placeholder="Password" required />}
                 <select
                    name="ruolo"
                    value={formData.ruolo}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                    <option value={UserRole.USER}>User</option>
                    <option value={UserRole.ADMIN}>Admin</option>
                </select>
                <div className="md:col-span-2 flex justify-end space-x-3">
                    <Button type="button" variant="secondary" onClick={onCancel}>Annulla</Button>
                    <Button type="submit">{isEditing ? 'Aggiorna Utente' : 'Salva Utente'}</Button>
                </div>
            </form>
        </div>
    );
};

interface UserManagementProps {
    users: User[];
    onAdd: (user: Omit<User, 'uid'>) => void;
    onUpdate: (user: User) => void;
    onDelete: (userId: string) => void;
}

const UserManagement: React.FC<UserManagementProps> = ({ users, onAdd, onUpdate, onDelete }) => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    
    const emptyUser: Omit<User, 'uid'> = {
        nome: '', cognome: '', nickname: '', telefono: '', passwordHash: '', ruolo: UserRole.USER
    };

    const handleAddNew = () => {
        setEditingUser(null);
        setIsFormVisible(true);
    };

    const handleEdit = (user: User) => {
        setEditingUser(user);
        setIsFormVisible(true);
    };

    const handleSave = (user: User | Omit<User, 'uid'>) => {
        if ('uid' in user) {
            onUpdate(user);
        } else {
            onAdd(user);
        }
        setIsFormVisible(false);
        setEditingUser(null);
    };

    return (
        <div>
             <div className="flex justify-end mb-4">
                <Button onClick={handleAddNew}>Aggiungi Utente</Button>
            </div>
            
            {isFormVisible && (
                <UserForm 
                    user={editingUser || emptyUser}
                    onSave={handleSave}
                    onCancel={() => setIsFormVisible(false)}
                />
            )}

            <div className="bg-gray-800 rounded-lg shadow-lg overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="p-4 font-semibold">Nome</th>
                            <th className="p-4 font-semibold">Nickname</th>
                            <th className="p-4 font-semibold">Telefono</th>
                            <th className="p-4 font-semibold">Ruolo</th>
                            <th className="p-4 font-semibold text-right">Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.uid} className="border-b border-gray-700 last:border-b-0 hover:bg-gray-700/50">
                                <td className="p-4">{user.nome} {user.cognome}</td>
                                <td className="p-4">@{user.nickname}</td>
                                <td className="p-4">{user.telefono}</td>
                                <td className="p-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.ruolo === UserRole.ADMIN ? 'bg-amber-500 text-white' : 'bg-gray-600 text-gray-200'}`}>{user.ruolo}</span></td>
                                <td className="p-4 flex justify-end space-x-2">
                                    <Button variant="secondary" onClick={() => handleEdit(user)}>Modifica</Button>
                                    <Button variant="danger" onClick={() => onDelete(user.uid)}>Elimina</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;
