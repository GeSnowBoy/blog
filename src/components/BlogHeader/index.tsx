import * as React from 'react';
import { Affix } from 'antd';
import './index.less';
interface P {}
export default function BlogHeader(props: P) {
  return (
    <Affix className="blog-header">
      <div className="container">
        <a href="./">
          <img src={require('../../assest/logo.png')} className="logo-img" />
        </a>
      </div>
    </Affix>
  );
}
