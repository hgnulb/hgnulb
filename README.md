# HGNULB'S PERSONAL BLOG

[https://hgnulb.github.io/hgnulb/](https://hgnulb.github.io/hgnulb/)

# 启动本地博客

```shell
gem install bundler jekyll
gem install wdm

bundle install
bundle update

jekyll serve --watch
bundle exec jekyll serve
```

```shell
sudo gem install bundler jekyll
sudo gem install wdm

sudo bundle install
sudo bundle update

sudo jekyll serve --watch
sudo bundle exec jekyll serve
```

# 清空博客所有历史提交记录

```shell
git checkout --orphan latest_branch

git add -A

git commit -am "no message"

git branch -D gh-pages

git branch -m gh-pages

git push -f origin gh-pages
```

# 博客操作手册

## 博客点击事件模板

```html
<a class="button show-hidden">点击查看结果</a>

<div class="hidden">
<blockquote><p><b>参考答案</b>
and so on
</p></blockquote>
</div>
```

## 博客图片放大模板

```html
<a data-fancybox="post-image" href="" data-caption=""><img src=""></a>
```

