
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { User, UserRole, Event, AudioGuide, DirectoryMember, Booking, UsefulReference } from '../../types';
import Button from '../ui/Button';
import SquareCompassIcon from '../icons/SquareCompassIcon';
import CalendarIcon from '../icons/CalendarIcon';
import MusicIcon from '../icons/MusicIcon';
import UsersIcon from '../icons/UsersIcon';
import SettingsIcon from '../icons/SettingsIcon';
import MenuIcon from '../icons/MenuIcon';
import XIcon from '../icons/XIcon';
import InfoIcon from '../icons/InfoIcon';
import EventsView from './user/EventsView';
import AudioGuidesView from './user/AudioGuidesView';
import DirectoryView from './user/DirectoryView';
import UsefulReferencesView from './user/UsefulReferencesView';
import AdminDashboard from './admin/AdminDashboard';

type View = 'events' | 'audio' | 'directory' | 'references' | 'admin';

interface MainLayoutProps {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    events: Event[];
    setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
    audioGuides: AudioGuide[];
    setAudioGuides: React.Dispatch<React.SetStateAction<AudioGuide[]>>;
    directory: DirectoryMember[];
    setDirectory: React.Dispatch<React.SetStateAction<DirectoryMember[]>>;
    bookings: Booking[];
    setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
    usefulReferences: UsefulReference[];
    setUsefulReferences: React.Dispatch<React.SetStateAction<UsefulReference[]>>;
}

const MainLayout: React.FC<MainLayoutProps> = ({
    users, setUsers,
    events, setEvents,
    audioGuides, setAudioGuides,
    directory, setDirectory,
    bookings, setBookings,
    usefulReferences, setUsefulReferences
}) => {
  const { currentUser, logout } = useContext(AuthContext);
  const [activeView, setActiveView] = useState<View>('events');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // All state management has been lifted to App.tsx.
  // This component now receives state and setters as props.
  // The handlers below now operate on the props passed down from App.tsx.

  // User Handlers
  const handleAddUser = (user: Omit<User, 'uid'>) => {
    const newUser = { ...user, uid: `user-${Date.now()}`};
    setUsers(prev => [...prev, newUser]);
  };
  const handleUpdateUser = (updatedUser: User) => {
    setUsers(prev => prev.map(u => u.uid === updatedUser.uid ? updatedUser : u));
  };
  const handleDeleteUser = (userId: string) => {
     if (currentUser?.uid === userId) {
        alert("Non puoi eliminare il tuo stesso account.");
        return;
    }
    if (window.confirm('Sei sicuro di voler eliminare questo utente? L\'azione è irreversibile.')) {
        setUsers(prev => prev.filter(u => u.uid !== userId));
    }
  };

  // Event Handlers
  const handleAddEvent = (event: Omit<Event, 'id'>) => {
    const newEvent = { ...event, id: `evt-${Date.now()}`};
    setEvents(prev => [...prev, newEvent]);
  };
  const handleUpdateEvent = (updatedEvent: Event) => {
    setEvents(prev => prev.map(e => e.id === updatedEvent.id ? updatedEvent : e));
  };
  const handleDeleteEvent = (eventId: string) => {
    if (window.confirm('Sei sicuro di voler eliminare questo evento?')) {
        setEvents(prev => prev.filter(e => e.id !== eventId));
        setBookings(prev => prev.filter(b => b.eventId !== eventId)); // Also remove associated bookings
    }
  };

  // Audio Guide Handlers
  const handleAddAudioGuide = (guide: Omit<AudioGuide, 'id'>) => {
    const newGuide = { ...guide, id: `ag-${Date.now()}`};
    setAudioGuides(prev => [...prev, newGuide]);
  };
  const handleUpdateAudioGuide = (updatedGuide: AudioGuide) => {
    setAudioGuides(prev => prev.map(g => g.id === updatedGuide.id ? updatedGuide : g));
  };
  const handleDeleteAudioGuide = (guideId: string) => {
    if (window.confirm('Sei sicuro di voler eliminare questa guida audio?')) {
        setAudioGuides(prev => prev.filter(g => g.id !== guideId));
    }
  };

  // Directory Handlers
  const handleAddDirectoryMember = (member: Omit<DirectoryMember, 'id'>) => {
    const newMember = { ...member, id: `dir-${Date.now()}`};
    setDirectory(prev => [...prev, newMember]);
  };
  const handleUpdateDirectoryMember = (updatedMember: DirectoryMember) => {
    setDirectory(prev => prev.map(m => m.id === updatedMember.id ? updatedMember : m));
  };
  const handleDeleteDirectoryMember = (memberId: string) => {
     if (window.confirm('Sei sicuro di voler eliminare questo membro dalla directory?')) {
        setDirectory(prev => prev.filter(m => m.id !== memberId));
    }
  };

  // Useful Reference Handlers
  const handleAddUsefulReference = (ref: Omit<UsefulReference, 'id'>) => {
    const newRef = { ...ref, id: `ref-${Date.now()}`};
    setUsefulReferences(prev => [...prev, newRef]);
  };
  const handleUpdateUsefulReference = (updatedRef: UsefulReference) => {
    setUsefulReferences(prev => prev.map(r => r.id === updatedRef.id ? updatedRef : r));
  };
  const handleDeleteUsefulReference = (refId: string) => {
    if (window.confirm('Sei sicuro di voler eliminare questo riferimento?')) {
        setUsefulReferences(prev => prev.filter(r => r.id !== refId));
    }
  };

  const NavItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    view: View;
  }> = ({ icon, label, view }) => (
    <button
      onClick={() => {
        setActiveView(view);
        setIsMobileMenuOpen(false); // Close menu on selection (mobile)
      }}
      className={`flex items-center w-full px-4 py-3 transition-colors duration-200 ${
        activeView === view
          ? 'bg-amber-600 text-white'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
    >
      {icon}
      <span className="ml-4 font-medium text-left">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      
      {/* Mobile Overlay Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar Navigation */}
      <aside className={`
          fixed inset-y-0 left-0 z-30 w-64 flex flex-col bg-gray-800 
          transform transition-transform duration-300 ease-in-out shadow-2xl
          lg:static lg:translate-x-0 
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-20 border-b border-gray-700 px-6">
          <div className="flex items-center">
            <SquareCompassIcon className="w-8 h-8 text-amber-500" />
            <h1 className="ml-2 text-xl font-bold hidden sm:block lg:block">Oriente D117</h1>
          </div>
          {/* Close Button for Mobile */}
          <button 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex-1 mt-6 overflow-y-auto">
          <NavItem icon={<CalendarIcon className="w-6 h-6" />} label="Eventi" view="events" />
          <NavItem icon={<MusicIcon className="w-6 h-6" />} label="Guide Audio" view="audio" />
          <NavItem icon={<UsersIcon className="w-6 h-6" />} label="Fratelli in Lista" view="directory" />
          <NavItem icon={<InfoIcon className="w-6 h-6" />} label="Riferimenti utili" view="references" />
          {currentUser?.ruolo === UserRole.ADMIN && (
            <NavItem icon={<SettingsIcon className="w-6 h-6" />} label="Admin Panel" view="admin" />
          )}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <div className="text-center mb-4">
            <p className="font-semibold truncate">{currentUser?.nome} {currentUser?.cognome}</p>
            <p className="text-sm text-gray-400 truncate">@{currentUser?.nickname}</p>
          </div>
          <Button onClick={logout} variant="secondary" className="w-full">
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="flex items-center justify-between h-16 px-4 bg-gray-800 border-b border-gray-700 lg:hidden">
          <div className="flex items-center">
            <SquareCompassIcon className="w-6 h-6 text-amber-500" />
            <span className="ml-2 font-bold text-lg">Oriente D117</span>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500"
          >
            <MenuIcon className="w-6 h-6" />
          </button>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 lg:p-10 overflow-y-auto scroll-smooth">
            <div className="max-w-7xl mx-auto">
                {activeView === 'events' && <EventsView events={events} bookings={bookings} setBookings={setBookings} />}
                {activeView === 'audio' && <AudioGuidesView guides={audioGuides} />}
                {activeView === 'directory' && <DirectoryView directory={directory} />}
                {activeView === 'references' && <UsefulReferencesView references={usefulReferences} />}
                {activeView === 'admin' && currentUser?.ruolo === UserRole.ADMIN && 
                    <AdminDashboard 
                        users={users}
                        events={events}
                        audioGuides={audioGuides}
                        directory={directory}
                        usefulReferences={usefulReferences}
                        onAddUser={handleAddUser}
                        onUpdateUser={handleUpdateUser}
                        onDeleteUser={handleDeleteUser}
                        onAddEvent={handleAddEvent}
                        onUpdateEvent={handleUpdateEvent}
                        onDeleteEvent={handleDeleteEvent}
                        onAddAudioGuide={handleAddAudioGuide}
                        onUpdateAudioGuide={handleUpdateAudioGuide}
                        onDeleteAudioGuide={handleDeleteAudioGuide}
                        onAddDirectoryMember={handleAddDirectoryMember}
                        onUpdateDirectoryMember={handleUpdateDirectoryMember}
                        onDeleteDirectoryMember={handleDeleteDirectoryMember}
                        onAddUsefulReference={handleAddUsefulReference}
                        onUpdateUsefulReference={handleUpdateUsefulReference}
                        onDeleteUsefulReference={handleDeleteUsefulReference}
                    />
                }
            </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
