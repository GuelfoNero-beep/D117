
import React, { useState } from 'react';
import { User, Event, AudioGuide, DirectoryMember, UsefulReference } from '../../../types.ts';
import UserManagement from './UserManagement.tsx';
import EventManagement from './EventManagement.tsx';
import AudioGuideManagement from './AudioGuideManagement.tsx';
import DirectoryManagement from './DirectoryManagement.tsx';
import UsefulReferenceManagement from './UsefulReferenceManagement.tsx';

type AdminTab = 'users' | 'events' | 'audio' | 'directory' | 'references';

interface AdminDashboardProps {
  users: User[];
  events: Event[];
  audioGuides: AudioGuide[];
  directory: DirectoryMember[];
  usefulReferences: UsefulReference[];
  onAddUser: (user: Omit<User, 'uid'>) => void;
  onUpdateUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
  onAddEvent: (event: Omit<Event, 'id'>) => void;
  onUpdateEvent: (event: Event) => void;
  onDeleteEvent: (eventId: string) => void;
  onAddAudioGuide: (guide: Omit<AudioGuide, 'id'>) => void;
  onUpdateAudioGuide: (guide: AudioGuide) => void;
  onDeleteAudioGuide: (guideId: string) => void;
  onAddDirectoryMember: (member: Omit<DirectoryMember, 'id'>) => void;
  onUpdateDirectoryMember: (member: DirectoryMember) => void;
  onDeleteDirectoryMember: (memberId: string) => void;
  onAddUsefulReference: (ref: Omit<UsefulReference, 'id'>) => void;
  onUpdateUsefulReference: (ref: UsefulReference) => void;
  onDeleteUsefulReference: (refId: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  users, events, audioGuides, directory, usefulReferences,
  onAddUser, onUpdateUser, onDeleteUser,
  onAddEvent, onUpdateEvent, onDeleteEvent,
  onAddAudioGuide, onUpdateAudioGuide, onDeleteAudioGuide,
  onAddDirectoryMember, onUpdateDirectoryMember, onDeleteDirectoryMember,
  onAddUsefulReference, onUpdateUsefulReference, onDeleteUsefulReference
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('users');

  const TabButton: React.FC<{ tab: AdminTab; label: string }> = ({ tab, label }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 font-semibold rounded-md transition-colors whitespace-nowrap ${
        activeTab === tab ? 'bg-amber-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">Pannello Amministratore</h2>
      <div className="flex space-x-4 mb-6 border-b border-gray-700 pb-4 overflow-x-auto">
        <TabButton tab="users" label="Utenti" />
        <TabButton tab="events" label="Eventi" />
        <TabButton tab="audio" label="Audio" />
        <TabButton tab="directory" label="Directory" />
        <TabButton tab="references" label="Riferimenti" />
      </div>

      <div>
        {activeTab === 'users' && (
          <UserManagement 
            users={users}
            onAdd={onAddUser}
            onUpdate={onUpdateUser}
            onDelete={onDeleteUser}
          />
        )}
        {activeTab === 'events' && (
          <EventManagement 
            events={events}
            onAdd={onAddEvent}
            onUpdate={onUpdateEvent}
            onDelete={onDeleteEvent}
          />
        )}
        {activeTab === 'audio' && (
          <AudioGuideManagement
            guides={audioGuides}
            onAdd={onAddAudioGuide}
            onUpdate={onUpdateAudioGuide}
            onDelete={onDeleteAudioGuide}
          />
        )}
        {activeTab === 'directory' && (
          <DirectoryManagement
            directory={directory}
            onAdd={onAddDirectoryMember}
            onUpdate={onUpdateDirectoryMember}
            onDelete={onDeleteDirectoryMember}
          />
        )}
        {activeTab === 'references' && (
          <UsefulReferenceManagement
            references={usefulReferences}
            onAdd={onAddUsefulReference}
            onUpdate={onUpdateUsefulReference}
            onDelete={onDeleteUsefulReference}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
