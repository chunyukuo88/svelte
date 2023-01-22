<script>
  import { onMount } from 'svelte';
  import { Messages } from '../../common/messages.js';

  const url = `https://api.openweathermap.org/data/2.5/weather?q=Westerville,Ohio&appid=${process.env.WEATHER_API_KEY}`;
  let weatherString = Messages.WEATHER_LOADING;
  onMount(async () => {
    try {
      const fetchedWeatherData = await fetch(url).then(res => res.json());
      const { temp, humidity } = fetchedWeatherData.main;
      const convertedToFahrenheit = Math.floor(1.8 * (temp - 273) + 32);
      weatherString = `${convertedToFahrenheit}° at ${humidity}% humidity`;
    } catch {
      weatherString = Messages.WEATHER_WEATHER_UNAVAILABLE;
    }
  });
</script>

<div class="weather-string">
  {weatherString}
</div>
