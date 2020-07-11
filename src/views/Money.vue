<template>
  <div>
    <Types/>
    <Amount/>
    <Tags/>
    <Notes/>
    <NumberPad/>
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
</style>