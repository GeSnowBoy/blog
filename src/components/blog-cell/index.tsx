import * as React from 'react';
import { IssuseType } from '../../model/issuse';
import { Link } from 'react-router-dom';
import { List, Icon } from 'antd';
import './index.less';
function getImgUrl(src) {
  if (/https?:\/\/.+\.(jpg|png|gif)/.test(src)) {
    return src.match(/https?:\/\/.+\.(jpg|png|gif)/)[0];
  }
}
export const IconText = ({ type, text, style = {} }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8, ...style }} />
    <span>{text}</span>
  </span>
);

export default function BlogCell(props: IssuseType) {
  let imgUrl = getImgUrl(props.body);
  return (
    <List.Item
      key={props.number}
      title={props.title}
      actions={[
        <IconText type="schedule" text={props.created_at.split('T')[0]} />,
        <IconText type="user" text={props.user.login} />,
        <IconText type="edit" text={props.body.length + '字'} />,
        <IconText type="message" text={props.comments} />
      ]}
    >
      <div className="blog-cell-main">
        <List.Item.Meta
          className="blog-cell-title"
          title={
            <Link to={`/detail/${props.number}`} target="_blank">
              {props.title}
              {!props.locked && (
                <IconText type="fire" text="" style={{ marginLeft: 8 }} />
              )}
            </Link>
          }
          description={props.body.slice(0, 300) + '...'}
        />
        {imgUrl && (
          <div className="blog-cell-img">
            <img src={imgUrl} />
          </div>
        )}
      </div>
    </List.Item>
  );
}
