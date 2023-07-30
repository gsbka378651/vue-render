<template>
  <div>
    <main>
      <div class="container">
        <p>找不到頁面・・・</p>
      </div>
    </main>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
main{
	flex:1;

  .container{
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 81.9vh;
    padding: 100px;
  }

  p{
  position: relative;
  top: 200px;
	font-size: 50px;
	font-weight: 600;
}

}
</style>