import * as React from 'react';
import { IssuseType } from '../../model/issuse';

import { List, Icon } from 'antd';
import './index.less';
import { CustomLink } from '../../components/CustomLink';
import { getMdInfo } from '../../tools/getMdInfo';
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
  let mdInfo = getMdInfo(props.body);
  return (
    <List.Item
      key={props.number}
      title={props.title}
      actions={[
        <IconText type="schedule" text={props.created_at.split('T')[0]} />,
        <IconText type="user" text={props.user.login} />,
        <IconText type="edit" text={mdInfo.length + '字'} />,
        <IconText type="message" text={props.comments} />
      ]}
    >
      <div className="blog-cell-main">
        <List.Item.Meta
          className="blog-cell-title"
          title={
            <CustomLink to={`/detail/${props.number}`} target="_blank">
              {props.title}
              {!props.locked && (
                <IconText type="fire" text="" style={{ marginLeft: 8 }} />
              )}
            </CustomLink>
          }
          description={mdInfo.introduction}
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
