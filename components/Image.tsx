/**
 * Created by Haowen Liu in 2021
 * This is an replacement for next/image using images optimized and on build time.
 *
 * Design is inspired by next/image.
 */

import { Fragment } from "react";

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  layout: "responsive" | "fill";
  height?: number;
  width?: number;
}

export default function Image(props: ImageProps) {
  return (
    <Fragment>
      {props.layout === "responsive" && (
        <picture className="relative block overflow-hidden">
          <div
            className="block"
            style={{ paddingTop: `${(100 / props.width!) * props.height!}%` }}
          ></div>
          <source
            type="image/webp"
            srcSet={`${props.src}_2k.webp 2560w, ${props.src}_1080p.webp 1920w, ${props.src}_720p.webp 1280w`}
          ></source>
          <img
            srcSet={`${props.src}_2k.jpg 2560w, ${props.src}_1080p.jpg 1920w, ${props.src}_720p.jpg 1280w`}
            alt={props.alt}
            className={`${
              props.className !== undefined ? props.className : ""
            } block absolute min-w-full min-h-full max-h-full max-w-full top-0 left-0 bottom-0 right-0 m-auto`}
            sizes="100vw"
            decoding="async"
          ></img>
        </picture>
      )}
      {props.layout === "fill" && (
        <picture className="flex w-full h-full overflow-hidden">
          <source
            type="image/webp"
            srcSet={`${props.src}_2k.webp 2560w, ${props.src}_1080p.webp 1920w, ${props.src}_720p.webp 1280w`}
          ></source>
          <img
            srcSet={`${props.src}_2k.jpg 2560w, ${props.src}_1080p.jpg 1920w, ${props.src}_720p.jpg 1280w`}
            alt={props.alt}
            className={`object-cover object-center h-auto w-full ${props.className}`}
            decoding="async"
          ></img>
        </picture>
      )}
    </Fragment>
  );
}
