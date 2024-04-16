import React from "react";
import styles from "../css/PageHeader.module.css";

function PagerHeader(props) {
  return (
    <div className={styles.row}>
      <div className={styles.pageHeader}></div>
      {props.title}
    </div>
  );
}

export default PagerHeader;
