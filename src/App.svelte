<script lang="ts">
  import Router from "svelte-spa-router";
  import Home from "./route/home/index.svelte";

  const routes = {
    "/": Home,
  };
</script>

<Router {routes} />
