import React, { useState, useEffect } from 'react';
import { Country, State, City } from 'country-state-city';

const Example = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setStates(State.getStatesOfCountry(selectedCountry));
      setCities([]);
      setSelectedState('');
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      setCities(City.getCitiesOfState(selectedCountry, selectedState));
    }
  }, [selectedState]);

  return (
    <div>
      <select value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)}>
        <option value="">Select Country</option>
        {countries.map(c => (
          <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
        ))}
      </select>

      <select value={selectedState} onChange={e => setSelectedState(e.target.value)} disabled={!selectedCountry}>
        <option value="">Select State</option>
        {states.map(s => (
          <option key={s.isoCode} value={s.isoCode}>{s.name}</option>
        ))}
      </select>

      <select disabled={!selectedState}>
        <option value="">Select City</option>
        {cities.map(city => (
          <option key={city.name} value={city.name}>{city.name}</option>
        ))}
      </select>
    </div>
  );
};

export default Example;