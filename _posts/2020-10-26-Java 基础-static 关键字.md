---
layout: post
title: "Java 基础-static 关键字"
permalink: /blog/75349532
categories: [Java 基础]
tags: [Java 基础]
date: 2020-10-26 15:35:01
---

* Kramdown table of contents
{:toc .toc}
## 问题思考

## static 关键字的使用场景

### 静态变量 variables

```java
class Test {
    // static variable
    static int a = m1();

    // static block
    static {
        System.out.println("Inside static block");
    }

    // static method
    static int m1() {
        System.out.println("from m1");
        return 20;
    }

    // static method
    public static void main(String[] args) {
        System.out.println("Value of a : " + a);
        System.out.println("from main");
    }
}
```

> from m1
> Inside static block
> Value of a : 20
> from main

> static 不能修饰局部变量，只能修饰成员变量。
>
> static 变量和 static 代码块按照它们在代码中的顺序执行。

### 静态方法 methods

> static 方法就是没有 this 的方法。在 static 方法的内部不能调用非静态方法，反过来倒是可以的。
>
> static 修饰的方法为静态方法或者类方法，静态方法只能调用静态变量或者静态方法，不能调用实例变量或者实例方法。静态方法中不能出现 this() 或者 super()。

```java
class Test {
    // static variable 
    static int a = 10;

    // instance variable 
    int b = 20;

    // static method 
    static void m1() {
        a = 20;
        System.out.println("from m1");

        // Cannot make a static reference to the non-static field b 
        b = 10; // compilation error 

        // Cannot make a static reference to the non-static method m2() from the type Test 
        m2();  // compilation error 

        //  Cannot use super in a static context 
        System.out.println(super.a); // compiler error  
    }

    // instance method 
    void m2() {
        System.out.println("from m2");
    }

    public static void main(String[] args) {
        // main method  
    }
} 
```

### 静态代码块 blocks

```java
class Test {
    static int i;
    int j;

    // start of static block
    static {
        i = 10;
        System.out.println("static block called ");
    }
    // end of static block  
}

class Main {
    public static void main(String args[]) {
        System.out.println(Test.i);
    }
}
```

> static block called 
> 10

```java
class Test {
    static int i;
    int j;

    static {
        i = 10;
        System.out.println("static block called ");
    }

    Test() {
        System.out.println("Constructor called");
    }
}

class Main {
    public static void main(String args[]) {
        Test t1 = new Test();
        Test t2 = new Test();
    }
} 
```

> static block called 
> Constructor called
> Constructor called

### 静态内部类 nested classes

### 静态导包

## 静态方法隐藏

## 静态最终变量 static final

## 静态变量和实例变量的区别

## 静态方法和实例方法的区别

## 静态绑定和动态绑定

## 静态 main 方法

## 推荐阅读

- [https://www.cnblogs.com/dolphin0520/p/3799052.html](https://www.cnblogs.com/dolphin0520/p/3799052.html)