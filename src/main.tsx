import React from "react";
import ReactDom from "react-dom";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import {
  BatchState,
  Suspense,
  SusPenseList,
  StartTransition,
  UseDeferredValue,
  UseTransition,
} from "./routes";
// legacy 模式，旧模式的同步渲染方式创建模式
// ReactDom.render(
//   <Router>
//     <ul>
//       <li>
//         <Link to="/BatchState">BatchState</Link>
//       </li>
//     </ul>
//     <Route path="/BatchState" component={BatchState} />
//   </Router>,
//   document.getElementById("root")
// );

// //启用 concurrent mode 并发模式 <h1>hello</h1>
ReactDom.createRoot(document.getElementById("root")!).render(
  <Router>
    <ul>
      <li>
        <Link to="/BatchState">BatchState</Link>
      </li>
      <li>
        <Link to="/Suspense">Suspense</Link>
      </li>
      <li>
        <Link to="/SusPenseList">SusPenseList</Link>
      </li>
      <li>
        <Link to="/StartTransition">StartTransition</Link>
      </li>
      <li>
        <Link to="/UseDeferredValue">UseDeferredValue</Link>
      </li>
      <li>
        <Link to="/UseTransition">UseTransition</Link>
      </li>
    </ul>
    <Route path="/BatchState" component={BatchState} />
    <Route path="/Suspense" component={Suspense} />
    <Route path="/SusPenseList" component={SusPenseList} />
    <Route path="/StartTransition" component={StartTransition} />
    <Route path="/UseDeferredValue" component={UseDeferredValue} />
    <Route path="/UseTransition" component={UseTransition} />
  </Router>
);
