import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { If, Then, ElseIf, Else } from '../.';

const App = () => {
  const a = 3;
  const showGreeting = true,
    hideGreeting = false;
  const isLoggedIn = true,
    isMember = true,
    isAdmin = false,
    isGuest = false,
    isManager = true;
  const age = 24;
  const members = ['John', 'Jane', 'Jim'];

  return (
    <div>
      <h1>Rendering if true or false</h1>
      <If true={showGreeting}>
        <p>Showing the greeting</p>
      </If>
      <If not={hideGreeting}>
        <p>Still showing the greeting</p>
      </If>

      <h1>Rendering nested if, then, else if, else clauses</h1>
      <If none={[isLoggedIn, isMember, isAdmin]}>
        <Then>
          <p>You cannot access this section</p>
        </Then>
        <ElseIf val={age} below={18}>
          <p>You cannot use this service</p>
        </ElseIf>
        <ElseIf not={isLoggedIn}>
          <p>Please, log in</p>
        </ElseIf>
        <Else>
          <p>Welcome to the service</p>
        </Else>
      </If>

      <h1>Rendering by comparing a value</h1>
      <If val={a} is={3}>
        <p>a equals 3</p>
      </If>
      <If val={a} isNot={3}>
        <p>a is not equal to 3</p>
      </If>
      <If val={a} above={3}>
        <p>a is greater than 3</p>
      </If>
      <If val={a} below={3}>
        <p>a is lower than 3</p>
      </If>
      <If val={a} atLeast={3}>
        <p>a is greater or equal to 3</p>
      </If>
      <If val={a} atMost={3}>
        <p>a is greater or equal to 3</p>
      </If>

      <h1>Rendering based on many conditions</h1>
      <If all={[isMember, isAdmin]}>
        <p>You are logged as an admin</p>
      </If>
      <If some={[isMember, isGuest]}>
        <p>You are logged in</p>
      </If>
      <If notAll={[isLoggedIn, isAdmin]}>
        <p>The content is unavailable</p>
      </If>
      <If none={[isMember, isManager, isAdmin]}>
        <p>You are not logged in</p>
      </If>

      <h1>Rendering given an array's length</h1>
      <If lengthOf={members} is={3}>
        <p>There are 3 members</p>
      </If>
      <If lengthOf={members} isNot={3}>
        <p>There aren't 3 members</p>
      </If>
      <If lengthOf={members} above={3}>
        <p>There are more than 3 members</p>
      </If>
      <If lengthOf={members} below={3}>
        <p>There are less than 3 members</p>
      </If>
      <If lengthOf={members} atLeast={3}>
        <p>There are 3 or more members</p>
      </If>
      <If lengthOf={members} atMost={3}>
        <p>There are 3 or less members</p>
      </If>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
