import React from "react";
import styles from "./RoleSwitch.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { roleSet } from "../../app/store/requestsSlice.js";

const RoleSwitch = () => {
  const role = useSelector((s) => s.requests.role);
  const dispatch = useDispatch();

  const isManager = role === "Manager";

  return (
    <div className={styles.wrap} role="group" aria-label="Role switch">
      <span
        className={styles.slider}
        aria-hidden="true"
        data-pos={isManager ? "right" : "left"}
      />

      <button
        type="button"
        className={`${styles.btn} ${!isManager ? styles.active : ""}`}
        onClick={() => dispatch(roleSet("User"))}
      >
        User
      </button>

      <button
        type="button"
        className={`${styles.btn} ${isManager ? styles.active : ""}`}
        onClick={() => dispatch(roleSet("Manager"))}
      >
        Manager
      </button>
    </div>
  );
};

export default RoleSwitch;
