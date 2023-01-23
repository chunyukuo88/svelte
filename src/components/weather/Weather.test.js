import { afterEach, describe, expect, test, vi } from 'vitest';
import Weather from './Weather.svelte';
import { render, waitFor } from '@testing-library/svelte';
import '@testing-library/jest-dom/extend-expect';
import { Messages, weatherEmoji } from '../../common/messages.js';

afterEach(() => {
  vi.clearAllMocks();
});
const weatherData = {
  main: {
    temp: 269, // Kelvin
    humidity: 50,
  },
  weather: [{
    description: weatherEmoji.rain,
  }],
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
    describe('AND: the weather phenomena has a corresponding emoji,', async ()=>{
      test('THEN: it displays the temperature', async ()=>{
        global.fetch = vi.fn(() => {
          return Promise.resolve({
            json: () => Promise.resolve(weatherData),
          });
        });

        render(Weather);
        const weatherString = document.querySelector('.weather-string');

        expect(weatherString).toBeVisible();
        await waitFor(() => {
          expect(weatherString.innerHTML).toStrictEqual(`${weatherEmoji.rain}, 24° + 50% humidity`);
        });
      });
    });
    describe('AND: the weather phenomena does NOT have a corresponding emoji,', ()=>{
      test('THEN: it displays the name of the weather phenomenon in the weather string', async () => {
        const weatherDataWithMist = JSON.parse(JSON.stringify(weatherData));
        weatherDataWithMist.weather[0].description = 'mist';
        global.fetch = vi.fn(() => {
          return Promise.resolve({
            json: () => Promise.resolve(weatherDataWithMist),
          });
        });

        render(Weather);
        const weatherString = document.querySelector('.weather-string');

        expect(weatherString).toBeVisible();
        await waitFor(() => {
          expect(weatherString.innerHTML).toStrictEqual('Mist, 24° + 50% humidity');
        });
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
