import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { IssuseType } from '../../model/issuse';
import API from '../../ajax/githubAPI';
import * as marked from 'marked';
import {
  Skeleton,
  BackTop,
  Avatar,
  Divider,
  List,
  Comment,
  Row,
  Col
} from 'antd';
import { IconText } from '../../components/blog-cell';
import { CommentType } from '../../model/comment';
import { CustomLink } from '../../components/CustomLink';
import MdView from 'components/MdView';
import LinkTree from 'components/LinkTree';

interface P
  extends RouteComponentProps,
    ReturnType<typeof mapStateToProps>,
    ReturnType<typeof mapDispatchToProps> {}
const mapStateToProps = (state, props: RouteComponentProps) => {
  let id = (props.match.params as any).id;
  return {
    id,
    blogData: state.blogList.find((item: IssuseType) => item.number == id)
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};
function UserAvatar(props: IssuseType) {
  return (
    <div style={{ display: 'flex' }}>
      <Avatar
        src={props.user.avatar_url}
        style={{ marginRight: 20, border: '1px solid #cfcfcf' }}
        size={50}
      />
      <div style={{ flex: 1 }}>
        <div style={{ color: '#333', fontWeight: 'bold' }}>
          {props.user.login}
        </div>
        <div style={{ marginTop: 12 }}>
          <IconText type="schedule" text={props.created_at.split('T')[0]} />
          <Divider dashed type="vertical" />
          <IconText type="edit" text={props.body.length + '字'} />
        </div>
      </div>
    </div>
  );
}

function DetailPage(props: P) {
  let [blogData, setBlogData] = React.useState<IssuseType>(props.blogData);
  let [comments, setComments] = React.useState<CommentType[]>([]);
  let [isLoading, setIsLoading] = React.useState(!blogData);
  React.useEffect(() => {
    if (!blogData || blogData.id != props.id) {
      setIsLoading(true);
      API.issuse
        .getOne({ issue_number: (props.match.params as any).id })
        .then(res => {
          setIsLoading(false);
          setBlogData(res as any);
          document.title = (res as any).title;
        });
      API.comment.get((props.match.params as any).id).then(res => {
        console.log('行号58:', res);
        setComments(res as any);
      });
    }
  }, [props.id]);
  return (
    <div style={{ maxWidth: 1200, margin: 'auto', padding: 20 }}>
      <BackTop />
      <Skeleton
        loading={isLoading}
        active
        paragraph={{
          rows: 15
        }}
      >
        {blogData && (
          <Row gutter={50}>
            <Col span={18}>
              <h1>{blogData.title}</h1>
              <UserAvatar {...blogData} />
              <Divider dashed />
              <MdView md={blogData.body} />
              <Divider dashed />
              <div>
                {parseInt(props.id) > 1 && (
                  <CustomLink to={`${parseInt(props.id) - 1}`}>
                    上一篇
                  </CustomLink>
                )}
                <CustomLink
                  to={`${parseInt(props.id) + 1}`}
                  style={{ float: 'right' }}
                >
                  下一篇
                </CustomLink>
              </div>
              <List
                dataSource={comments}
                footer={
                  !!comments.length && <div>共{comments.length}条评论</div>
                }
                locale={{ emptyText: <div /> }}
                renderItem={item => {
                  return (
                    <Comment
                      author={item.user.login}
                      avatar={item.user.avatar_url}
                      content={<MdView md={item.body} />}
                      datetime={item.created_at
                        .split('T')
                        .join(' ')
                        .replace('Z', '')}
                    />
                  );
                }}
              />
            </Col>

            <Col span={6}>
              <LinkTree md={blogData.body} />
            </Col>
          </Row>
        )}
      </Skeleton>
    </div>
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailPage);
