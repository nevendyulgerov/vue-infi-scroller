# Vue Infi Scroller

[![npm](https://img.shields.io/npm/v/vue-infi-scroller.svg?style=flat-square)](https://www.npmjs.com/package/vue-infi-scroller)
[![npm](https://img.shields.io/npm/l/vue-infi-scroller.svg?style=flat-square)](https://github.com/nevendyulgerov/vue-infi-scroller/blob/master/LICENSE)

<p>Vue-based infinite scroll component that just works. It supports <code>window</code> and scrollable nodes, without inline style for height.</p>

## Installation

To install the component, run:

`npm install vue-infi-scroller`

## How to use

To import the component in your project:

```javascript
import InfiScroller from 'vue-infi-scroller';
```

Use `InfiScroller` on the window object:

```javascript
<template>
  <div>
    <InfiScroller
      :has-more="hasMore"
      :on-load-more="onLoadMore"
    >
      <ul>
        <li
          v-for="item in items"
          :key="item.id"
          style="height: 100px"
        >
          {{ `Item ${item.id}` }}
        </li>
      </ul>
    </InfiScroller>
  </div>
</template>

<script>
  import InfiScroller from 'vue-infi-scroller';

  export default {
    components: { InfiScroller },
    data() {
      return {
        items: this.generateItems(),
        hasMore: true
      };
    },
    methods: {
      generateItems(items = [], length = 30) {
        const nextItems = [...items, ...Array.from({ length })];
        return nextItems.map((item, index) => ({ id: index }));
      },
      onLoadMore() {
        const nextItems = this.generateItems(this.items);
        this.items = nextItems;
        this.hasMore = nextItems.length < 120;
      }
    }
  };
</script>
```

Use `InfiScroller` on a custom scroll target (like a modal):

```javascript
<template>
  <div>
    <div
      ref="scroller"
      style="height: 500px; overflow: auto; background-color: white;"
    >
      <InfiScroller
        :scroll-target="refScroller"
        :has-more="hasMore"
        :on-load-more="onLoadMore"
      >
        <ul>
          <li
            v-for="item in items"
            :key="item.id"
            style="height: 100px"
          >
            {{ `Item ${item.id}` }}
          </li>
        </ul>
      </InfiScroller>
    </div>
  </div>
</template>

<script>
  import InfiScroller from 'vue-infi-scroller';

  export default {
    components: { InfiScroller },
    data() {
      return {
        refScroller: null,
        items: this.generateItems(),
        hasMore: true
      };
    },
    mounted() {
      this.refScroller = this.$refs.scroller;
    },
    methods: {
      generateItems(items = [], length = 30) {
        const nextItems = [...items, ...Array.from({ length })];
        return nextItems.map((item, index) => ({ id: index }));
      },
      onLoadMore() {
        const nextItems = this.generateItems(this.items);
        this.items = nextItems;
        this.hasMore = nextItems.length < 120;
      }
    }
  };
</script>
```

Use multiple `InfiScroller` components with custom scroll targets:

```javascript
<template>
  <div>
    <div
      ref="itemsScroller"
      style="height: 300px; overflow: auto; background-color: white;"
    >
      <InfiScroller
        :scroll-target="refItemsScroller"
        :has-more="hasMore"
        :on-load-more="onLoadMoreItems"
      >
        <ul>
          <li
            v-for="item in items"
            :key="item.id"
            style="height: 100px"
          >
            {{ `Item ${item.id}` }}
          </li>
        </ul>
      </InfiScroller>
    </div>

    <div
      ref="otherItemsScroller"
      style="height: 500px; overflow: auto; background-color: white; margin-top: 40px;"
    >
      <InfiScroller
        :scroll-target="refOtherItemsScroller"
        :has-more="hasMoreOther"
        :on-load-more="onLoadMoreOtherItems"
      >
        <ul>
          <li
            v-for="item in otherItems"
            :key="item.id"
            style="height: 100px"
          >
            {{ `Other Item ${item.id}` }}
          </li>
        </ul>
      </InfiScroller>
    </div>
  </div>
</template>

<script>
  import InfiScroller from 'vue-infi-scroller';

  export default {
    components: { InfiScroller },
    data() {
      return {
        refItemsScroller: null,
        refOtherItemsScroller: null,
        items: this.generateItems(),
        otherItems: this.generateItems(),
        hasMore: true,
        hasMoreOther: true
      };
    },
    mounted() {
      this.refItemsScroller = this.$refs.itemsScroller;
      this.refOtherItemsScroller = this.$refs.otherItemsScroller;
    },
    methods: {
      generateItems(items = [], length = 30) {
        const nextItems = [...items, ...Array.from({ length })];
        return nextItems.map((item, index) => ({ id: index }));
      },
      onLoadMoreItems() {
        const nextItems = this.generateItems(this.items);
        this.items = nextItems;
        this.hasMore = nextItems.length < 300;
      },
      onLoadMoreOtherItems() {
        const nextOtherItems = this.generateItems(this.otherItems);
        this.otherItems = nextOtherItems;
        this.hasMoreOther = nextOtherItems.length < 120;
      }
    }
  };
</script>
```

## Props

<table>
<colgroup>
<col span="1"/>
<col span="1"/>
<col span="1"/>
<col span="1"/>
</colgroup>
<thead>
<tr>
<th style="text-align:left;">Name</th>
<th style="text-align:left;">Type</th>
<th style="text-align:left;">Default</th>
<th style="text-align:left;">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left;"><code>children</code></td>
<td style="text-align:left;"><code>Node | NodeList</code></td>
<td style="text-align:left;"></td>
<td style="text-align:left;">The content in the infinite scroller. Contains the list of items you want to trigger infinite scrolling for.</td>
</tr>
<tr>
<td style="text-align:left;"><code>scrollTarget</code></td>
<td style="text-align:left;"><code>Node</code></td>
<td style="text-align:left;"><code>null</code></td>
<td style="text-align:left;">The scroll target. Can be set to a custom scrollable node or omitted/null. When omitted/null the window object is used as scroll target.</td>
</tr>
<tr>
<td style="text-align:left;"><code>debounceDelay</code></td>
<td style="text-align:left;"><code>Number</code></td>
<td style="text-align:left;"><code>300</code></td>
<td style="text-align:left;">Debounce delay (in milliseconds) to optimize high-frequency scroll events. A recommended delay of <code>300</code> milliseconds is set by default.</td>
</tr>
<tr>
<td style="text-align:left;"><code>gutter</code></td>
<td style="text-align:left;"><code>Number</code></td>
<td style="text-align:left;"><code>10</code></td>
<td style="text-align:left;">Additional space (in pixels) used in the default <code>shouldLoadMore</code> calculation. Increasing it will cause the <code>onLoadMore</code> callback to be called before the scrollbar has reached the bottom of the <code>scrollTarget</code>. The larger the number, the earlier the <code>onLoadMore</code> callback will be called. A recommended minimum gutter of <code>10</code> pixels is set by default.</td>
</tr>
<tr>
<td style="text-align:left;"><code>immediate</code></td>
<td style="text-align:left;"><code>Boolean</code></td>
<td style="text-align:left;"><code>false</code></td>
<td style="text-align:left;">Whether to trigger an initial check, before any scroll event, if <code>onLoadMore</code> callback should be called. Set it to <code>true</code>when you want <code>onLoadMore</code> to be called immediately after the <code>scrollTarget</code> is mounted. This can be useful in case the scrollbar has been preset to the bottom of the <code>scrollTarget</code> or the content of the <code>scrollTarget</code> is less than its height and no scroll exist for it yet.</td>
</tr>
<tr>
<td style="text-align:left;"><code>active</code></td>
<td style="text-align:left;"><code>Boolean</code></td>
<td style="text-align:left;"><code>true</code></td>
<td style="text-align:left;">Turn on/off the infinite scroller. Keeps the component's children visible. Useful when the infinite scroller is placed inside a modal and you want it disabled until the modal is activated.</td>
</tr>
<tr>
<td style="text-align:left;"><code>hasMore</code></td>
<td style="text-align:left;"><code>Boolean</code></td>
<td style="text-align:left;"><code>false</code></td>
<td style="text-align:left;">Whether there are more items to load. This flag is used to determine if <code>onLoadMore</code> should be called. The entire check looks like this <code>hasMore && shouldLoadMore(...)</code>.</td>
</tr>
<tr>
<td style="text-align:left;"><code>shouldLoadMore</code></td>
<td style="text-align:left;"><pre>Function(
 scrollTargetHeight: number,
 scrollYOffset: number,
 gutter: number,
 scrollHeight: number
)</pre></td>
<td style="text-align:left;"><pre>(
 scrollTargetHeight,
 scrollYOffset,
 gutter,
 scrollHeight
) => (
  scrollTargetHeight
  + scrollYOffset
  + gutter
  >= scrollHeight
)</pre></td>
<td style="text-align:left;">Determine if more items should be loaded. By default a <code>scrollTargetHeight + scrollYOffset + gutter >= scrollHeight</code> formula is used. Provide a different function to customize this behavior. Note that <code>shouldLoadMore</code> will be called only if <code>hasMore</code> is <code>true</code>.</td>
</tr>
<tr>
<td style="text-align:left;"><code>onLoadMore</code></td>
<td style="text-align:left;"><code>Function</code></td>
<td style="text-align:left;"></td>
<td style="text-align:left;">Called when <code>hasMore && shouldLoadMore(...)</code> is <code>true</code>. You should load and render more items in the infinite scroller when <code>onLoadMore</code> is called.</td>
</tr>
</tbody>
</table>
