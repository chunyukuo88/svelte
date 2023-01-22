<script>
  import { onMount } from 'svelte';

  const url = `https://api.openweathermap.org/data/2.5/weather?q=Westerville,Ohio&appid=${process.env.WEATHER_API_KEY}`;
  let weatherString = 'Loading...';
  onMount(async () => {
    try {
      const fetchedWeatherData = await fetch(url).then(res => res.json());
      const temp = fetchedWeatherData.main.temp;
      const humidity = fetchedWeatherData.main.humidity;
      weatherString = `${temp}° at ${humidity}% humidity`;
    } catch (e) {
      weatherString = 'Weather service unavailable';
    }
  });
</script>

<div class="weather-string">
  {weatherString}
</div>
