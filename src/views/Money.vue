<template>
  <Layout>
    <Types/>

    <div class="amountWrapper">
      <ul class="amount">
        <li>账单金额</li>
        <li class="output">0.00</li>
      </ul>
    </div>
    <div class="tagsWrapper">
      <ul class="tags">
        <li>餐饮</li>
        <li>零食烟酒</li>
        <li>购物</li>
        <li>住房</li>
        <li>交通</li>
        <li>娱乐</li>
        <li>文教</li>
        <li>汽车</li>
        <li>通讯</li>
        <li>育儿</li>
      </ul>
    </div>
    <div class="notesWrapper">
      <label class="notes">
        <span class="date">今天</span>
        <input type="text" placeholder="请输入备注信息">
      </label>
    </div>
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
  export default {
    name: 'Money',
    components: {Types},
  };
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
</style>