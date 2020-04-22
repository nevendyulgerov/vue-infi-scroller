<template>
  <Fragment>
    <slot />
  </Fragment>
</template>

<script>
  import { Fragment } from 'vue-fragment';
  import getNodeDimensions from 'get-node-dimensions';
  import { isObj, isFunc, uid, debounce, scrollSpy } from './utils';

  export default {
    components: {
      Fragment
    },
    props: {
      scrollTarget: {
        type: HTMLElement,
        default: null
      },
      debounceDelay: {
        type: Number,
        default: 300
      },
      gutter: {
        type: Number,
        default: 10
      },
      immediate: {
        type: Boolean,
        default: false
      },
      active: {
        type: Boolean,
        default: true
      },
      hasMore: {
        type: Boolean,
        default: false
      },
      shouldLoadMore: {
        type: Function,
        default: (targetHeight, scrollYOffset, gutter, scrollHeight) => (
          targetHeight + scrollYOffset + gutter >= scrollHeight
        )
      },
      onLoadMore: {
        type: Function,
        required: true
      }
    },
    data() {
      return {
        debouncer: null,
        scroller: null
      };
    },
    computed: {
      initialized() {
        return isFunc(this.debouncer);
      }
    },
    watch: {
      scrollTarget() {
        this.$nextTick(() => {
          if (this.initialized) {
            this.destroy();
          }

          this.init();
        });
      },
      active: {
        handler(nextActive) {
          if (!nextActive && this.initialized) {
            return this.destroy();
          }

          this.init();
        }
      }
    },
    mounted() {
      this.init();
    },
    destroyed() {
      if (this.initialized) {
        this.destroy();
      }
    },
    methods: {
      init() {
        const { scrollTarget, debounceDelay, gutter, immediate, shouldLoadMore, onLoadMore } = this;
        const hasScrollTarget = isObj(scrollTarget);

        const handleOnScroll = (scrollYOffset) => {
          const targetHeight = hasScrollTarget
            ? getNodeDimensions(scrollTarget).height
            : window.innerHeight;

          const scrollHeight = hasScrollTarget
            ? scrollTarget.scrollHeight
            : document.body.clientHeight;

          if (this.hasMore && shouldLoadMore(targetHeight, scrollYOffset, gutter, scrollHeight)) {
            onLoadMore();
          }
        };

        this.debouncer = debounce(uid(), debounceDelay);

        const initConfig = {
          element: scrollTarget,
          immediate,
          onScroll: (scrollYOffset) => {
            const handleOnScrollCallback = () => handleOnScroll(scrollYOffset);

            if (!isFunc(this.debouncer)) {
              handleOnScrollCallback();
            } else {
              this.debouncer(handleOnScrollCallback);
            }
          }
        };

        this.scroller = scrollSpy().init(initConfig);
      },
      destroy() {
        this.debouncer = null;
        this.scroller.destroy();
        this.scroller = null;
      }
    }
  };
</script>
