import React from 'react';
import SecondHeader from '../components/SecondHeader';

const ProfessorPage = () => {
  const professor = {
    name: "Dr. John Doe",
    academy: "School of Engineering",
    email: "johndoe@example.com",
    phone: "(123) 456-7890",
  };

  // Array of time slots from 7:00 AM to 9:30 PM
  const hours = Array.from({ length: 15 }, (_, i) => ({
    time: `${7 + Math.floor(i / 2)}:${i % 2 === 0 ? '00' : '30'} ${7 + Math.floor(i / 2) < 12 ? 'AM' : 'PM'}`
  }));

  // Array for days of the week
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <div>
        <SecondHeader />

        
        <div className="min-h-screen bg-violet-100 flex flex-col items-center py-10">
            <div className="w-full max-w-5xl p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-3xl font-bold text-violet-600 mb-4">Professor Information</h1>
                <div className="text-gray-700 mb-6">
                <p><span className="font-semibold">Name:</span> {professor.name}</p>
                <p><span className="font-semibold">Academy:</span> {professor.academy}</p>
                <p><span className="font-semibold">Email:</span> {professor.email}</p>
                <p><span className="font-semibold">Phone:</span> {professor.phone}</p>
                </div>

                <h2 className="text-2xl font-bold text-violet-600 mt-8 mb-4">Weekly Schedule</h2>
                
                {/* Flexbox-based schedule grid */}
                <div className="overflow-x-auto">
                <div className="flex">
                    {/* Time Column */}
                    <div className="flex flex-col w-24">
                    <div className="font-bold text-center p-2 bg-violet-600 text-white">Time</div>
                    {hours.map((hour, index) => (
                        <div
                        key={index}
                        className={`p-2 text-center ${index % 2 === 0 ? 'bg-violet-100' : 'bg-white'}`}
                        >
                        {hour.time}
                        </div>
                    ))}
                    </div>

                    {/* Days of the Week Columns */}
                    {days.map((day, dayIndex) => (
                    <div key={dayIndex} className="flex flex-col flex-1">
                        <div className="font-bold text-center p-2 bg-violet-600 text-white">
                        {day}
                        </div>
                        {hours.map((_, hourIndex) => (
                        <div
                            key={hourIndex}
                            className={`p-2 text-center border-l ${hourIndex % 2 === 0 ? 'bg-violet-100' : 'bg-white'}`}
                        >
                            {/* Placeholder for subject or activity */}
                            -
                        </div>
                        ))}
                    </div>
                    ))}
                </div>
                </div>
            </div>
            </div>
    </div>
  );
};

export default ProfessorPage;