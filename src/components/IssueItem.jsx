import React from "react";
import styles from "../css/IssueItem.module.css";
import { formatDate } from "../utils/tools";
import { useSelector, useDispatch } from "react-redux";

function IssueItem(props) {
  const { typeList } = useSelector((state) => state.type);
  console.log(typeList, "初始化");

  return (
    <div className={styles.container}>
      {/* 回答 */}
      <div className={styles.issueNum}>
        <div>{props.issueInfo.commentNumber}</div>
        <div>问答</div>
      </div>
      {/* 浏览 */}
      <div className={styles.issueNum}>
        <div>{props.issueInfo.scanNumber}</div>
        <div>浏览</div>
      </div>
      {/* 问题内容 */}
      <div className={styles.issueContainer}>
        <div className={styles.top}>{props.issueInfo.issueTitle}</div>
        <div className={styles.bottom}>
          <div className={styles.left}></div>
          <div className={styles.right}>
            <span>{formatDate(props.issueInfo.issueDate, "year")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IssueItem;
