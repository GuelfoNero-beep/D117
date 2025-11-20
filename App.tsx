
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { User, Event, AudioGuide, DirectoryMember, Booking, UsefulReference } from './types';
import { MOCK_USERS, MOCK_EVENTS, MOCK_AUDIO_GUIDES, MOCK_DIRECTORY, MOCK_BOOKINGS, MOCK_USEFUL_REFERENCES } from './constants';
import Login from './components/views/Login';
import MainLayout from './components/views/MainLayout';
import { AuthContext } from './contexts/AuthContext';

// Helper to get data from localStorage or fallback to mock data
function getInitialState<T>(key: string, mockData: T[], dateFields: string[] = []): T[] {
    try {
        const item = window.localStorage.getItem(key);
        if (item) {
            const parsed = JSON.parse(item);
            if (dateFields.length > 0) {
                 return parsed.map((obj: any) => {
                    const newObj = { ...obj };
                    dateFields.forEach(field => {
                        if (newObj[field]) {
                            newObj[field] = new Date(newObj[field]);
                        }
                    });
                    return newObj;
                });
            }
            return parsed;
        }
    } catch (error) {
        console.error(`Error reading ${key} from localStorage`, error);
    }
    return mockData;
}


const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // State is now managed at the top level of the app
  const [users, setUsers] = useState<User[]>(() => getInitialState('app_users', MOCK_USERS));
  const [events, setEvents] = useState<Event[]>(() => getInitialState('app_events', MOCK_EVENTS, ['dataInizio', 'dataFine']));
  const [audioGuides, setAudioGuides] = useState<AudioGuide[]>(() => getInitialState('app_audioGuides', MOCK_AUDIO_GUIDES));
  const [directory, setDirectory] = useState<DirectoryMember[]>(() => getInitialState('app_directory', MOCK_DIRECTORY));
  const [bookings, setBookings] = useState<Booking[]>(() => getInitialState('app_bookings', MOCK_BOOKINGS, ['dataPrenotazione']));
  const [usefulReferences, setUsefulReferences] = useState<UsefulReference[]>(() => getInitialState('app_references', MOCK_USEFUL_REFERENCES));

  // useEffect hooks to save state changes to localStorage
  useEffect(() => { localStorage.setItem('app_users', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('app_events', JSON.stringify(events)); }, [events]);
  useEffect(() => { localStorage.setItem('app_audioGuides', JSON.stringify(audioGuides)); }, [audioGuides]);
  useEffect(() => { localStorage.setItem('app_directory', JSON.stringify(directory)); }, [directory]);
  useEffect(() => { localStorage.setItem('app_bookings', JSON.stringify(bookings)); }, [bookings]);
  useEffect(() => { localStorage.setItem('app_references', JSON.stringify(usefulReferences)); }, [usefulReferences]);

  const handleLogin = useCallback((nickname: string, password: string) => {
    // FIX: Use the 'users' state, which includes new users, instead of MOCK_USERS.
    const user = users.find(u => u.nickname === nickname);
    
    // FIX: Verify the password.
    if (user && user.passwordHash === password) {
      setCurrentUser(user);
      return true;
    }
    return false;
  }, [users]);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const authContextValue = useMemo(() => ({
    currentUser,
    login: handleLogin,
    logout: handleLogout,
  }), [currentUser, handleLogin, handleLogout]);

  if (!currentUser) {
    return (
      <AuthContext.Provider value={authContextValue}>
        <Login />
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      <MainLayout 
        users={users}
        setUsers={setUsers}
        events={events}
        setEvents={setEvents}
        audioGuides={audioGuides}
        setAudioGuides={setAudioGuides}
        directory={directory}
        setDirectory={setDirectory}
        bookings={bookings}
        setBookings={setBookings}
        usefulReferences={usefulReferences}
        setUsefulReferences={setUsefulReferences}
      />
    </AuthContext.Provider>
  );
};

export default App;
