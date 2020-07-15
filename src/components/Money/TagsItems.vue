<template>
  <li class="tagsItems">
    <div class="circleIcon">
      <Icon :name="iconName"/>
    </div>
    {{name}}
  </li>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class TagsItems extends Vue {
    @Prop() name!: string;
    @Prop() iconName!: string;
  }
</script>

<style lang="scss" scoped>
  .tagsItems {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 10px;
    padding: 6px 0;
    color: #2E3544;
    width: 20%;

    .circleIcon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #F2F2F2;

      .icon {
        width: 30px;
        height: 30px;
        color: #919191;
      }
    }
  }
</style>