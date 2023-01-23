<head>
  <title>98.css example</title>
  <meta charset="UTF-8" />

  <link rel="stylesheet" href="https://unpkg.com/98.css@0.1.4/build/98.css" />
</head>

<script>
  import Weather from '../components/weather/Weather.svelte';
</script>

<div class="app">
  <ul>
    <li class="title-bar-text"><a href="/about">about</a></li>
    <li class="title-bar-text"><a href="/blog">blog</a></li>
    <li class="title-bar-text"><a href="/games">games</a></li>
    <li class="title-bar-text"><a href="/admin">admin</a></li>
    <li><Weather /></li>
  </ul>
</div>

<slot></slot>
