<template>
  <div class="tagsWrapper">
    <ul class="tags">
      <TagsItems v-for="(value, index) in dataSource"
                 :key="index"
                 ref="selectedItem"
                 @click.native="setSelectedIndex(index)"
                 :class="[selectedIndex === index ? 'selected' : '',
                          currentType === '+' ? 'income' : '']"
                 :icon-name="value.icon" :name="value.name"/>
      <TagsItems class="append" icon-name="append" name="添加"/>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import TagsItems from '@/components/Money/TagsItems.vue';
  import {Component, Prop, Watch} from 'vue-property-decorator';

  // fixed TS7053 warning
  interface ObjectMap {
    [key: string]: any;

    [index: number]: any;
  }

  @Component({
    components: {TagsItems}
  })
  export default class Tags extends Vue {
    @Prop() readonly dataSource: object[] | undefined;
    @Prop() readonly currentType!: string;
    itemIndex = 0;
    currentTagName = '餐饮';

    get selectedIndex(): number {
      return this.itemIndex;
    }

    mounted() {
      console.log("mounted: " + this.currentTagName);
    }
    updated() {
      console.log("updated: " + this.currentTagName);
    }

    setSelectedIndex(index: number,) {
      this.switchTagName(index)
      this.itemIndex = index;
    }

    switchTagName(index: number) {
      const selectedTag: ObjectMap = this.dataSource![index];
      this.currentTagName = selectedTag['name'];
    }

    @Watch('currentType')
    typeChange(newValue: string) {
      this.itemIndex = 0;
      if(newValue === '+') {
        this.currentTagName = '薪资'
      } else {
        this.currentTagName = '餐饮'
      }
    }
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

<style lang="scss">
  .tagsWrapper {
    .tags {
      .selected {
        .circleIcon {
          background: #FF736D;

          .icon {
            color: #FFFFFF;
          }
        }
      }

      .selected.income {
        .circleIcon {
          background: #00D795;

          .icon {
            color: #FFFFFF;
          }
        }
      }
    }
  }
</style>