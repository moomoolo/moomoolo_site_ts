import React from "react";
import style from "./Blog.module.scss";

export interface BlogProps {
  contentHTML: string
}

export default function Blog({ contentHTML }: BlogProps) {
  return (
    <div className={style.container}>
      <div className={style.content} dangerouslySetInnerHTML={{__html: contentHTML}}></div>
    </div>
  )
}
