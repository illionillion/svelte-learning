<script>
  import "./index.css";
  import Count from "../../components/count/index.svelte";
  import Layout from "../../components/layout/Layout.svelte";
</script>

<Layout currentPage="home">
  <div class="main-container">
    <h1 class="main-title">Hello, Custom CSS!</h1>
    <Count />
  </div>
</Layout>
