import React, { useMemo, useState } from "react";
import styles from "./ManagerPanel.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { requestStatusAdvance } from "../../app/store/requestsSlice.js";
import Badge from "../common/Badge/Badge.jsx";
import { formatDateTime } from "../../app/utils/date.js";
import { t } from "../../app/translate/translations.js";

const FILTERS = ["all", "new", "in progress", "done"];

const ManagerPanel = ({ locale }) => {
  const tr = t[locale];
  const requests = useSelector((s) => s.requests.requests);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("all");

  const rows = useMemo(() => {
    const list = [...requests];
    if (filter !== "all") return list.filter((r) => r.status === filter);
    list.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    return list;
  }, [requests, filter]);

  return (
    <div className={styles.wrap}>
      <div className={styles.controls}>
        <span className={styles.label}>{tr.filterLabel}</span>
        <div className={styles.pills}>
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className={`${styles.pill} ${filter === f ? styles.active : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {rows.length === 0 ? (
        <div className={styles.empty}>{tr.emptyManager}</div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{tr.colId}</th>
                <th>{tr.colTitle}</th>
                <th>{tr.colDescription}</th>
                <th>{tr.colStatus}</th>
                <th>{tr.colCreated}</th>
                <th>{tr.colActions}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const canAdvance =
                  r.status === "new" || r.status === "in progress";
                const next =
                  r.status === "new"
                    ? "in progress"
                    : r.status === "in progress"
                      ? "done"
                      : "done";

                return (
                  <tr key={r.id}>
                    <td className={styles.mono}>{r.id}</td>
                    <td>{r.title}</td>
                    <td className={styles.desc}>{r.description}</td>
                    <td>
                      <Badge status={r.status} />
                    </td>
                    <td>{formatDateTime(r.createdAt)}</td>
                    <td>
                      <button
                        type="button"
                        className={styles.btn}
                        disabled={!canAdvance}
                        onClick={() => dispatch(requestStatusAdvance(r.id))}
                        title={!canAdvance ? tr.statusDone : tr.advanceTo(next)}
                      >
                        → {next}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManagerPanel;
