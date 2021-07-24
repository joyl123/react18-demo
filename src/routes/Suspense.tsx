import React, { Suspense } from "react";
import { ErrorBoundary } from "../components";

function fetchUser(id: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve({ success: true, data: { id: 1, name: "zoe" + id } });
      // 请求失败的处理
      reject({ success: false, error: "数据加载失败" });
    });
  });
}
// 其实就是react.lazy(17就有了)
function createResource(promise: Promise<any>) {
  let status = "pending";
  let result: any;
  return {
    read() {
      if (status === "success" || status === "error") {
        return result;
      } else {
        throw promise.then(
          (data: any) => {
            status = "success";
            result = data;
          },
          (error: any) => {
            status = "error";
            result = error;
          }
        );
      }
    },
  };
}

let userResource = createResource(fetchUser(1));
/**
 * 它又会依赖一个异步加载的数据
 * fetch
 */
function User() {
  let { success, data, error }: any = userResource.read();
  if (success) {
    let { id, name } = data;
    return (
      <div>
        {id}
        {name}
      </div>
    );
  } else {
    // return <div>{error}</div>;
    // 如果没有直接错 错误显示  处理 直接throw 一个error  可以用ErrorBoundary 处理 在ErrorBoundary
    // 里用 getDerivedStateFromError 或者componentDidCatch 做异常捕获
    throw error;
  }
}
export default class extends React.Component {
  render() {
    return (
      // 如果 这里的user 直接抛出异常， 又没有ErrorBoundary  会直接白屏 在页面上
      <ErrorBoundary fallback={<div>数据请求出错....</div>}>
        {/* 通过自己实现来看看Suspense 原理 位置 components Suspense组件理 */}
        <Suspense fallback={<div>loading</div>}>
          <User />
        </Suspense>
      </ErrorBoundary>
    );
  }
}
