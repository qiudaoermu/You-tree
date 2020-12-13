<template>
  <div class="data-scrop-tree">
    <div class="org-tree">
      <el-tree
        @node-click="handleNodeClick"
        class="data-tree"
        :data="tree"
        icon-class
        :props = 'props'
        highlight-current
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <a class="custom-tree-link">
            <img :src="getSvg(data.className)" alt="">
            <span>
              {{ node.label }}
            </span>              
          </a>
         </span>
      </el-tree>
    </div>
  </div>
</template>

<script>

import {recursiveTree, sortTree} from '../until/recursiveTree.js';
import { getSvg } from '../until/untils';
export default {
  props: ['tree'],
  data: () => ({
    props: {
      label: 'name'
    }
  }),
  methods: {
    getSvg(className) {
      return getSvg(className);
    },
    handleNodeClick(d) {
      this.$emit('treeClick', d);
    }
  }
};
</script>

<style lang="stylus" scoped>
.custom-tree-node  {
  display flex
  align-items center
  span {
    margin-left 5px;
    color rgb(15, 46, 71) 
    font-size 14px
  }
  img {width: 16px;}
}
/deep/ .el-tree {
  background none 

}

</style>