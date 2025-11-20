
import React, { useState, useMemo } from 'react';
import { DirectoryMember } from '../../../types';
import Input from '../../ui/Input';

interface DirectoryViewProps {
  directory: DirectoryMember[];
}

const DirectoryView: React.FC<DirectoryViewProps> = ({ directory }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDirectory = useMemo(() => {
    if (!searchTerm) {
      return directory;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    return directory.filter(member =>
      member.nome.toLowerCase().includes(lowercasedFilter) ||
      member.cognome.toLowerCase().includes(lowercasedFilter) ||
      member.professione.toLowerCase().includes(lowercasedFilter) ||
      member.azienda.toLowerCase().includes(lowercasedFilter)
    );
  }, [directory, searchTerm]);

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">Fratelli in Lista</h2>
      <div className="mb-6">
        <Input 
          type="text"
          placeholder="Cerca per nome, professione, azienda..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="bg-gray-800 rounded-lg shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-4 font-semibold">Nome</th>
                <th className="p-4 font-semibold">Telefono</th>
                <th className="p-4 font-semibold">Professione</th>
                <th className="p-4 font-semibold">Azienda</th>
                <th className="p-4 font-semibold">Indirizzo</th>
              </tr>
            </thead>
            <tbody>
              {filteredDirectory.map(member => (
                <tr key={member.id} className="border-b border-gray-700 last:border-b-0 hover:bg-gray-700/50 transition-colors">
                  <td className="p-4">{member.nome} {member.cognome}</td>
                  <td className="p-4">{member.telefono}</td>
                  <td className="p-4">{member.professione}</td>
                  <td className="p-4">{member.azienda}</td>
                  <td className="p-4">{member.indirizzo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DirectoryView;
