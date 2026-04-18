import React from "react";
import styles from "./Badge.module.scss";

const map = {
  new: styles.new,
  "in progress": styles.inProgress,
  done: styles.done,
};

const Badge = ({ status }) => {
  return (
    <span className={`${styles.badge} ${map[status] ?? ""}`}>{status}</span>
  );
};

export default Badge;
