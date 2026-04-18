import React, { useMemo, useState } from "react";
import styles from "./CreateRequestForm.module.scss";
import { useDispatch } from "react-redux";
import { requestCreate } from "../../../app/store/requestsSlice.js";
import { validateRequest } from "../../../app/validation/requestValidation.js";

const CreateRequestForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [touched, setTouched] = useState({ title: false, description: false });

  const errors = useMemo(
    () => validateRequest({ title, description }),
    [title, description],
  );
  const isValid = Object.keys(errors).length === 0;

  const onSubmit = (e) => {
    e.preventDefault();
    setTouched({ title: true, description: true });
    if (!isValid) return;

    const now = new Date().toISOString();
    dispatch(
      requestCreate({
        id: crypto.randomUUID(),
        title: title.trim(),
        description: description.trim(),
        status: "new",
        createdAt: now,
      }),
    );

    setTitle("");
    setDescription("");
    setTouched({ title: false, description: false });
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label className={styles.label}>
        <span className={styles.labelText}>Title</span>
        <input
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, title: true }))}
          placeholder="Напр. Потрібен доступ до сервісу"
        />
        {touched.title && errors.title ? (
          <span className={styles.error}>{errors.title}</span>
        ) : null}
      </label>

      <label className={styles.label}>
        <span className={styles.labelText}>Description</span>
        <textarea
          className={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, description: true }))}
          placeholder="Опиши деталі заявки…"
          rows={5}
        />
        {touched.description && errors.description ? (
          <span className={styles.error}>{errors.description}</span>
        ) : null}
      </label>

      <button className={styles.submit} type="submit" disabled={!isValid}>
        Створити
      </button>
    </form>
  );
};

export default CreateRequestForm;
