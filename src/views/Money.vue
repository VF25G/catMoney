<template>
  <div class="content">
    <Types/>
    <Amount/>
    <Tags class="tags" />
    <Notes/>
    <NumberPad class="numberPad"/>
  </div>
</template>

<script lang="ts">
  import Types from '@/components/Money/Types.vue';
  import Amount from '@/components/Money/Amount.vue';
  import Tags from '@/components/Money/Tags.vue';
  import Notes from '@/components/Money/Notes.vue';
  import NumberPad from '@/components/Money/NumberPad.vue';

  export default {
    name: 'Money',
    components: {NumberPad, Notes, Tags, Amount, Types},
  };
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  .content {
    height: 100vh;
    display: flex;
    flex-direction: column;
    .tags {
      flex-grow: 3;
    }
  }

</style>