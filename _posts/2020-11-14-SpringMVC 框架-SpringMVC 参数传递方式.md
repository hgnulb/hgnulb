---
layout: post
title: "SpringMVC 框架-SpringMVC 参数传递方式"
permalink: /blog/15650696
categories: [常用框架]
tags: [SpringMVC 框架]
date: 2020-11-14 01:05:11
---

* Kramdown table of contents
{:toc .toc}
## SpringMVC 参数传递方式

### 登录

```java
@PostMapping("/login")
@ResponseBody
public Map login(String username, String password) {
    Map<String, Object> map = new HashMap<>();
    map.put("username", username);
    map.put("password", password);
    return map;
}
```

```javascript
function login() {
    let param = {
        "username": "admin",
        "password": "123456"
    };
    $.ajax({
        url: "/login2",
        data: param,
        type: "post",
        dataType: "json",
        success: function(data) {
            $("#username").val(data.username);
            $("#password").val(data.password);
        }
    });
}
```

### 登录

```java
@PostMapping("/login2")
@ResponseBody
public Map<String, Object> login2(@RequestParam(value = "username", required = false) String username, 
                                  @RequestParam(value = "password", required = false) String password) {
    Map<String, Object> map = new HashMap<>();
    map.put("username", username);
    map.put("password", password);
    return map;
}
```

```javascript
function login() {
    let param = {
        "username": "admin",
        "password": "123456"
    };
    $.ajax({
        url: "/login2",
        data: param,
        type: "post",
        dataType: "json",
        success: function(data) {
            $("#username").val(data.username);
            $("#password").val(data.password);
        }
    });
}
```

### 注册

```java
@PostMapping("/register")
@ResponseBody
public User register(User user) {
    return user;
}
```

```javascript
function register() {
    let param = {
        "userName": $("#username").val(),
        "password": $("#password").val()
    };
    $.ajax({
        url: "/register",
        data: param,
        type: "post",
        dataType: "json",
        success: function(data) {
            console.log(data);
        }
    });
}
```

### 多参数无实体类参数为 json 字符串

```java
@PostMapping("/multiParameter")
@ResponseBody
public Map<String, Object> multiParameter(@RequestBody Map<String, Object> map) {
    return map;
}
```

```javascript
function multiParameter() {
    let param = {
        "title": "爪哇笔记",
        "content": "一个有趣的公众号",
        "author": "小柒2012"
    };
    param = JSON.stringify(param);
    $.ajax({
        url: "/multiParameter",
        data: param,
        type: "post",
        contentType: "application/json",
        dataType: "json",
        success: function(data) {
            console.log(data);
        }
    });
}
```

### 多参数无实体类参数为 json 对象

```java
@PostMapping("/multiParameter2")
@ResponseBody
public Map<String, Object> multiParameter2(@RequestParam Map<String, Object> map) {
    return map;
}
```

```javascript
function multiParameter2() {
    let param = {
        "title": "爪哇笔记",
        "content": "一个有趣的公众号",
        "author": "小柒2012"
    };
    $.ajax({
        url: prefix + "/multiParameter2",
        data: param,
        type: "post",
        dataType: "json",
        success: function(data) {
            console.log(data);
        }
    });
}
```

### 传递数组

```java
@PostMapping("/array")
@ResponseBody
public Map<String, Object> array(@RequestParam(value = "ids[]") Integer[] ids) {
    Map<String, Object> map = new HashMap<>();
    map.put("ids", ids);
    return map;
}
```

```javascript
function array() {
    let param = {
        "ids": [1, 2, 3]
    };
    $.ajax({
        url: prefix + "/array",
        data: param,
        type: "post",
        dataType: "json",
        success: function(data) {
            console.log(data);
        }
    });
}
```

### 传递数组

```java
@PostMapping("list")
@ResponseBody
public Map<String, Object> list(@RequestParam(value = "ids[]") List<Integer> ids) {
    Map<String, Object> map = new HashMap<>();
    map.put("ids",ids);
    return map;
}
```

```javascript
function array() {
    let param = {
        "ids": [1, 2, 3]
    };
    $.ajax({
        url: prefix + "/array",
        data: param,
        type: "post",
        dataType: "json",
        success: function(data) {
            console.log(data);
        }
    });
}
```

### 传递集合实体对象

```java
@PostMapping("listObject")
@ResponseBody
public List<User> listUser(@RequestBody List<User> list) {
    list.forEach(user->{
        System.out.println(user.getUserName());
    });
    return list;
}
```

```javascript
function listObject() {
    let list = [];
    list.push({
        "userName": "小柒2012",
        "phonenumber": "17762288888"
    });
    list.push({
        "userName": "小柒2013",
        "phonenumber": "17762289999"
    });
    $.ajax({
        url: prefix + "/listObject",
        data: JSON.stringify(list),
        type: "post",
        contentType: "application/json",
        dataType: "json",
        success: function(data) {
            console.log(data);
        }
    });
}
```

### 传递集合实体对象一对多

```java
@PostMapping("listUserRole")
@ResponseBody
public List<User> listUserRole(@RequestBody List<User> list) {
    list.forEach(user->{
        List<Role> roleList = user.getRoles();
        roleList.forEach(role->{
            System.out.println(role.getRoleName());
        });
    });
    return list;
}
```

```javascript
function listUserRole() {
    let roleList = [];
    roleList.push({
        "roleId": "10000",
        "roleName": "管理员"
    });
    roleList.push({
        "roleId": "10001",
        "roleName": "普通用户"
    });
    let list = [];
    let user = {
        "userId": 1001,
        "loginName": "admin",
        "userName": "小柒2012",
        "phonenumber": "17762288888"
    };
    user.roleList = roleList;
    list.push(user);
    $.ajax({
        url: prefix + "/listUserRole",
        data: JSON.stringify(list),
        type: "post",
        contentType: "application/json",
        dataType: "json",
        success: function(data) {
            console.log(data);
        }
    });
}
```

### restful 风格

```java
@GetMapping("article/{id}")
@ResponseBody
public Map<String,Object> article(@PathVariable("id") String id) {
    System.out.println(id);
    Map<String,Object> map = new HashMap<>();
    map.put("id",id);
    return map;
}
```

```javascript
function Restful(id) {
    $.ajax({
        url: prefix + "/article/"+id,
        type: "get",
        dataType: "json",
        success: function(data) {
            console.log(data);
        }
    });
}
```

> **注意事项**
>
> * @RequestBody 注解，必须与 contentType 类型 application/json 配合使用。
> * @RequestParam 注解，必须与 contentType 类型 application/x-www-form-urlencoded 配合使用，其为默认类型。
> * JSON.stringify() 把对象类型转换为字符串类型，一般配合 @RequestBody 注解和 contentType 类型 application/json 使用。
>
> **contentType**: 设置你发送给服务器的格式，有以下三种常见情况。
>
> 1. application/x-www-form-urlencoded: 默认值，提交的数据会按照 key1=val1&key2=val2 这种格式进行转换。
> 2. multipart/form-data: 这也是一个常见的 post 数据提交的方式。我们使用表单上传文件时，就要让 form 的 enctype 等于这个值。
> 3. application/json: 服务端消息主体是序列化后的 json 字符串。
>
> **dataType**: 告诉服务器，我要想什么类型的数据，如果没有指定，那么会自动推断是返回 xml，json，jsonp，text，script，string，html。