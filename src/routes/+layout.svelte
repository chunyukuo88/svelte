<script>
  import Weather from '../components/weather/Weather.svelte';
</script>

<div class="app">
  <ul>
    <li><a href="/about">about</a></li>
    <li><a href="/blog">blog</a></li>
    <li><a href="/games">games</a></li>
    <li><a href="/admin">admin</a></li>
    <li><Weather /></li>
  </ul>
</div>

<slot></slot>
