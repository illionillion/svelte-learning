<script lang="ts">
  import Router from "svelte-spa-router";
  import Home from "./route/home/index.svelte";
  import Todo from "./route/todo/index.svelte";

  const routes = {
    "/": Home,
    "/todo": Todo,
  };
</script>

<Router {routes} />
