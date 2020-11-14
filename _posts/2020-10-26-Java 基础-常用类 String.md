---
layout: post
title: "Java 基础-常用类 String"
permalink: /blog/58104670
categories: [Java 基础]
tags: [Java 基础]
date: 2020-10-26 15:35:23
---

* Kramdown table of contents
{:toc .toc}
## String 类源码解析

```java
private final char value[];
```

## 常用类 String 常考面试题

```java
public class Main {
    public static void main(String[] args) {
        String s1 = "abc";
        String s2 = "abc";
        System.out.println(s1 == s2);
        String s3 = new String("abc");
        System.out.println(s1 == s3);
    }
}
```

<a class="button show-hidden">点击查看结果</a>

<div class="hidden">
<blockquote><p><b>参考答案</b>
true
false
</p></blockquote>
</div>
```java
public class Test {
    public static void main(String[] args) {
        String str = "";
        System.out.print(str.split(",").length);
    }
}
```

<a class="button show-hidden">点击查看结果</a>

<div class="hidden">
<blockquote><p><b>参考答案</b>
1
</p></blockquote>
</div>

```java
public class Test {
    public static void main(String[] args) {
        String s1 = "abc";
        System.out.println(func(s1));
        System.out.println(s1);
        StringBuilder s2 = new StringBuilder("abc");
        System.out.println(func(s2));
        System.out.println(s2);
    }

    public static String func(String s) {
        s += "cde";
        return s;
    }

    public static String func(StringBuilder s) {
        s.append("cde");
        return s.toString();
    }
}
```

<a class="button show-hidden">点击查看结果</a>

<div class="hidden">
<blockquote><p><b>参考答案</b>
abccde
abc
abccde
abccde
</p></blockquote>
</div>
```java
public class Example {
    String str = new String("good");
    char[] ch = {'a', 'b', 'c'};

    public static void main(String args[]) {
        Example ex = new Example();
        ex.change(ex.str, ex.ch);
        System.out.print(ex.str + " and ");
        System.out.print(ex.ch);
    }

    public void change(String str, char ch[]) {
        str = "test ok";
        ch[0] = 'g';
    }
}
```

<a class="button show-hidden">点击查看结果</a>

<div class="hidden">
<blockquote><p><b>参考答案</b>
good and gbc
</p></blockquote>
</div>

```java
public class Example {
    public static void main(String[] args) {
        String a = "hello";
        change(a);
        System.out.println(a);
    }

    public static void change(String name) {
        name = "world";
    }
}
```

<a class="button show-hidden">点击查看结果</a>

<div class="hidden">
<blockquote><p><b>参考答案</b>
hello
</p></blockquote>
</div>

```java
public class Test {
    public static void main(String[] args) {
        Test test = new Test();
        int a = 1;
        test.addInt(a);
        System.out.println(a);
        String str = "hello";
        test.addString(str);
        System.out.println(str);
        StringBuilder sb = new StringBuilder("hello");
        test.addBuilder(sb);
        System.out.println(sb.toString());
        Long m = 1L;
        Long n = 1L;
        System.out.println(m == n);
        m = 200L;
        n = 200L;
        System.out.println(m == n);
        String x = new String("hello");
        String y = "hello";
        System.out.println(x.equals(y));
        System.out.println(x == y);
    }

    public void addInt(int a) {
        a = a + 1;
    }

    public void addString(String str) {
        str = str + "world";
    }

    public void addBuilder(StringBuilder sb) {
        sb.append("world");
    }
}
```

<a class="button show-hidden">点击查看结果</a>

<div class="hidden">
<blockquote><p><b>参考答案</b>
1
hello
helloworld
true
false
true
false
</p></blockquote>
</div>

```java
public class Test {
    // swap() doesn't swap i and j
    public static void swap(Integer i, Integer j) {
        Integer temp = new Integer(i);
        i = j;
        j = temp;
    }

    public static void main(String[] args) {
        Integer i = new Integer(10);
        Integer j = new Integer(20);
        swap(i, j);
        System.out.println("i = " + i + ", j = " + j);
    }
}
```

<a class="button show-hidden">点击查看结果</a>

<div class="hidden">
<blockquote><p><b>参考答案</b>
i = 10, j = 20
</p></blockquote>
</div>
```java
public class Test {
    public static void main(String[] args) {
        System.out.print('A' + 'B' + " ");
        StringBuffer sb = new StringBuffer('A');
        sb.append('B');
        sb.append('C');
        System.out.println(sb);
    }
}
```

<a class="button show-hidden">点击查看结果</a>

<div class="hidden">
<blockquote><p><b>参考答案</b>
131 BC
</p></blockquote>
</div>

## 推荐阅读

- [https://www.cnblogs.com/dolphin0520/p/3778589.html](https://www.cnblogs.com/dolphin0520/p/3778589.html)