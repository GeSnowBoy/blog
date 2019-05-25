import * as React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { parseQueryString } from '../tools';
export const CustomLink = (props: LinkProps) => {
  let temp = { ...props };
  let query = parseQueryString(location.hash);
  let preHash = '';
  if (query.owner) {
    preHash += '?owner=' + query.owner;
  }
  if (query.blog) {
    preHash += (preHash ? '&' : '?') + 'blog=' + query.blog;
  }
  if (typeof props.to === 'string') {
    temp.to += preHash;
  } else {
    //@ts-ignore
    temp.to.pathname += preHash;
  }
  return <Link {...temp} />;
};
