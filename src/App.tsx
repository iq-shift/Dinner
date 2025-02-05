import React, { useState, useEffect } from 'react';
import { PlusCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

interface Guest {
  id: string;
  name: string;
  arrival: string;
  items: string[];
}

const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export default function App() {
  const [guests, setGuests] = useState(() => {
    const saved = localStorage.getItem('guests');
    return saved ? JSON.parse(saved) as Guest[] : [] as Guest[];
  });
  const [name, setName] = useState('');
  const [arrival, setArrival] = useState('');
  const [items, setItems] = useState('');

  useEffect(() => {
    localStorage.setItem('guests', JSON.stringify(guests));
  }, [guests]);

  const addGuest = (e: any) => {
    e.preventDefault();
    if (!name || !arrival) return;
    
    const newGuest = {
      id: generateId(),
      name,
      arrival,
      items: items.split(',').map(item => item.trim())
    };
    
    setGuests([...guests, newGuest]);
    setName('');
    setArrival('');
    setItems('');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Dinner Organizer</h1>
      
      <form onSubmit={addGuest} className="bg-white p-4 rounded-lg shadow-sm border border-notion-border mb-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-1.5 border border-notion-border rounded text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Arrival Time</label>
            <input
              type="time"
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
              className="w-full p-1.5 border border-notion-border rounded text-sm"
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm mb-1">Items Bringing (comma separated)</label>
          <input
            type="text"
            value={items}
            onChange={(e) => setItems(e.target.value)}
            className="w-full p-1.5 border border-notion-border rounded text-sm"
          />
        </div>
        
        <button type="submit" className="notion-button">
          <PlusCircleIcon className="w-4 h-4" />
          Add Guest
        </button>
      </form>

      <div className="table-container bg-white">
        <table className="w-full">
          <thead className="bg-notion-bg border-b border-notion-border">
            <tr>
              <th className="text-left p-3 text-sm font-medium">Name</th>
              <th className="text-left p-3 text-sm font-medium">Arrival</th>
              <th className="text-left p-3 text-sm font-medium">Items</th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest) => (
              <tr key={guest.id} className="border-b border-notion-border last:border-0">
                <td className="p-3 text-sm">{guest.name}</td>
                <td className="p-3 text-sm">{guest.arrival}</td>
                <td className="p-3 text-sm">
                  <div className="flex flex-wrap gap-1">
                    {guest.items.map((item, index) => (
                      <span 
                        key={index}
                        className="bg-notion-bg px-2 py-1 rounded text-xs flex items-center gap-1"
                      >
                        <CheckCircleIcon className="w-3 h-3 text-notion-blue" />
                        {item}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
