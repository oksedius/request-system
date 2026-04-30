import React, { useMemo, useState } from "react";
import styles from "./MyRequestsList.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  canUserEdit,
  requestDelete,
  requestUpdate,
} from "../../../app/store/requestsSlice.js";
import { truncate } from "../../../app/utils/text.js";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal.jsx";
import { formatDateTime } from "../../../app/utils/date.js";
import Badge from "../../common/Badge/Badge.jsx";
import { t } from "../../../app/translate/translations.js";

const MyRequestsList = ({ locale }) => {
  const tr = t[locale];
  const requests = useSelector((s) => s.requests.requests);
  const dispatch = useDispatch();
  const [sortDir, setSortDir] = useState("desc");

  const sorted = useMemo(() => {
    const copy = [...requests];
    copy.sort((a, b) => {
      const ta = new Date(a.createdAt).getTime();
      const tb = new Date(b.createdAt).getTime();
      return sortDir === "desc" ? tb - ta : ta - tb;
    });
    return copy;
  }, [requests, sortDir]);

  const [editingId, setEditingId] = useState(null);
  const editing = sorted.find((r) => r.id === editingId) ?? null;
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [confirmId, setConfirmId] = useState(null);

  const startEdit = (r) => {
    setEditingId(r.id);
    setEditTitle(r.title);
    setEditDesc(r.description);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDesc("");
  };

  const saveEdit = () => {
    if (!editing) return;
    dispatch(
      requestUpdate({
        id: editing.id,
        patch: { title: editTitle.trim(), description: editDesc.trim() },
      }),
    );
    cancelEdit();
  };

  if (sorted.length === 0) {
    return <div className={styles.empty}>{tr.emptyList}</div>;
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.toolbar}>
        <span className={styles.toolbarLabel}>{tr.sortLabel}</span>
        <button
          type="button"
          className={styles.toolbarBtn}
          onClick={() => setSortDir((d) => (d === "desc" ? "asc" : "desc"))}
        >
          {sortDir === "desc" ? tr.sortNewest : tr.sortOldest}
        </button>
      </div>

      <ul className={styles.list}>
        {sorted.map((r) => {
          const isEditing = editingId === r.id;

          return (
            <li className={styles.item} key={r.id}>
              <div className={styles.topRow}>
                <div className={styles.main}>
                  <div className={styles.titleRow}>
                    <h3 className={styles.title}>{r.title}</h3>
                    <Badge status={r.status} />
                  </div>

                  <div className={styles.meta}>
                    <span className={styles.metaText}>
                      {tr.createdAt}: {formatDateTime(r.createdAt)}
                    </span>
                    <span className={styles.metaText}>ID: {r.id}</span>
                  </div>

                  {!isEditing ? (
                    <p className={styles.desc}>
                      {truncate(r.description, 120)}
                    </p>
                  ) : (
                    <div className={styles.editBlock}>
                      <input
                        className={styles.input}
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                      />
                      <textarea
                        className={styles.textarea}
                        rows={4}
                        value={editDesc}
                        onChange={(e) => setEditDesc(e.target.value)}
                      />
                    </div>
                  )}
                </div>

                <div className={styles.actions}>
                  {!isEditing ? (
                    <>
                      <button
                        type="button"
                        className={styles.btn}
                        disabled={!canUserEdit(r)}
                        title={!canUserEdit(r) ? tr.editOnlyNew : ""}
                        onClick={() => startEdit(r)}
                      >
                        {tr.btnEdit}
                      </button>
                      <button
                        type="button"
                        className={`${styles.btn} ${styles.danger}`}
                        onClick={() => setConfirmId(r.id)}
                      >
                        {tr.btnDelete}
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        className={styles.btn}
                        onClick={saveEdit}
                        disabled={
                          !editTitle.trim() || editDesc.trim().length < 10
                        }
                      >
                        {tr.btnSave}
                      </button>
                      <button
                        type="button"
                        className={styles.btn}
                        onClick={cancelEdit}
                      >
                        {tr.btnCancel}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {confirmId && (
        <ConfirmModal
          message={tr.confirmDelete(
            sorted.find((r) => r.id === confirmId)?.title ?? "",
          )}
          confirmLabel={tr.btnConfirmDelete}
          cancelLabel={tr.btnCancelDelete}
          onConfirm={() => {
            dispatch(requestDelete(confirmId));
            setConfirmId(null);
          }}
          onCancel={() => setConfirmId(null)}
        />
      )}
    </div>
  );
};

export default MyRequestsList;
