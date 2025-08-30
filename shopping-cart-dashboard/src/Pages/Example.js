import React, { useState, useEffect } from 'react';
import { Country, State, City } from 'country-state-city';
import {
  TextField,
  MenuItem,
  Grid,
  Typography,
} from '@mui/material';

const CountryStateCity = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setStates(State.getStatesOfCountry(selectedCountry));
      setCities([]);
      setSelectedState('');
      setSelectedCity('');
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      setCities(City.getCitiesOfState(selectedCountry, selectedState));
      setSelectedCity('');
    }
  }, [selectedState]);

  return (
    <section>
      <Typography variant="h4" gutterBottom>
        Location Selector
      </Typography>
      <Grid container spacing={2} sx={{ maxWidth: '1200px', marginBottom: '20px' }}>
        <Grid item xs={12} sm={4}>
          <TextField
            select
            label="Country"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{ backgroundColor: '#fff', minWidth: '300px' }}
          >
            <MenuItem value="">
              Select Country
            </MenuItem>
            {countries.map((c) => (
              <MenuItem key={c.isoCode} value={c.isoCode}>
                {c.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            select
            label="State"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            fullWidth
            variant="outlined"
            disabled={!selectedCountry}
            sx={{ backgroundColor: '#fff', minWidth: '300px' }}
          >
            <MenuItem value="">
              Select State
            </MenuItem>
            {states.map((s) => (
              <MenuItem key={s.isoCode} value={s.isoCode}>
                {s.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            select
            label="City"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            fullWidth
            variant="outlined"
            disabled={!selectedState}
            sx={{ backgroundColor: '#fff', minWidth: '300px' }}
          >
            <MenuItem value="">
              Select City
            </MenuItem>
            {cities.map((city) => (
              <MenuItem key={city.name} value={city.name}>
                {city.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </section>
  );
};

export default CountryStateCity;