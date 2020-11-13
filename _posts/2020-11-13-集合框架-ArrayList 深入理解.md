---
layout: post
title: "集合框架-ArrayList 深入理解"
permalink: /blog/06388951
categories: [集合框架]
tags: [集合框架]
date: 2020-11-13 12:08:16
---

* Kramdown table of contents
{:toc .toc}
## 问题思考

- 如何删除 ArrayList 中奇数位置的元素？

```java
public class Test {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("a");
        list.add("b");
        list.add("c");
        list.add("d");
        list.add("e");
        System.out.println("删除前：" + list);
        /**
         * 要先把 list 的大小计算出来，不能在 for 循环里面计算。
         */
        int size = list.size();
        Iterator<String> it = list.iterator();
        for (int i = 0; i < size; i++) {
            it.next();
            if (i % 2 == 0) {
                it.remove();
            }
        }
        System.out.println("删除后：" + list);
    }
}
```

> 删除前：[a, b, c, d, e]
> 删除后：[b, d]