# redux-action-validator

Extensible class to validate Redux/Flux action properties and ensure consistency across large projects.

## Tutorial Available on [AngularToReact.com](https://angulartoreact.com)
[How to Assert that a Redux or Flux Action Contains the Expected Properties with the Appropriately Typed Values](https://angulartoreact.com/redux-action-validator-part-1/)

## Installation

```bash
npm install --save redux-action-validator
```

## Usage

First, import the ReduxAction class at the top of your file.

```js
import ReduxAction from 'redux-action-validator'
```


### Define Your Custom Action Types that extend ReduxAction

Create a new class that extends `ReduxAction`

```js
class MyAction1 extends ReduxAction {
  constructor(o) {
    super(MyAction1.TYPE, {
      id:         ReduxAction.NUMBER,
      myList:     ReduxAction.ARRAY,
      mySample:   ReduxAction.STRING,
      myMap:      ReduxAction.OBJECT,
      myTest:     ReduxAction.BOOLEAN
    }, o)
  }
}
MyAction1.TYPE = 'MY_ACTION_1'

class MyAction2 extends ReduxAction {
  constructor(o) {
    super(MyAction2, {
      someNumber: ReduxAction.NUMBER
    }, o)
  }
}
MyAction2.TYPE = 'MY_ACTION_2'
```

Let's break it down.

`MyAction1` is the name of the Redux/Flux action you want to create and validate.

`MY_ACTION_1` is the internal string constant you want to associate with `MyAction1`. This will become `MyAction1.type`. Remeber that these constants need to be unique throughout your entire Redux application namespace.


`id`, `myList`, `mySample`, `myMap`, `myTest` are all properties that you want to force each `MyAction1` instance to contain. These are mapped to type constants. `redux-action-validator` contains the following property type constants:

- ReduxAction.NUMBER
- ReduxAction.ARRAY
- ReduxAction.STRING
- ReduxAction.OBJECT
- ReduxAction.BOOLEAN

If you don't see a constant for the type you're trying to validate, don't worry! You can also use a string. The code will be looking for the result of `typeof someProp` to validate it.

Notice the `o` variable that's part of the constructor. This is the raw Action object that will get passed to the constructor of `MyAction1`. Let's take a closer look at how you'll use that:


### Inside your Action Creator
Every Redux action must return a standard javascript object with at least a `type` property. Without `redux-action-validator` it would look like this:

```js
function myActionCreator(id) {
  return {
    type: 'MY_ACTION_1',
    id: id
  }
}
```

With `redux-action-validator` you end up with:

```js
function myActionCreator(id) {
  return new MyAction1({ id: id }).toObject()
}
```

The benefit is that you've already established a list of expected properties and types in the `MyAction1` class definition. Under the hood, `redux-action-validator` will test all of the properties of your action to make sure you're following the contract you decided on up front. If not, it will throw an Error with a detailed description of why it failed:

```
Error: Invalid Action Property for Type [MY_ACTION_1]: [id] expected to be type [number] but saw [array] instead.
```

This works if you pass the wrong value type of an action property. And it also works if you fail to include a specific property.

```
Error: Invalid Action Property for Type [MY_ACTION_1]: [id] expected to be type [number] but saw [undefined] instead.
```

### Inside your Reducer
```js
switch (action.type) {
  case type(MyAction1.TYPE):
    const myAction1 = new MyAction1(action).toObject()
}
```

Here, you have a convenient static class value `TYPE` to use with `switch` (or whatever method you use). Then, inside the `case` block you just need to pass the raw action from Redux into the constructor of your custom `MyAction1` class. If any of the action properties are missing or of the wrong type, it will throw an error. This should help keep your Redux/Flux actions structured in a consistent and predictable way. This is especially useful if you're working on a large project with multiple contributors.

### To summarize:

1. Create all of your Action Types in a top-level file. Be sure to import the `ReduxAction` class and have all of your custom action types extend that base class.
2. Import these Action Type definitions into your Redux Action Creators and Reducers
3. Have each creator return an object from the `toObject()` method of your custom Action class
4. Have each reducer use the `TYPE` constant of your custom Action class in the `switch` statement
5. Create an instance of your custom action type by passing the raw `action` object to the constructor of your action type class.

At any point in this process, if an invalid action comes through an exception will be thrown.

If you ideas, suggestions or bug reports feel free to create an Issue or Pull Request on this repo.

Thanks
## Michael, [AngularToReact.com](https://angulartoreact.com)
