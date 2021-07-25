import React, { Suspense, useState, useTransition } from "react";
import { ErrorBoundary } from "../components";

function fetchUser(id: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ success: true, data: { id: 1, name: "zoe" + id } });
    }, 1000);
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
interface Props {
  resource: any;
}
function User(props: Props) {
  let { success, data, error }: any = props.resource.read();
  if (success) {
    let { id, name } = data;
    return (
      <div>
        {id}
        {name}
      </div>
    );
  } else {
    return <div>{error}</div>;
  }
}
const initialResource = createResource(fetchUser(1));
export default function () {
  const [resource, setResource] = useState(initialResource);
  const [isPending, startTransition] = useTransition();
  return (
    <div>
      <Suspense fallback={<div>加载中。。。</div>}>
        <User resource={resource} />
      </Suspense>
      {/* 按钮点击 切换用户 */}
      <button
        // 会有loading的过度展示
        // onClick={() => {
        //   setResource(createResource(fetchUser(2)));
        // }}
        // 等fetchUser(2)处理完 的时候才直接展示，但是 如果我数据请求的很慢 3秒 那这个ui上的用户切换 也需要等很久才会有反应
        //  啊这。。。。好像还不如Suspense的交互更友好；不知道是不是我打开的方式不对 ，不应该这么用？
        onClick={() => {
          startTransition(() => setResource(createResource(fetchUser(2))));
        }}
      >
        next user
      </button>
      {isPending?<div>加载中。。。</div>:null}
    </div>
  );
}
