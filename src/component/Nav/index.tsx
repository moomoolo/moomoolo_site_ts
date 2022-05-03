import Image from "next/image";
import Link from "next/link";
import React from "react";
import style from "./Nav.module.scss";

// 页面顶部导航栏
export default function Nav() {
  return (
    <div className={style.wrapper}>
      <Link href="/">
        <a className={style.title_img_wrapper}>
          <Image
            alt="title"
            src="/title_double.png"
            layout="fill"
          />
        </a>
      </Link>
    </div>
  );
}
