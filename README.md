# mini-react

```bash
# Install the dependencies
npm i
# Development Server
npm run dev
```

### Code style

```bash
npx eslint . --fix --ext .js,.jsx
```

### vite

https://vitejs.dev/

### 自定义vite jsx解析方法名

在`.jsx`文件头添加`/**@jsx CustomReact.createElementOrOtherName */`

告诉`vite`使用`CustomReact.createElementOrOtherName`来代替默认的`React.createElement`解析jsx文件/语法

```jsx
/**@jsx CustomReact.createElementOrOtherName */
```

### learn

https://learn.cuixueshe.com/
