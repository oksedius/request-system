import React, { useMemo, useState } from "react";
import styles from "./ManagerPanel.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  requestStatusAdvance,
  nextStatus,
} from "../../app/store/requestsSlice.js";
import { addLog } from "../../app/store/logsSlice.js";
import Badge from "../common/Badge/Badge.jsx";
import { formatDateTime } from "../../app/utils/date.js";
import { t } from "../../app/translate/translations.js";
import Loggs from "../Loggs/Loggs.jsx";

const FILTERS = ["all", "new", "in progress", "done"];

const ManagerPanel = ({ locale }) => {
  const tr = t[locale];
  const requests = useSelector((s) => s.requests.requests);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("requests");

  const rows = useMemo(() => {
    const list = [...requests];
    if (filter !== "all") return list.filter((r) => r.status === filter);
    list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return list;
  }, [requests, filter]);

  const handleAdvanceStatus = (id) => {
    const request = requests.find((r) => r.id === id);
    const next = nextStatus(request?.status);
    dispatch(requestStatusAdvance(id));
    dispatch(
      addLog({
        role: "Manager",
        action: tr.logActionAdvance,
        details: `${request?.title || `ID: ${id}`} → ${next}`,
      }),
    );
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "requests" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("requests")}
        >
          {tr.managerPanel}
        </button>
        <button
          className={`${styles.tab} ${activeTab === "logs" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("logs")}
        >
          {tr.logsTab}
        </button>
      </div>

      {activeTab === "requests" ? (
        <>
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
                    const next = r.status === "new" ? "in progress" : "done";

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
                            onClick={() => handleAdvanceStatus(r.id)}
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
        </>
      ) : (
        <Loggs locale={locale} />
      )}
    </div>
  );
};

export default ManagerPanel;
