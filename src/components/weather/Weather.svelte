<script>
  import { onMount } from 'svelte';

  // const url = `https://api.openweathermap.org/data/2.5/weather?q=Westerville,Ohio&appid=${process.env.WEATHER_API_KEY}`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=Westerville,Ohio&appid=eb366c82727f387afc53658766e245e8`;
  let weatherString;
  onMount(async () => {
    const fetchedWeatherData = await fetch(url).then(res => res.json());
    const temp = fetchedWeatherData.main.temp;
    const humidity = fetchedWeatherData.main.humidity;
    weatherString = `${temp}° at ${humidity}% humidity`;
  });
</script>

<div class="weather-string">
  {weatherString}
</div>
