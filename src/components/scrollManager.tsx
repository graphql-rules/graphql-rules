/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';

export const memoryStore = {
  _data: new Map(),
  get(key) {
    if (!key) {
      return null;
    }

    return this._data.get(key) || null;
  },
  set(key, data) {
    if (!key) {
      return;
    }
    return this._data.set(key, data);
  },
};

interface Props {
  scrollKey: string;
  children?: ({ connectScrollTarget: any }) => React.ReactNode;
  scrollStore?: any;
}

/**
 * Component that will save and restore Window scroll position.
 */
export default class ScrollPositionManager extends React.Component<Props> {
  _target: Window;

  static defaultProps = {
    scrollStore: memoryStore,
  };

  constructor(props) {
    super(props);
    this.connectScrollTarget = this.connectScrollTarget.bind(this);
    this._target = window;
  }

  connectScrollTarget(node) {
    this._target = node;
  }

  restoreScrollPosition(pos?: { x: number; y: number }) {
    pos = pos || this.props.scrollStore.get(this.props.scrollKey);
    if (this._target && pos) {
      scroll(this._target, pos.x, pos.y);
    }
  }

  saveScrollPosition(key?: string) {
    if (this._target) {
      const pos = getScrollPosition(this._target);
      key = key || this.props.scrollKey;
      this.props.scrollStore.set(key, pos);
    }
  }

  componentDidMount() {
    this.restoreScrollPosition();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.scrollKey !== nextProps.scrollKey) {
      this.saveScrollPosition();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.scrollKey !== prevProps.scrollKey) {
      this.restoreScrollPosition();
    }
  }

  componentWillUnmount() {
    this.saveScrollPosition();
  }

  render() {
    const { children = null, ...props } = this.props;
    return children && children({ ...props, connectScrollTarget: this.connectScrollTarget });
  }
}

function scroll(target, x, y) {
  if (target instanceof (window as any).Window) {
    target.scrollTo(x, y);
  } else {
    target.scrollLeft = x;
    target.scrollTop = y;
  }
}

function getScrollPosition(target) {
  if (target instanceof (window as any).Window) {
    return { x: target.scrollX, y: target.scrollY };
  }

  return { x: target.scrollLeft, y: target.scrollTop };
}
