<template>
  <div class="tagsWrapper">
    <ul class="tags">
      <TagsItems v-for="(value, index) in dataSource" :key="index" :icon-name="value.icon" :name="value.name"/>
      <TagsItems icon-name="append" name="添加"/>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import TagsItems from '@/components/Money/TagsItems.vue';
  import {Component, Prop} from 'vue-property-decorator';


  @Component({
    components: {TagsItems}
  })
  export default class Tags extends Vue {
    @Prop() readonly dataSource: object[] | undefined;
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  .tagsWrapper {
    margin-top: 8px;
    background: #FFFFFF;
    overflow: auto;
    .tags {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      padding: 18px;
    }
  }
</style>