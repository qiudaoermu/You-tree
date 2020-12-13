
<template>
  <div class="main">
    <transition
      name="bounce"
    >
      <div id="app" v-show="show" @mouseleave.stop.self="hideSider" @mouseenter="clearInterval" @click.stop="stopPra">
        <tree :tree='treeData' @treeClick="nodeClick"/>
        <img src="./assets/images/bg3.jpg" alt="" width="100%">
      </div>
    </transition>
     <transition
      name="bounce"
    >
    <div class="octotree-toggle" style="" @mouseenter.stop.self="show = true" v-show='true'> 
        <img :src="rightArraw" alt=""/>
        <span>OctotreeNOLOGIN</span> 
      </div>
    </transition>
  </div>
</template>
<script>
import tree from './component/tree'
import Pjex from './until/pjex.js';
import { getTreeData, getBasePramas} from './api/request'
import { getSvg, promiseChain } from './until/untils'
import { parseFileIconMapCSV} from './until/mapCsv'
import {recursiveTree, sortTree} from './until/recursiveTree.js';
parseFileIconMapCSV()
export default {
  name: "app",
  components: {tree},
  data() {
    return {
      rightArraw: getSvg('right-arraw'),
      show: false,
      treeData: [],
      default_branch: '',
      html_url: '',
      timeOut: '',
      pjex: ''
    }
  },
  created() {
    this.pjex = new Pjex();
  },
  mounted() {
    promiseChain(getBasePramas).then(res => {
      getTreeData().then(d => {
        this.treeData = d.data.tree;
        this.treeData.forEach(d => {
          d.pstate = res.html_url + '/' + d.type +'/' + res.default_branch +'/' + d.path;
        })
        this.treeData = recursiveTree(this.treeData);
        this.treeData = sortTree(this.treeData);
     });
    })
    let _this = this;
    document.addEventListener('click', (event)=>{
      _this.show = false;
    });
  },
  methods: {
    clearInterval() {
      clearTimeout(this.timeOut);
    },
    stopPra(event) {
      // event.stopPropagation()
    },
    hideSider() {
      this.timeOut = setTimeout(() => {
        this.show = false
      }, 1000);
    },
    nodeClick(d) {
      if (d.type === 'tree') return;
      this.pjex.pjex(d.pstate,'.repository-content');
    }
  }
}
</script>
<style lang="stylus" scoped>
.bounce-enter-active {
  animation: bounce-in .5s ease;
}
.bounce-leave-active {
  animation: bounce-in .3s ease-in reverse;
}
@keyframes bounce-in {
  0% {
    transform: translate(-260px);
  }
  100% {
    transform: translate(0);
  }
}
.main {
 
}
  #app {
    background-size cover
    background-repeat: no-repeat
    position fixed
    left 0px
    width 260px;
    display flex
    flex-direction: column;
    justify-content space-between
    border 1px solid #ddd
    top 0
    background #fff
    // background url('src/assets/images/bg.jpg')
    background-repeat:no-repeat;
    background-size: contain
    background-position bottom
    bottom 0
    overflow-y auto
    z-index: 3
    user-select none
  }
  .octotree-toggle {
    background-color: rgb(242, 245, 247);
    box-shadow: rgba(118, 118, 118, 0.11) 2px 0px 5px 0px;
    opacity: 1;
    position: fixed;
    user-select: none;
    text-align: center;
    top: 33%;
    width: 30px;
    z-index: 2;
    cursor: pointer;
    border-radius: 0px 4px 4px 0px;
    border-width: 1px 1px 1px;
    border-style: solid solid solid none;
    border-color: rgb(224, 228, 231) rgb(224, 228, 231) rgb(224, 228, 231);
    border-image: initial;
    border-left: none;
    padding: 10px 6px 15px 6px;
    transition: right 0.25s ease-in 0.2s, opacity 0.35s ease-in 0.2s;
    img {
      width 16px;
    }
    span {
      color: rgb(15, 46, 71);
      display: inline-block;
      font-size: 12px;
      line-height: 14px;
      position: relative;
      top: 10px;
      transform: rotate(-180deg);
      writing-mode: tb-rl;
    }
  }
</style>