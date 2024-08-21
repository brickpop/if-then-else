# If-Then-Else

The missing conditional renderer that React forgot to include.

Write clean UI components that can be read as a visual JS function.

## Rendering a simple child
Using a simple `<If>` block:

```tsx
<If true={ showGreeting }>
   <p>This is a truthy condition</p>
</If>
<If not={ hideGreeting }>
   <p>This is a falsy condition</p>
</If>
```

## Rendering nested if-then-else clauses
Write readable nested conditions as you would in JavaScript. 

```jsx
<If none={[ isLoggedIn, isMember, isAdmin ]}>
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
```

## Rendering a child when a comparison matches
Show content based on easy to read value comparisons:

```jsx
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
```

## Rendering a child given a list of conditions
Show content based on many conditions:

```jsx
<If all={[ isMember, isAdmin ] }>
  <p>You are logged as an admin</p>
</If>
<If some={[ isMember, isGuest ]}>
  <p>You are logged in</p>
</If>
<If notAll={[ isLoggedIn, isAdmin ]}>
  <p>The content is unavailable</p>
</If>
<If none={[ isMember, isManager, isAdmin ]}>
  <p>You are not logged in</p>
</If>
```

## Rendering given the length of an array
You can even show content based on the length of an array:

```jsx
<If lengthOf={ members } is={3}>
  <p>There are 3 members</p>
</If>
<If lengthOf={ members } isNot={3}>
  <p>There aren't 3 members</p>
</If>
<If lengthOf={ members } above={3}>
  <p>There are more than 3 members</p>
</If>
<If lengthOf={ members } below={3}>
  <p>There are less than 3 members</p>
</If>
<If lengthOf={ members } atLeast={3}>
  <p>There are 3 or more members</p>
</If>
<If lengthOf={ members } atMost={3}>
  <p>There are 3 or less members</p>
</If>
```

## Install

```sh
npm install if-then-else
# yarn install if-then-else
# bun install if-then-else
```

### Jest

Jest tests are set up to run with `npm test` or `yarn test`.
