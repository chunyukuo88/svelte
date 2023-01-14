<script>
  import { onMount } from 'svelte';

  const url = `https://api.openweathermap.org/data/2.5/weather?q=Westerville,Ohio&appid=${process.env.WEATHER_API_KEY}`;
  let weatherData;
  onMount(async () => {
    const res = await fetch(url);
    weatherData = await res.json();
  });
</script>

<div>

</div>
