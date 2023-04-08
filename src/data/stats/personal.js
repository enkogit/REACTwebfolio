import React, { useState, useEffect } from 'react';
import ContactIcons from '../../components/Contact/ContactIcons';

const { PUBLIC_URL } = process.env;

const Age = () => {
  const [age, setAge] = useState();

  const tick = () => {
    const divisor = 1000 * 60 * 60 * 24 * 365.2421897; // ms in an average year
    const birthTime = new Date('1993-11-28T07:00:00');
    setAge(((Date.now() - birthTime) / divisor).toFixed(11));
  };

  useEffect(() => {
    const timer = setInterval(() => tick(), 25);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return <>{age}</>;
};

const data = [
  {
    key: 'country',
    label: 'Citizen',
    value: <img style={{ width: '90px' }} src={`${PUBLIC_URL}/images/FLAGS.png`} alt="" />,
  },
  {
    key: 'city',
    label: 'City',
    value: 'Calgary',
  },
  {
    key: 'age',
    label: 'Age',
    value: <Age />,
  },
  {
    key: 'social',
    label: 'Socials',
    value: <ContactIcons />,
  },
];

export default data;
