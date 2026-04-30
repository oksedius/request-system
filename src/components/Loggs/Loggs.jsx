import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearLogs } from "../../app/store/logsSlice.js";
import { formatDateTime } from "../../app/utils/date.js";
import { t } from "../../app/translate/translations.js";
import styles from "./Loggs.module.scss";

const Loggs = ({ locale }) => {
  const tr = t[locale];
  const logs = useSelector((state) => state.logs.logs);
  const dispatch = useDispatch();

  const handleClear = () => {
    dispatch(clearLogs());
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2>{tr.logsTitle}</h2>
        {logs.length > 0 && (
          <button onClick={handleClear} className={styles.clearBtn}>
            {tr.clearLogs}
          </button>
        )}
      </div>

      {logs.length === 0 ? (
        <div className={styles.empty}>{tr.noLogs}</div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{tr.colTime}</th>
                <th>{tr.colRole}</th>
                <th>{tr.colAction}</th>
                <th>{tr.colDetails}</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td>{formatDateTime(log.timestamp)}</td>
                  <td>
                    <span
                      className={
                        log.role === "Manager" ? styles.manager : styles.user
                      }
                    >
                      {log.role}
                    </span>
                  </td>
                  <td>{log.action}</td>
                  <td className={styles.details}>{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Loggs;
