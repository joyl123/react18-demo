import React from "react";

interface Props {
  fallback: React.ReactNode;
}
export default class extends React.Component<Props> {
  state = { loading: false };

  // 这个是16出的，如果render（）函数抛出错误，则会触发该函数，父组件可以通过componentDidCatch 捕获 子组件 渲染时候的错误
  componentDidCatch(error: any) {
    if (typeof error.then === "function") {
      this.setState({
        loading: true,
      });
      error.then(() => {
        this.setState({
          loading: false,
        });
      });
    }
  }
  render() {
    const { children, fallback } = this.props;
    const { loading } = this.state;
    return loading ? fallback : children;
  }
}

