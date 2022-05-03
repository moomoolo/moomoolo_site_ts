import React from "react";
import style from "./Blog.module.scss";
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import { useEffect } from "react";

export interface BlogProps {
  contentHTML: string
}

// 博客组件，接收html，展示内容并高亮代码
export default function Blog({ contentHTML }: BlogProps) {
  useEffect(() => {
    // 代码高亮
    Prism.highlightAll();
  }, [])
  return (
    <div className={style.container}>
      <div className={style.content} dangerouslySetInnerHTML={{__html: contentHTML}}></div>
    </div>
  )
}
