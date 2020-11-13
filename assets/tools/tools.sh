#!/bin/bash
echo "Please enter the file name"
read -r name
today=$(date "+%F-")
time=$(date "+%Y-%m-%d %H:%M:%S")
(
  cat <<EOF
---
layout: post
title: "$name"
permalink: /blog/
categories: []
tags: []
date: $time
---

* Kramdown table of contents
{:toc .toc}
EOF
) >../../_posts/"$today$name".md
echo File successfully created
exit 0
