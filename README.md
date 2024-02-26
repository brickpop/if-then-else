# If-Then-Else

The missing conditional renderer that the React team didn't ship.

Write clean UI components that can be read as a visual JS function.

## Render a simple child when true
```tsx
<If condition={a && b && c}>
   <p>The condition is true</p>
</If>
```

## Render a simple child when false
```tsx
<If not={a && b && c}>
   <p>The condition is false</p>
</If>
```

## Render the first child with a matching condition

```tsx
<If condition={a && b && c}>
  <Then>
    <p>Condition 1 is true</p>
  </Then>
  <ElseIf condition={ d && e }>
    <p>Condition 2 is true</p>
  </ElseIf>
  <ElseIf condition={ f || g }>
    <p>Condition 3 is true</p>
  </ElseIf>
  <Else>
    <p>The above conditions are false</p>
  </Else>
</If>
```

With negated conditions:
```tsx
<If not={a && b && c}>
  <Then>
    <p>Condition 1 is false</p>
  </Then>
  <ElseIf condition={ d && e }>
    <p>Condition 2 is true</p>
  </ElseIf>
  <ElseIf not={ f || g }>
    <p>Condition 3 is false</p>
  </ElseIf>
  <Else>
    <p>No conditions match</p>
  </Else>
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
