---
layout: post
title: "Java 并发-并发工具类 CyclicBarrier"
permalink: /blog/24999045
categories: [Java 并发]
tags: [Java 并发]
date: 2020-10-28  0:56:17
---

* Kramdown table of contents
{:toc .toc}
同步屏障 CyclicBarrier

```java
import java.util.concurrent.BrokenBarrierException;
import java.util.concurrent.CyclicBarrier;

public class CyclicBarrierTest {
    private static CyclicBarrier c = new CyclicBarrier(2);

    public static void main(String[] args) {
        Thread t = new Thread(() -> {
            try {
                c.await();
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (BrokenBarrierException e) {
                e.printStackTrace();
            }
            System.out.println(1);
        });

        t.start();

        try {
            c.await();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (BrokenBarrierException e) {
            e.printStackTrace();
        }
        System.out.println(2);
    }
}
```

> 1
> 2
> 或
> 2
> 1

```java
import java.util.concurrent.BrokenBarrierException;
import java.util.concurrent.CyclicBarrier;

public class CyclicBarrierTest2 {
    private static CyclicBarrier c = new CyclicBarrier(2, new A());

    public static void main(String[] args) {
        Thread t = new Thread(() -> {
            try {
                c.await();
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (BrokenBarrierException e) {
                e.printStackTrace();
            }
            System.out.println(1);
        });

        t.start();
        try {
            c.await();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (BrokenBarrierException e) {
            e.printStackTrace();
        }
        System.out.println(2);
    }

    private static class A implements Runnable {
        @Override
        public void run() {
            System.out.println(3);
        }
    }
}
```

> 3
> 1
> 2
> 或
> 3
> 2
> 1

```java
import java.util.Map;
import java.util.concurrent.*;

public class BankWaterService implements Runnable {
    private CyclicBarrier c = new CyclicBarrier(4, this);
    private ExecutorService executor = Executors.newFixedThreadPool(4);
    private ConcurrentHashMap<String, Integer> sheetBankWaterCount = new ConcurrentHashMap<>();

    private void count() {
        for (int i = 0; i < 4; i++) {
            executor.execute(() -> {
                sheetBankWaterCount.put(Thread.currentThread().getName(), 1);
                try {
                    c.await();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                } catch (BrokenBarrierException e) {
                    e.printStackTrace();
                }
            });
        }
        executor.shutdown();
    }

    @Override
    public void run() {
        int result = 0;
        for (Map.Entry<String, Integer> sheet : sheetBankWaterCount.entrySet()) {
            result += sheet.getValue();
        }
        sheetBankWaterCount.put("result", result);
        System.out.println(result);
    }

    public static void main(String[] args) {
        BankWaterService bankWaterCount = new BankWaterService();
        bankWaterCount.count();
    }
}
```

> 4

```java
import java.util.concurrent.CyclicBarrier;

public class CyclicBarrierTest3 {
    private static CyclicBarrier c = new CyclicBarrier(2);

    public static void main(String[] args) throws InterruptedException {
        Thread t = new Thread(() -> {
            try {
                c.await();
            } catch (Exception e) {
            }
        });
        t.start();

        Thread.sleep(1000);
        System.out.println(c.getNumberWaiting());
        t.interrupt();
        try {
            c.await();
        } catch (Exception e) {
            System.out.println(c.isBroken());
        }
    }
}
```

> 1
> true

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Semaphore;

public class SemaphoreTest {
    private static final int THREAD_COUNT = 30;
    private static ExecutorService executor = Executors.newFixedThreadPool(THREAD_COUNT);
    private static Semaphore s = new Semaphore(10);

    public static void main(String[] args) {
        for (int i = 0; i < THREAD_COUNT; i++) {
            executor.execute(() -> {
                try {
                    s.acquire();
                    System.out.println("save data!");
                    s.release();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            });
        }
        executor.shutdown();
    }
}
```

```java
import java.util.concurrent.Exchanger;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ExchangerTest {
    private static final Exchanger<String> exgr = new Exchanger<>();
    private static ExecutorService executor = Executors.newFixedThreadPool(2);

    public static void main(String[] args) {
        executor.execute(() -> {
            String A = "银行流水 A";
            try {
                exgr.exchange(A);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });

        executor.execute(() -> {
            String B = "银行流水 B";
            try {
                String A = exgr.exchange(B);
                System.out.println("A 和 B 数据是否一致：" + A.equals(B) + "，\nA 录入的是：" + A + "，\nB 录入的是：" + B + "。");
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });

        executor.shutdown();
    }
}
```

> A 和 B 数据是否一致：false，
> A 录入的是：银行流水 A，
> B 录入的是：银行流水 B。





