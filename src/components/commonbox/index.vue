<template>
  <div>
    <vue-tribute :options="options">
      <textarea type="text" v-model="content" placeholder="@..." />
    </vue-tribute>
    <el-button type="default" @click="inputContent">输出</el-button>
  </div>
</template>

<script>
import VueTribute from "vue-tribute";
export default {
  props: {
    datalist: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      ssss: "",
      content: "",
      options: {
        trigger: "@",
        // element to target for @提及
        iframe: null,
        // class added in the flyout menu for active item
        selectClass: "highlight",
        // class added to the menu container
        containerClass: "tribute-container",
        // class added to each list item
        itemClass: "",
        // function called on select that returns the content to insert
        selectTemplate: item => {
          this.ssss = item.original.value;
          return "@" + item.original.key;
        },
        // template for displaying item in menu
        menuItemTemplate: function(item) {
          return item.string;
        },
        // template for when no match is found (optional),
        // If no template is provided, menu is hidden.
        noMatchTemplate: null,
        // specify an alternative parent container for the menu
        // container must be a positioned element for the menu to appear correctly ie. `position: relative;`
        // default container is the body
        menuContainer: document.body,
        // column to search against in the object (accepts function or string)
        lookup: "key",
        // column that contains the content to insert by default
        fillAttr: "value",
        // REQUIRED: array of objects to match
        values: [],
        // specify whether a space is required before the trigger string
        requireLeadingSpace: false,
        // specify whether a space is allowed in the middle of mentions
        allowSpaces: false,
        // optionally specify a custom suffix for the replace text
        // (defaults to empty space if undefined)
        replaceTextSuffix: "\n",
        // specify whether the menu should be positioned.  Set to false and use in conjuction with menuContainer to create an inline menu
        // (defaults to true)
        positionMenu: true,
        // when the spacebar is hit, select the current match
        spaceSelectsMatch: false,
        // turn tribute into an autocomplete
        autocompleteMode: false,
        // Customize the elements used to wrap matched strings within the results list
        // defaults to <span></span> if undefined
        searchOpts: {
          pre: "<span>",
          post: "</span>",
          skip: false // true will skip local search, useful if doing server-side search
        },
        // specify the minimum number of characters that must be typed before menu appears
        menuShowMinLength: 0
      }
    };
  },
  components: {
    VueTribute
  },
  // watch: {
  //   datalist(val) {}
  // },
  created() {
    this.options.values = this.datalist;
  },
  methods: {
    inputContent() {
      console.log(this.ssss);
    }
  }
};
</script>

<style></style>
