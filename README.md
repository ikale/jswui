# jswui
使用vue2 + vuetify + pinia创建。


# 使用
```
// init返回一个对象，里面包含了pinia的实例，解构出pinia实例添加至vue实例中
pywui.init(Vue)


// script
new Vue({
    el: "#app",
    vuetify: new Vuetify(),
    pinia:pywui.init(Vue).pinia
});
```
# 创建方式
### 数据格式
```
// rawdata
{
        "__$0$":18,
        "__$1$":"ikale",
        "__$3$":"chao"
}


// uidata
{
    'id':'0',
    'tag':"div",
    'props':{'class':"__$1$", 'age':"__$0$"},
    'events':{"click":"onclick"},
    'solts':{
            'default':[
                "插槽内容->",
                "__$1$",
                {
                    'id':'1',
                    'tag':"v-text-field",
                    'props':{'class':"__$3$", 'age':"__$0$"},
                    'events':{"input":"input"},
                    'solts':{
                        'append':['我不知道'],
                        'prepend':["爱是什么","__$1$"]
                    }
                }
            ]
        }
    }

```
### 响应式数据格式
使用字符串，以__$开始并且以$结尾中间不包含空格，与rawdata中的key值对应
```
__$xxx$
```

# 操作接口
### 1.通过ws服务器通信
```
// html
<div id="app">
    <py-app uri="ws://xxxx"></py-app>
</div>
```

### 2.通过js
```
// 更新ui
pywui.updateUi(uidata)

// 更新数据
pywui.updateData(rawdata)

// 获取当前ui
pywui.getUidata()

// 获取当前data
pywui.getRawdata()
```



# 开发模式

### 项目初始化
```
npm install
```

### 进入开发模式
```
npm run serve
```

### 打包
```
npm run package
```