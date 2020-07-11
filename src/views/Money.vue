<template>
  <Layout>
    <Types/>
    <Amount/>
    <Tags/>
    <Notes/>

    <div class="numberPad">
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>删除</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>Add</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>确定</button>
      <button>清空</button>
      <button>0</button>
      <button>.</button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Types from '@/components/Money/Types.vue';
  import Amount from '@/components/Money/Amount.vue';
  import Tags from '@/components/Money/Tags.vue';
  import Notes from '@/components/Money/Notes.vue';

  export default {
    name: 'Money',
    components: {Notes, Tags, Amount, Types},
  };
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
</style>