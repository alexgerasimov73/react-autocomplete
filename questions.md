# Questions


## 1. What is the difference between Component and PureComponent? give an example where it might break my app
Difference is in comparing. PureComponent uses shallow comparing and checks just refs and values to objects. And PureComponent uses by default shouldComponentUpdate. In simple React.Component we can also use shouldComponentUpdate, but it's not used by default. I don't face with breaking the app, but it can have some problems with objects in props/state, because shallow comparing and checking only values and refs.

## 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?
My rough approximation would be ShouldComponentUpdate can block updates context data in child components. But I am not quite sure. I guess it`s better for me investigate this topic more thoroughly.

## 3. Describe 3 ways to pass information from a component to its PARENT
1. State manager. For instance Redux.
2. Using setState in parent component and callback with value in argument.
3. Context with setter function.
4. Forwarding ref.

## 4. Give 2 ways to prevent components from re-rendering
Using wrapper React.memo() in functional components. Also it`s better for performance use useMemo/useCallback hooks.
Using React.PureComponent for class components.

## 5. What is a fragment and why do we need it? Give an example where it might break my app
React.Fragment uses like wrapper for your components when it isn`t useful to use dom-element. Or in cases when you iterate array and it`s better not to creating real dom-element and you need on each iteration write a key prop. Alternate version is <></>, but you can`t connect key with <></>.

Frankly speaking I don't remember situations, when React.Fragment can break the app.

## 6. Give 3 examples of the HOC pattern
1. The most common using is React.memo. It is great tool for prevent re-renders and increase peeformance, memoizing results.
2. Connect method by react-redux. Connected mapStateToProps and mapDispatchToProps with some component.
3. Some cases when we need to return new component with some props. We can wrap in HOC some component which returns other component.

## 7. what's the difference in handling exceptions in promises, callbacks and async...await
Callbacks uses try-catch construction.
In promises we use a reject function where handle the exception.
And async...await can use .catch callback, try-catch construction or it can be a promise.

## 8. How many arguments does setState take and why is it async
Function setState accepts 2 arguments.
First argument is the new state or function like previousState => {}, which you can use for getting latest state and work with it.
Second argument is a function that which will be run after changing the state.

It is asyns because React doesn`t perform subsequently and waits for for all calls setState. And if it doesn`t know you can get not that state, which you would wait and make some mistakes.
If you need the latest real state you can use setState with function in the first argument or if it is functional component use useEffect with useState.

## 9. List the steps needed to migrate a Class to Function Component
This process includes following important steps:
1. Replace class components with functions (Function  Declaration, Function Expression)
2. Delete the constructor
3. Use hooks instead setState, life-cycles
4. Instead render method you should just return JSX
5. Remove this context
6. You should use functions instead class method
7. Use useMemo like a wrapper for functional component.

## 10. List a few ways styles can be used with components
1. CSS modules or any pre-processors like Stylus/SASS/etc in connection with loaders in bundler
2. CSS-in-JS - styled-components, emotion, etc
3. Simple CSS which imports styles in HTML document and access by class name
4. Inline styles in an element

## 11. How to render an HTML string coming from the server
It has old attribute dangerouslySetInnerHTML={ __html: html }, which should be deprecated soon, because it's not safe. Attribute is added for the parent element, and you canget some HTML from server.
It has ome libraries for decision this problem. It can provided HTML and show it by escaping some symbols
