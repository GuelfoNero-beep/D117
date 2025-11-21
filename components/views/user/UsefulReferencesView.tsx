
import React from 'react';
import { UsefulReference } from '../../../types.ts';

interface UsefulReferencesViewProps {
  references: UsefulReference[];
}

const UsefulReferencesView: React.FC<UsefulReferencesViewProps> = ({ references }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">Riferimenti Utili</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {references.map(ref => (
          <div key={ref.id} className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 hover:border-amber-500/50 transition-colors">
            <h3 className="text-xl font-bold text-amber-500 mb-3">{ref.titolo}</h3>
            <p className="text-gray-300 whitespace-pre-wrap">{ref.descrizione}</p>
          </div>
        ))}
      </div>
      {references.length === 0 && (
        <p className="text-gray-500 italic text-center mt-10">Nessun riferimento presente al momento.</p>
      )}
    </div>
  );
};

export default UsefulReferencesView;
