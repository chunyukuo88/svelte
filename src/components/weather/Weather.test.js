import { describe, expect, test, vi } from 'vitest';
import Weather from './Weather.svelte';
import { render, screen } from '@testing-library/svelte';

describe('GIVEN: The component renders,', ()=>{
  describe('WHEN: it is able to get weather data,', ()=>{
    test('THEN: it displays the temperature', ()=>{
      const weatherData = {
        main: {
          temp: 269,
          humidity: 50,
        },
      };

      global.fetch = vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(weatherData),
        })
      );
      const expectedText = '269° at 50% humidity';

      render(Weather);
      const weatherString = screen.getByText(expectedText);

      expect(weatherString).toBeVisible();
    });
  });
});
