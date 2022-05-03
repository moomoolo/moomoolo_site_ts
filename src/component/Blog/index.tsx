import React from "react";
import style from "./Blog.module.scss";
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import { useEffect } from "react";

export interface BlogProps {
  contentHTML: string
}

export default function Blog({ contentHTML }: BlogProps) {
  useEffect(() => {
    Prism.highlightAll();
  }, [])
  return (
    <div className={style.container}>
      <div className={style.content} dangerouslySetInnerHTML={{__html: contentHTML}}></div>
    </div>
  )
}
