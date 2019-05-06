import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, Link } from 'react-router-dom';
import { IssuseType } from '../../model/issuse';
import API from '../../axios/githubAPI';
import marked from 'marked';
import { Skeleton, BackTop, Avatar, Divider } from 'antd';
import { IconText } from '../../components/blog-cell';
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
  let [isLoading, setIsLoading] = React.useState(!blogData);
  React.useEffect(() => {
    if (!blogData || blogData.id != props.id) {
      setIsLoading(true);
      API.issuse
        .getOne({ issue_number: (props.match.params as any).id })
        .then(res => {
          setIsLoading(false);
          setBlogData(res as any);
        });
    }
  }, [props.id]);
  return (
    <div style={{ maxWidth: 900, margin: 'auto', padding: 20 }}>
      <BackTop />
      <Skeleton
        loading={isLoading}
        active
        paragraph={{
          rows: 15
        }}
      >
        {blogData && (
          <div>
            <h1>{blogData.title}</h1>
            <UserAvatar {...blogData} />
            <Divider dashed />
            <div dangerouslySetInnerHTML={{ __html: marked(blogData.body) }} />
          </div>
        )}
        <Divider dashed />
        <div>
          {parseInt(props.id) > 1 && (
            <Link to={`${parseInt(props.id) - 1}`}>上一篇</Link>
          )}
          <Link to={`${parseInt(props.id) + 1}`} style={{ float: 'right' }}>
            下一篇
          </Link>
        </div>
      </Skeleton>
    </div>
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailPage);
