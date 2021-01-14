---
layout: post
title: "MySQL 数据库-LeetCode 1459. 矩形面积"
permalink: /blog/31757933
categories: [数据库]
tags: [LeetCode]
date: 2021-01-14 14:52:04
---

* Kramdown table of contents
{:toc .toc}
```
表: Points 
+----------+-------------+-------------+
| id       | x_value     | y_value     |
+----------+-------------+-------------+
| 1        | 2           | 8           |
| 2        | 4           | 7           |
| 3        | 2           | 10          |
+----------+-------------+-------------+
id 是该表主键.
每个点都表示为二维空间 (x_value, y_value). 

Create table If Not Exists Points (id int, x_value int, y_value int);
Truncate table Points;
insert into Points (id, x_value, y_value) values ('1', '2', '8');
insert into Points (id, x_value, y_value) values ('2', '4', '7');
insert into Points (id, x_value, y_value) values ('3', '2', '10');

 写一个 SQL 语句, 报告由表中任意两点可以形成的所有可能的矩形. 
 结果表中的每一行包含三列 (p1, p2, area) 如下: 
 p1 和 p2 是矩形两个对角的 id 且 p1 < p2. 
 矩形的面积由列 area 表示. 

 请按照面积大小降序排列，如果面积相同的话, 则按照 p1 和 p2 升序对结果表排序 
 Points 表:
+----------+-------------+-------------+
| id       | x_value     | y_value     |
+----------+-------------+-------------+
| 1        | 2           | 8           |
| 2        | 4           | 7           |
| 3        | 2           | 10          |
+----------+-------------+-------------+

Result 表:
+----------+-------------+-------------+
| p1       | p2          | area        |
+----------+-------------+-------------+
| 2        | 3           | 6           |
| 1        | 2           | 2           |
+----------+-------------+-------------+

p1 应该小于 p2 并且面积大于 0.
p1 = 1 且 p2 = 2 时, 面积等于 |2-4| * |8-7| = 2.
p1 = 2 且 p2 = 3 时, 面积等于 |4-2| * |7-10| = 6.
p1 = 1 且 p2 = 3 时, 是不可能为矩形的, 因为面积等于 0.
```

```sql
SELECT
	* 
FROM
	(
	SELECT
		ps1.id P1,
		ps2.id P2,
		abs( ps1.x_value - ps2.x_value ) * abs( ps1.y_value - ps2.y_value ) AREA 
	FROM
		Points ps1,
		Points ps2 
	WHERE
		ps1.id < ps2.id 
	) t 
WHERE
	t.AREA != 0 
ORDER BY
	t.AREA DESC,
	P1,
	P2;
```



