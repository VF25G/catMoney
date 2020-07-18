<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click.native="goBack"/>
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <FormItem :value="tag.name"
              @update:value="update"
              field-name="标签名" placeholder="请输入标签名"/>
    <div class="buttonWrapper">
      <CustomButton @click="remove">删除标签</CustomButton>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import FormItem from '@/components/Money/FormItem.vue';
  import CustomButton from '@/components/CustomButton.vue';

  @Component({
    components: {CustomButton, FormItem}
  })
  export default class EditLabel extends Vue {
    tag?: Tag = undefined;

    created() {
      this.tag = window.findTag(this.$route.params.id);
      if (!this.tag) {
        this.$router.replace('/404');
      }
    }

    update(name: string) {
      if (this.tag) {
        window.updateTag(this.tag.id, name);
      }
    }

    remove() {
      if (this.tag) {
        if (window.removeTag(this.tag.id)) {
          this.$router.back();
        } else {
          window.alert('删除失败');
        }
      }
    }

    goBack() {
      this.$router.back();
    }
  }
</script>

<style lang="scss" scoped>
  .navBar {
    text-align: center;
    font-size: 16px;
    padding: 12px 16px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > .title {

    }

    > .leftIcon {
      width: 24px;
      height: 24px;
    }

    > .rightIcon {
      width: 24px;
      height: 24px;
    }
  }

  .fromWrapper {
    background: #FFFFFF;
    margin-top: 8px;
  }

  .buttonWrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
</style>