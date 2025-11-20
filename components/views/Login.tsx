
import React, { useState, useContext } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import SquareCompassIcon from '../icons/SquareCompassIcon';
import { AuthContext } from '../../contexts/AuthContext';

const Login: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(nickname, password);
    if (!success) {
      setError('Credenziali non valide. Riprova.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg">
        <div className="text-center">
            <SquareCompassIcon className="w-16 h-16 mx-auto text-amber-500" />
            <h1 className="mt-4 text-3xl font-bold text-white">Oriente D117</h1>
            <p className="mt-2 text-gray-400">Loggia "Dante 117 all'Oriente di Firenze"</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <Input
                id="nickname"
                name="nickname"
                type="text"
                autoComplete="username"
                required
                placeholder="Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
            <div className="pt-4">
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <div>
            <Button type="submit" className="w-full">
              Accedi
            </Button>
          </div>

          <div className="mt-6 text-center text-xs text-gray-500 border-t border-gray-700 pt-4 bg-gray-800/50 rounded p-2">
            <strong className="block text-red-500 mb-2 uppercase tracking-wide font-bold">Accesso Riservato</strong>
            <p className="leading-relaxed">
              L'accesso è consentito esclusivamente agli utenti autorizzati. Qualsiasi tentativo di intrusione, forzatura o elusione dei sistemi di sicurezza sarà tracciato e perseguito a norma di legge.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
