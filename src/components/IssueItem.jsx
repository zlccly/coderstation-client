import React from "react";
import styles from "../css/IssueItem.module.css";
import { formatDate } from "../utils/tools";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getTypeList } from "../redux/typeSlice";
import { Tag } from "antd";
import { getUserById } from "../api/user";

function IssueItem(props) {
  const dispatch = useDispatch();
  const { typeList } = useSelector((state) => state.type);
  const [userInfo, setUserInfo] = useState({});
  const colorArr = [
    "#108ee9",
    "#2db7f5",
    "#f50",
    "green",
    "#87d068",
    "blue",
    "red",
    "purple",
  ];
  useEffect(() => {
    if (!typeList.length) {
      dispatch(getTypeList());
    }
    async function fecthData() {
      const result = await getUserById(props.issueInfo.userId);
      setUserInfo(result.data);
    }
    fecthData()
  }, []);
  const type = typeList.find((item) => item._id === props.issueInfo.typeId);

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
          <div className={styles.left}>
            <Tag color={colorArr[typeList.indexOf(type) % colorArr.length]}>
              {type?.typeName}
            </Tag>
          </div>
          <div className={styles.right}>
            <Tag color="volcano">{userInfo.nickname}</Tag>
            <span>{formatDate(props.issueInfo.issueDate, "year")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IssueItem;
