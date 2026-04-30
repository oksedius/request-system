import React from "react";
import styles from "./ConfirmModal.module.scss";

// Confirm видалення

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onCancel}>
            Скасувати
          </button>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            Видалити
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
