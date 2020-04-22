'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _defineProperty(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function _objectSpread(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.forEach(function(n){_defineProperty(e,n,t[n]);});}return e}var freeze=function(e,n,t){Object.defineProperty(e,n,{configurable:!0,get:function(){return t},set:function(e){console.warn("tried to set frozen property ".concat(n," with ").concat(e));}});},unfreeze=function(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;Object.defineProperty(e,n,{configurable:!0,writable:!0,value:t});},component={abstract:!0,name:"Fragment",props:{name:{type:String,default:function(){return Math.floor(Date.now()*Math.random()).toString(16)}}},mounted:function(){var e=this.$el,n=e.parentNode,t=document.createComment("fragment#".concat(this.name,"#head")),r=document.createComment("fragment#".concat(this.name,"#tail"));n.insertBefore(t,e),n.insertBefore(r,e),e.appendChild=function(t){n.insertBefore(t,r),freeze(t,"parentNode",e);},e.insertBefore=function(t,r){n.insertBefore(t,r),freeze(t,"parentNode",e);},e.removeChild=function(e){n.removeChild(e),unfreeze(e,"parentNode");},Array.from(e.childNodes).forEach(function(n){return e.appendChild(n)}),n.removeChild(e),freeze(e,"parentNode",n),freeze(e,"nextSibling",r.nextSibling);var o=n.insertBefore;n.insertBefore=function(r,i){o.call(n,r,i!==e?i:t);};var i=n.removeChild;n.removeChild=function(a){if(a===e){for(;t.nextSibling!==r;)e.removeChild(t.nextSibling);n.removeChild(t),n.removeChild(r),unfreeze(e,"parentNode"),n.insertBefore=o,n.removeChild=i;}else i.call(n,a);};},render:function(e){var n=this,t=this.$slots.default;return t&&t.length&&t.forEach(function(e){return e.data=_objectSpread({},e.data,{attrs:_objectSpread({fragment:n.name},(e.data||{}).attrs)})}),e("div",{attrs:{fragment:this.name}},t)}};var Fragment=component;

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var getMargin_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getMargin;
var toNumber = function toNumber(n) {
  return parseInt(n) || 0;
};

function getMargin(style) {
  return {
    top: style ? toNumber(style.marginTop) : 0,
    right: style ? toNumber(style.marginRight) : 0,
    bottom: style ? toNumber(style.marginBottom) : 0,
    left: style ? toNumber(style.marginLeft) : 0
  };
}

module.exports = exports["default"];
});

unwrapExports(getMargin_1);

var getCloneDimensions_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = getCloneDimensions;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }



var _getMargin2 = _interopRequireDefault(getMargin_1);

function getCloneDimensions(node, options) {
  var parentNode = node.parentNode;

  var context = document.createElement('div');
  var clone = node.cloneNode(true);
  var style = getComputedStyle(node);
  var rect = undefined,
      width = undefined,
      height = undefined;

  // give the node some context to measure off of
  // no height and hidden overflow hide node copy
  context.style.height = 0;
  context.style.overflow = 'hidden';

  // clean up any attributes that might cause a conflict with the original node
  // i.e. inputs that should focus or submit data
  clone.setAttribute('id', '');
  clone.setAttribute('name', '');

  // set props to get a true dimension calculation
  if (options.display || style && style.getPropertyValue('display') === 'none') {
    clone.style.display = options.display || 'block';
  }
  if (options.width || style && !parseInt(style.getPropertyValue('width'))) {
    clone.style.width = options.width || 'auto';
  }
  if (options.height || style && !parseInt(style.getPropertyValue('height'))) {
    clone.style.height = options.height || 'auto';
  }

  // append copy to context
  context.appendChild(clone);

  // append context to DOM so we can measure
  parentNode.appendChild(context);

  // get accurate dimensions
  rect = clone.getBoundingClientRect();
  width = clone.offsetWidth;
  height = clone.offsetHeight;

  // destroy clone
  parentNode.removeChild(context);

  return {
    rect: {
      width: width,
      height: height,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left
    },
    margin: (0, _getMargin2['default'])(style)
  };
}

module.exports = exports['default'];
});

unwrapExports(getCloneDimensions_1);

var getNodeDimensions_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = getNodeDimensions;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }



var _getCloneDimensions2 = _interopRequireDefault(getCloneDimensions_1);



var _getMargin2 = _interopRequireDefault(getMargin_1);

function getNodeDimensions(node) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var rect = node.getBoundingClientRect();
  var width = undefined,
      height = undefined,
      margin = undefined;

  // determine if we need to clone the element to get proper dimensions or not
  if (!rect.width || !rect.height || options.clone) {
    var cloneDimensions = (0, _getCloneDimensions2['default'])(node, options);
    rect = cloneDimensions.rect;
    margin = cloneDimensions.margin;
  }
  // if no cloning needed, we need to determine if margin should be accounted for
  else if (options.margin) {
      margin = (0, _getMargin2['default'])(getComputedStyle(node));
    }

  // include margin in width/height calculation if desired
  if (options.margin) {
    width = margin.left + rect.width + margin.right;
    height = margin.top + rect.height + margin.bottom;
  } else {
    width = rect.width;
    height = rect.height;
  }

  return {
    width: width,
    height: height,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left
  };
}

module.exports = exports['default'];
});

var getNodeDimensions = unwrapExports(getNodeDimensions_1);

/**
 * @description Is null
 * @param val
 */
const isNull = (val) => val === null;

/**
 * @description Is object
 * @param val
 */
const isObj = (val) => typeof val === 'object' && !isNull(val) && !Array.isArray(val);

/**
 * @description Is function
 * @param val
 */
const isFunc = (val) => typeof val === 'function';

/**
 * @description Uid
 * @param len
 */
const uid = (len = 7) => Math.random().toString(35).substr(2, len);

/**
 * @description Debounce
 * @param id
 * @param delay
 */
const debounce = (id, delay = 300) => {
  const timers = {};

  return (callback) => {
    if (timers[id]) {
      clearTimeout(timers[id]);
    }

    timers[id] = setTimeout(callback, delay);
  };
};

/**
 * @description Scroll spy
 */
const scrollSpy = () => {
  let targetElement = window;
  let didScroll = false;
  let hasElement = false;
  const onScrollDelay = 50;
  const defaultOnScroll = () => {};
  let handleOnScroll = defaultOnScroll;

  const getDocumentOffsetY = () => window.pageYOffset || document.documentElement.scrollTop;

  const getOffsetY = () => (hasElement
    ? targetElement.scrollTop
    : getDocumentOffsetY());

  const handleScroll = () => {
    const scrollYOffset = getOffsetY();
    handleOnScroll(scrollYOffset);
    didScroll = false;
  };

  const scrollListener = () => {
    if (!didScroll) {
      setTimeout(handleScroll, onScrollDelay);
      didScroll = true;
    }
  };

  const attachListener = () => {
    targetElement.addEventListener('scroll', scrollListener);
  };

  const detachListener = () => {
    targetElement.removeEventListener('scroll', scrollListener);
  };

  return {
    init(initData) {
      const { element, immediate = false, onScroll } = initData;
      handleOnScroll = onScroll;
      hasElement = isObj(element);

      if (hasElement) {
        targetElement = element;
      }

      if (immediate) {
        handleScroll();
      }

      attachListener();
      return this;
    },
    destroy() {
      detachListener();
      handleOnScroll = defaultOnScroll;
      return this;
    }
  };
};

//

var script = {
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

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("Fragment", [_vm._t("default")], 2)
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

exports.default = __vue_component__;
//# sourceMappingURL=index.js.map
