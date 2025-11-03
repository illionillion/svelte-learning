<script lang="ts">
  import Router from "svelte-spa-router";
  import Home from "./route/home/index.svelte";
  import Todo from "./route/todo/index.svelte";
  import Stopwatch from "./route/stopwatch/index.svelte";
  import TicTacToe from "./route/tictactoe/index.svelte";
  import Calendar from "./route/calendar/index.svelte";
  import NotFound from "./route/not-found/index.svelte";

  const routes = {
    "/": Home,
    "/count": Home,
    "/todo": Todo,
    "/stopwatch": Stopwatch,
    "/tictactoe": TicTacToe,
    "/calendar": Calendar,
    "/calendar/:year/:month": Calendar,
    "/calendar/:year/:month/:day": Calendar,
    "*": NotFound,
  };
</script>

<Router {routes} />
