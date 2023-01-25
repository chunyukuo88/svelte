<head>
  <title>Woobler's Other House</title>
  <meta charset="UTF-8" />
  <link rel="stylesheet" href="https://unpkg.com/98.css@0.1.4/build/98.css" />
</head>

<script>
  import Weather from '../components/weather/Weather.svelte';
  import { confetti } from '@neoconfetti/svelte';

  import { supabaseClient } from '$lib/db';
  import { invalidate } from '$app/navigation';
  import { onMount } from 'svelte';

  onMount(() => {
    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(() => {
      invalidate('supabase:auth');
      console.log('Auth state change detected');
    });

    return () => {
      subscription.unsubscribe();
    };
  })
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
<div use:confetti />

<slot></slot>
