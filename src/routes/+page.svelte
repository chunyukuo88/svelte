<script>
    import { enhance } from '$app/forms';
    import { supabaseClient } from '$lib/db.js';

    export let data;

    const submitLogout = async ({ cancel }) => {
      const { error } = await supabaseClient.auth.signOut();
      if (error) {
          console.log(error);
      }
      cancel();
    };
</script>

<main>
    <h1>Woobler's Other House!</h1>
    {#if data.session}
        <p>Welcome, {data.session.user.email}</p>
        <form action="/logout" method="POST" use:enhance={submitLogout}>
            <button type="submit" class="btn btn-primary">Logout</button>
        </form>
    {:else}
        <p>Let's learn how to register and login users!</p>
        <div class="auth-submit">
            <a href="/login" class="btn btn-primary">Login</a>
        </div>
    {/if}
</main>