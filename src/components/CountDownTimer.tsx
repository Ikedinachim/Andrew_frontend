import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CountdownTimer = ({ startTime = 1800, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState(startTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onExpire) onExpire();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) clearInterval(interval); // stop interval before it goes negative
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onExpire]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const percentage = (timeLeft / startTime) * 100;

  return (
    <div className='h-[74px] w-[74px]'>
      <CircularProgressbar
        value={percentage}
        text={`${minutes}:${seconds.toString().padStart(2, '0')}`}
        styles={buildStyles({
          textSize: '24px',
          pathColor: '#040BC5',
          textColor: '#111827',
          trailColor: '#e5e7eb',
        })}
      />
    </div>
  );
};

export default CountdownTimer;
