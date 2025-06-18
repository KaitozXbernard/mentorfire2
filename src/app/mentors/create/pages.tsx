'use client';

import { useState } from 'react';
import { addMentor } from '@/lib/firestoreService';
import { useAuth } from '@/contexts/AuthContext'; // ✅ make sure this path is correct

export default function CreateMentorPage() {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const { userId, userName, userRole, userName: email } = useAuth(); // We assume email is stored in userName

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMessage('Please enter a valid mentor name.');
      setStatus('error');
      return;
    }

    if (!userId || !email) {
      setErrorMessage('Authentication details are missing. Please log in again.');
      setStatus('error');
      return;
    }

    try {
      await addMentor(userId, name.trim(), email);
      setStatus('success');
      setName('');
      setErrorMessage('');
    } catch (error: any) {
      console.error('Error adding mentor:', error);
      setErrorMessage('Failed to add mentor. Please try again.');
      setStatus('error');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Create Mentor</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Mentor name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-md"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Add Mentor
        </button>
      </form>

      {status === 'success' && (
        <p className="mt-4 text-green-600">✅ Mentor added successfully!</p>
      )}

      {status === 'error' && (
        <p className="mt-4 text-red-600">❌ {errorMessage}</p>
      )}
    </div>
  );
}
