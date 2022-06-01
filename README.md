# jswui
使用vue2 + vuetify + pinia创建。


# 使用
```
// html
<div id="app">
    <py-app uri="ws://xxxx"></py-app>
</div>


// script
new Vue({
    el: "#app",
    vuetify: new Vuetify(),
    pinia:pywui.init(Vue).pinia
});
```

# 服务器

# 进入开发模式
```
npm run serve
```

# 打包
```
npm run package
```