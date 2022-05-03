import Link from 'next/link';
import React from 'react'
import style from './BlogList.module.scss';

export type BlogInfo = {
  path: string,
  title: string,
  publishTime: string,
  abstract: string,
};

export default function BlogList(blogInfoList: BlogInfo[] ) {
  return (
    <ul className={style.blog_list}>
      {
        blogInfoList.map((blogInfo) => {
          return (
            <li key={blogInfo.path}>
              <Link href={"/blog/" + blogInfo.path}>
                <a>
                  <div className={style.publish_time}>{blogInfo.publishTime}</div>
                  <div className={style.title}>{blogInfo.title}</div>
                  <div className={style.abstract}>{blogInfo.abstract}</div>
                </a>
              </Link>
            </li>
          )
        })
      }
    </ul>
  )
}
