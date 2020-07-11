<template>
  <li class="tagsItems">
    <div class="circleIcon">
      <Icon :name="iconName"/>
    </div>
    {{name}}
  </li>
</template>

<script lang="ts">
  export default {
    props: ['name', 'iconName'],
    name: 'TagsItems'
  };
</script>

<style lang="scss" scoped>
  .tagsItems {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #2E3544;
    width: 20%;

    .circleIcon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: #FF736D;

      .icon {
        width: 20px;
        height: 20px;
        color: #FFFFFF;
      }
    }
  }
</style>