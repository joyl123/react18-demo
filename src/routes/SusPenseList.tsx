import React, { Suspense, SuspenseList } from "react";

function fetchUser(id: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ success: true, data: { id, name: "zoe" + id } });
    }, 1000 * id);
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

let user1Resource = createResource(fetchUser(1));
let user2Resource = createResource(fetchUser(2));
let user3Resource = createResource(fetchUser(3));
// 实际项目中肯定是不会这么直接写，怕被杠,
let userResourceMap: any = {
  1: user1Resource,
  2: user2Resource,
  3: user3Resource,
};
/**
 * 它又会依赖一个异步加载的数据
 * fetch
 */
interface UserProps {
  id: number;
}
function User(props: UserProps) {
  let { success, data }: any = userResourceMap[props.id].read();

  if (success) {
    let { id, name } = data;
    return (
      <div>
        {id}
        {name}
      </div>
    );
  } else {
    return null;
  }
}
export default class extends React.Component {
  render() {
    return (
      // 通过自己实现来看看Suspense 原理 位置 components Suspense组件理
      // SuspenseList revealOrder属性决定Suspense的显示数据： forwards ：从前往后（根据书写位置上的从前往后，如果前面的返回的慢最后还是会和后面的一起显示）
      //                                                   together：默认是together ，一起显示
      //                                                   backwards: 从后往前依次显示

      // tail :'collapsed'  加载谁显示谁；tail：hidden 未加载的不限时 ，加载了才显示
      <SuspenseList revealOrder="forwards" tail="hidden">
        <Suspense fallback={<div>1.loading</div>}>
          <User id={1} />
        </Suspense>
        <Suspense fallback={<div>2.loading</div>}>
          <User id={2} />
        </Suspense>
        <Suspense fallback={<div>3.loading</div>}>
          <User id={3} />
        </Suspense>
      </SuspenseList>
    );
  }
}
