在页面中使用css

- 外链
- 嵌入
- 内联

---



CSS是如何工作的

![image-20220116153307988](../../../%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/cssStudy/image/image-20220116153307988.png)

---



颜色 -HSL

![image-20220116155819650](../../../%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/cssStudy/image/image-20220116155819650.png)

![image-20220116160055450](../../../%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/cssStudy/image/image-20220116160055450.png)

---



**font:**

font-family

![image-20220116160313789](../../../%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/cssStudy/image/image-20220116160313789.png)



spacing(间隔)：

- letter-spacing
  - 设置每个字符之间的间隔
- word-spacing
  - 设置某个word或者词语之间的间隔(以空格分隔的文本)

缩进:

- text-indent
  - 调整文本的缩进

文字修饰:

- text-decoration

---

CSS选择器



假设我们现在有两种选择器都作用于一个标签上,那么html引擎会给这两种选择器排列优先级,然后使用优先级高的选择器

优先级顺序: id>class>标签

```html
<p class="text">123</p>
```

```css
p{
    color:red;
}
.text{
    color:blue;
}
```

选择器生效的优先级

![image-20220116172253608](../../../%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/cssStudy/image/image-20220116172253608.png)

---

CSS布局

![image-20220116175214939](../../../%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/cssStudy/image/image-20220116175214939.png)

**常规流**

![image-20220116175249824](../../../%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/cssStudy/image/image-20220116175249824.png)



![image-20220116180620911](../../../%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/cssStudy/image/image-20220116180620911.png)

![image-20220116180728505](../../../%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/cssStudy/image/image-20220116180728505.png)

![image-20220116181125427](../../../%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/cssStudy/image/image-20220116181125427.png)



![image-20220116222802389](../../../%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/cssStudy/image/image-20220116222802389.png)





![image-20220116222844227](../../../%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/cssStudy/image/image-20220116222844227.png)

![image-20220116222958641](../../../%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/cssStudy/image/image-20220116222958641.png)

![image-20220116222713303](../../../%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/cssStudy/image/image-20220116222713303.png)

---

grid

![img](../../../%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/cssStudy/image/79W%5DGI6FIY32QA%7BKJ3%60V$H.png)



**浮动**

---



![image-20220116221104038](../../../%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/cssStudy/image/image-20220116221104038.png)