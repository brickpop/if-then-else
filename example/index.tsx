import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { If, Then, ElseIf, Else } from '../.';

const App = () => {
  const a = false,
    b = true,
    c = false,
    d = true,
    e = true,
    f = false,
    g = false;

  return (
    <div>
      <If condition={a && b && c}>
        <p>The condition is true</p>
      </If>

      <h1>Render a simple block when false</h1>
      <If not={a && b && c}>
        <p>The condition is false</p>
      </If>

      <h1>Render the first block with a condition that matches</h1>
      <If condition={a && b && c}>
        <Then>
          <p>Condition 1 is true</p>
        </Then>
        <ElseIf condition={d && e}>
          <p>Condition 2 is true</p>
        </ElseIf>
        <ElseIf condition={f || g}>
          <p>Condition 3 is true</p>
        </ElseIf>
        <Else>
          <p>All conditions are false</p>
        </Else>
      </If>

      <h1>With negated conditions</h1>
      <If not={a && b && c}>
        <Then>
          <p>Condition 1 is false</p>
        </Then>
        <ElseIf condition={d && e}>
          <p>Condition 2 is true</p>
        </ElseIf>
        <ElseIf not={f || g}>
          <p>Condition 3 is false</p>
        </ElseIf>
        <Else>
          <p>No conditions matched</p>
        </Else>
      </If>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
