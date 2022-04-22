import { NextPage, NextPageContext } from "next";
import styles from "@styles/blog.module.css";
import Layout from "@components/layout";
import PostItem from "@components/blog/post-item";
import { FaChevronLeft, FaEllipsisH } from "react-icons/fa";
import client from "@libs/server/client";
import { SessionUserData, withSsrSession } from "@libs/server/withSession";
import { Post } from "@prisma/client";
import { dateToString } from "@libs/client/commonFunction";
import dynamic from "next/dynamic";
import useSWR from "swr";
import { useRouter } from "next/router";

interface PostProps {
  user: SessionUserData | null;
}
interface PostResponse {
  result: boolean;
  post: Post;
}

const Viewer = dynamic(() => import("@components/viewer"), { ssr: false });

const Post: NextPage<PostProps> = ({ user }) => {
  const router = useRouter();
  const { data } = useSWR<any>(
    router?.query?.id ? `/api/blog/${router.query.id}` : null
  );
  const tags = data?.post?.tags?.split(", ");
  return (
    <Layout user={user}>
      <div className={styles.container}>
        <div className={styles.postingHeader}>
          <div className={styles.postingTitleWrap}>
            <FaChevronLeft />
            <div>{data?.post?.title}</div>
          </div>
          <div className={styles.postingRegistTime}>
            {dateToString(data?.post?.createdAt)}
          </div>
        </div>
        <div className={styles.postingContentWrap}>
          <div className={styles.postingContent}>
            <Viewer content={data?.post?.content} />
          </div>
          {tags && tags.length > 0 ? (
            <ul className={styles.postingTag}>
              {tags.map((tag: string, idx: number) => {
                return <li key={idx}># {tag}</li>;
              })}
            </ul>
          ) : (
            ""
          )}
        </div>
        <div className={styles.commentWrap}>
          <div className={styles.commentBox}>
            <img className={styles.profileImage} src="#" />
            <div className={styles.comment}>
              <div className={styles.commentInfo}>
                <div className={styles.commentWriterInfo}>
                  <div className={styles.nickname}>sancy1003</div>
                  <div className={styles.registTime}>2022-04-15</div>
                </div>
                <FaEllipsisH />
              </div>
              <div className={styles.commentContent}>
                {`기관과 작고 그것은 열락의 쓸쓸하랴? 것은 내려온 자신과 우리의 피가 우리 아니다. 능히 사랑의 온갖 착목한는 보이는 방황하였으며, 뛰노는 풍부하게 사막이다. 있는 천지는 그들에게 없으면, 피다. 우리 인간의 앞이 청춘의 새가 보는 귀는 끓는 이것이다. 그것을 평화스러운 따뜻한 눈이 이상이 청춘 설레는 풍부하게 그리하였는가? 인생에 끓는 없으면, 장식하는 주는 용감하고 것은 설산에서 눈이 것이다. 뜨거운지라, 구할 가장 위하여 무엇을 피고, 스며들어 사랑의 것이다. 생의 힘차게 속잎나고, 보라. 이상의 같으며, 튼튼하며, 힘있다.

충분히 우리 곧 그들의 품었기 약동하다. 무한한 품었기 갑 두손을 풍부하게 가치를 현저하게 얼음 꽃이 칼이다. 사는가 끓는 그들을 가치를 없으면, 약동하다. 그들의 황금시대의 무한한 황금시대다. 밥을 황금시대를 트고, 대중을 길을 귀는 군영과 것이다. 위하여 동산에는 천자만홍이 힘차게 하여도 그들에게 인생에 고동을 영원히 있는가? 대한 가진 황금시대의 찾아다녀도, 시들어 풀이 만천하의 우리 것이다. 인간은 새가 청춘을 장식하는 꽃이 인간의 아니더면, 우리의 트고, 위하여서. 커다란 얼마나 희망의 뜨거운지라, 방황하여도, 할지라도 힘있다. 반짝이는 풀밭에 이상의 하는 같으며, 뜨고, 설산에서 이상 듣는다.

보는 할지니, 있을 하였으며, 불러 이상의 별과 때문이다. 투명하되 끓는 같은 따뜻한 품었기 어디 생명을 같지 칼이다. 군영과 싶이 쓸쓸한 석가는 주며, 밝은 속에서 힘있다. 무한한 별과 이상이 이상은 것이다. 창공에 그것은 이상은 목숨을 그들을 아니다. 주며, 생생하며, 새가 영원히 봄바람이다. 웅대한 이 봄바람을 인생에 위하여서. 거선의 있는 물방아 쓸쓸하랴? 용감하고 속에서 얼마나 있는 열락의 봄날의 황금시대다. 밥을 피고 위하여, 살 사막이다.`}
              </div>
            </div>
          </div>
          <div>
            <div className={styles.commentBox} style={{ marginBottom: "30px" }}>
              <img className={styles.profileImage} src="#" />
              <div className={styles.comment}>
                <div className={styles.commentInfo}>
                  <div className={styles.commentWriterInfo}>
                    <div className={styles.nickname}>상하이버거</div>
                    <div className={styles.registTime}>2022-04-15</div>
                  </div>
                  <FaEllipsisH />
                </div>
                <div className={styles.commentContent}>
                  {`포스팅 잘 보고갑니다.`}
                </div>
              </div>
            </div>
            <div className={styles.underCommentBox}>
              <img className={styles.profileImage} src="#" />
              <div className={styles.comment}>
                <div className={styles.commentInfo}>
                  <div className={styles.commentWriterInfo}>
                    <div className={styles.nickname}>주인</div>
                    <div className={styles.registTime}>2022-04-15</div>
                  </div>
                  <FaEllipsisH />
                </div>
                <div className={styles.commentContent}>
                  <span>@ 상하이버거</span>
                  {`감사합니다.`}
                </div>
              </div>
            </div>
            <div className={styles.underCommentBox}>
              <img className={styles.profileImage} src="#" />
              <div className={styles.comment}>
                <div className={styles.commentInfo}>
                  <div className={styles.commentWriterInfo}>
                    <div className={styles.nickname}>상하이버거</div>
                    <div className={styles.registTime}>2022-04-15</div>
                  </div>
                  <FaEllipsisH />
                </div>
                <div className={styles.commentContent}>
                  <span>@ 주인</span>
                  {`넴`}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.commentBox}>
            <img className={styles.profileImage} src="#" />
            <div className={styles.comment}>
              <div className={styles.commentInfo}>
                <div className={styles.commentWriterInfo}>
                  <div className={styles.nickname}>빅맥</div>
                  <div className={styles.registTime}>2022-04-15</div>
                </div>
                <FaEllipsisH />
              </div>
              <div className={styles.commentContent}>
                {`포스팅 잘 봤습니다.`}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.morePostWrap}>
          <div className={styles.morePostTitle}>
            <span>프론트엔드</span> 카테고리의 다른 포스트
          </div>
          <div className={styles.postContainer}>
            {[1, 1, 1, 1].map((item, idx) => {
              return (
                <PostItem
                  key={idx}
                  commentNum={5}
                  registTime="2022-04-15"
                  title="NextJS Framework 구성과 기본 사용방법 포스팅"
                  imageURL="#"
                />
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = withSsrSession(async function ({
  req,
}: NextPageContext) {
  const user = req?.session.user;
  return {
    props: {
      user: user ? user : null,
    },
  };
});

export default Post;
