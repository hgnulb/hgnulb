#!/bin/bash
echo "Please enter the file name"
read -r name
today=$(date "+%F-")
time=$(date "+%Y-%m-%d %H:%M:%S")
num=$(openssl rand -base64 8|cksum|cut -c 1-8)
echo $num
(
  cat <<EOF
---
layout: post
title: "$name"
permalink: /blog/$num
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
