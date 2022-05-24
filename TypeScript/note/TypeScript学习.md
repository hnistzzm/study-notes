# TypeScript学习

## 1.配置ts相关指令

- `tsc -- noEmitOnError`:当ts文件出现错误时,不允许其转换为js文件
- `tsc -- watch`:监听ts文件,实现热更新
- `tsc --init`:创建ts项目配置文件
- `tsc xxx`:执行ts文件		
- `npm -g typescript`:下载ts包

## 2.练习题

github地址:https://github.com/type-challenges

### 1.实现First

实现一个通用`First<T>`，它接受一个数组`T`并返回它的第一个元素的类型。

例如：

```typescript
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type head1 = First<arr1> // expected to be 'a'
type head2 = First<arr2> // expected to be 3
```

答案:

```typescript
type First<T extends any[]> = T['length'] extends 0 ? never : T[0]
```

### 2.实现Pick

实现 TS 内置的 `Pick<T, K>`，但不可以使用它。

**从类型 `T` 中选择出属性 `K`，构造成一个新的类型**。

例如：

```typescript
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyPick<Todo, 'title' | 'completed'>

const todo: TodoPreview = {
    title: 'Clean room',
    completed: false,
}
```

答案:

```typescript
type MyPick<T,K extends keyof T> = {[key in K] : T[key]}
```

### 3.实现Omit

`Omit` 会创建一个省略 `K` 中字段的 `T` 对象。

例如：

```typescript
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyOmit<Todo, 'description' | 'title'>

const todo: TodoPreview = {
  completed: false,
}
```

答案:

```typescript
type MyOmit<T,K extends keyof T> = {[key in Exclude<keyof T,K>] : T[key]}
```

### 4.获取元组长度

创建一个通用的`Length`，接受一个`readonly`的数组，返回这个数组的长度。

例如：

```typescript
type tesla = ['tesla', 'model 3', 'model X', 'model Y']
type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

type teslaLength = Length<tesla> // expected 4
type spaceXLength = Length<spaceX> // expected 5
```

答案:

```typescript
type TupleToObject<T extends readonly string[]> = { [K in T[number]]: K }
```





