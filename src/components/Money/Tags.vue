<template>
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
</template>

<script lang="ts">
  import TagsItems from '@/components/Money/TagsItems.vue';
  export default {
    name: 'Tags',
    components: {TagsItems},
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