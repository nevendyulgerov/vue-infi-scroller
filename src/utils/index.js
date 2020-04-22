/**
 * @description Is null
 * @param val
 */
export const isNull = (val) => val === null;

/**
 * @description Is object
 * @param val
 */
export const isObj = (val) => typeof val === 'object' && !isNull(val) && !Array.isArray(val);

/**
 * @description Is function
 * @param val
 */
export const isFunc = (val) => typeof val === 'function';

/**
 * @description Uid
 * @param len
 */
export const uid = (len = 7) => Math.random().toString(35).substr(2, len);

/**
 * @description Debounce
 * @param id
 * @param delay
 */
export const debounce = (id, delay = 300) => {
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
export const scrollSpy = () => {
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
