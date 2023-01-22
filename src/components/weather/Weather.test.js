import { afterEach, describe, expect, test, vi } from 'vitest';
import Weather from './Weather.svelte';
import { render, waitFor } from '@testing-library/svelte';
import '@testing-library/jest-dom/extend-expect';
import { Messages } from '../../common/messages.js';

afterEach(() => {
  vi.clearAllMocks();
});
const weatherData = {
  main: {
    temp: 269, // Kelvin
    humidity: 50,
  },
};
describe('GIVEN: The component renders,', ()=>{
  describe('WHEN: before the weather data has been fetched,', ()=>{
    test('THEN: it displays a loading string', async ()=>{
      global.fetch = vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(weatherData),
        })
      );

      render(Weather);
      const weatherString = document.querySelector('.weather-string');

      expect(weatherString.innerHTML).toStrictEqual(Messages.WEATHER_LOADING);
    });
  });
  describe('WHEN: it is able to get weather data,', ()=>{
    test('THEN: it displays the temperature', async ()=>{
      global.fetch = vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(weatherData),
        })
      );

      render(Weather);
      const weatherString = document.querySelector('.weather-string');

      expect(weatherString).toBeVisible();
      await waitFor(() => {
        expect(weatherString.innerHTML).toStrictEqual('24° at 50% humidity');
      });
    });
  });
  describe('WHEN: it is NOT able to get weather data,', ()=>{
    test('THEN: it displays the temperature', async ()=>{
      global.fetch = vi.fn(() =>
        Promise.reject(new Error('Service unavailable')),
      );

      render(Weather);
      const weatherString = document.querySelector('.weather-string');

      expect(weatherString).toBeVisible();
      await waitFor(() => {
        expect(weatherString.innerHTML).toStrictEqual(Messages.WEATHER_WEATHER_UNAVAILABLE);
      });
    });
  });
});
