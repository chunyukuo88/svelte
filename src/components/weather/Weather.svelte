<script>
  import { onMount } from 'svelte';
  import { Messages, weatherEmoji } from '../../common/messages.js';

  const url = `https://api.openweathermap.org/data/2.5/weather?q=Westerville,Ohio&appid=${process.env.WEATHER_API_KEY}`;
  let weatherString = Messages.WEATHER_LOADING;

  function processWeatherDescription(description) {
    return (weatherEmoji[description])
      ? weatherEmoji[description]
      : description[0].toUpperCase() + description.slice(1);
  }

  function produceWeatherString(fetchedData) {
    const { temp, humidity } = fetchedData.main;
    const { description } = fetchedData.weather[0];
    const desc = processWeatherDescription(description);
    const convertedToFahrenheit = Math.floor(1.8 * (temp - 273) + 32);
    return `${desc}, ${convertedToFahrenheit}° + ${humidity}% humidity`;
  };

  onMount(async () => {
    try {
      const fetchedWeatherData = await fetch(url).then(res => res.json());
      weatherString = produceWeatherString(fetchedWeatherData);
    } catch {
      weatherString = Messages.WEATHER_WEATHER_UNAVAILABLE;
    }
  });
</script>

<div class='weather-string'>
  {weatherString}
</div>
