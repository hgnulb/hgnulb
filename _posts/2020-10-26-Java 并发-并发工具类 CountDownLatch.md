---
layout: post
title: "Java 并发-并发工具类 CountDownLatch"
permalink: /blog/88048105
categories: [Java 并发]
tags: [Java 并发]
date: 2020-10-26 22:45:25
---

* Kramdown table of contents
{:toc .toc}
等待多线程完成的 CountDownLatch

```java
public class JoinCountDownLatchTest {
    public static void main(String[] args) throws InterruptedException {
        Thread parser1 = new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("parser1 finish!");
            }
        });

        Thread parser2 = new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("parser2 finish!");
            }
        });

        parser1.start();
        parser2.start();
        parser1.join();
        parser2.join();
        System.out.println("all parser finish!");
    }
}
```

> parser1 finish!
> parser2 finish!
> all parser finish!
>
> 或者
>
> parser2 finish!
> parser1 finish!
> all parser finish!

```java
import java.util.concurrent.CountDownLatch;

public class CountDownLatchTest {
    private static CountDownLatch count = new CountDownLatch(2);

    public static void main(String[] args) {
        Thread t1 = new Thread(() -> {
            System.out.println(1);
            count.countDown();
            System.out.println(2);
            count.countDown();
        });

        t1.start();
        try {
            count.await();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println(3);
    }
}
```

> 1
> 2
> 3