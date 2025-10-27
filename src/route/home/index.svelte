<script>
  import "./index.css";
  import Count from "../../components/count/index.svelte";
  import Navigation from "../../components/common/Navigation.svelte";
</script>

<main class="main-container">
  <h1 class="main-title">Hello, Custom CSS!</h1>
  <Count />
  
  <Navigation currentPage="home" />
</main>
