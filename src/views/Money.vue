<template>
  <Layout>
    <Types/>
    <Amount/>

    <div class="tagsWrapper">
      <ul class="tags">
        <TagsItems icon-name="food" name="餐饮"/>
        <TagsItems icon-name="food" name="餐饮"/>
        <TagsItems icon-name="food" name="餐饮"/>
        <TagsItems icon-name="food" name="餐饮"/>
        <TagsItems icon-name="food" name="餐饮"/>
        <TagsItems icon-name="food" name="餐饮"/>
        <TagsItems icon-name="food" name="餐饮"/>
        <TagsItems icon-name="food" name="餐饮"/>
        <TagsItems icon-name="food" name="餐饮"/>
        <TagsItems icon-name="food" name="餐饮"/>
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
  import Amount from '@/components/Money/Amount.vue';
  import TagsItems from '@/components/Money/TagsItems.vue';

  export default {
    name: 'Money',
    components: {TagsItems, Amount, Types},
  };
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  .tagsWrapper {
    margin-top: 8px;
    background: #FFFFFF;
    .tags {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      overflow: auto;
      padding: 18px 0;
    }
  }

</style>