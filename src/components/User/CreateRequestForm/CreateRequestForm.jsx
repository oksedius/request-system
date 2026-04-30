import React, { useMemo, useState } from "react";
import styles from "./CreateRequestForm.module.scss";
import { useDispatch } from "react-redux";
import { requestCreate } from "../../../app/store/requestsSlice.js";
import { t } from "../../../app/translate/translations.js";

const CreateRequestForm = ({ locale }) => {
  const tr = t[locale];
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [touched, setTouched] = useState({ title: false, description: false });

  const errors = useMemo(() => {
    const errs = {};
    const ti = (title ?? "").trim();
    const di = (description ?? "").trim();
    if (!ti) errs.title = tr.errorTitleRequired;
    else if (ti.length < 3) errs.title = tr.errorTitleMin;
    if (!di) errs.description = tr.errorDescRequired;
    else if (di.length < 10) errs.description = tr.errorDescMin;
    return errs;
  }, [title, description, locale]);

  const isValid = Object.keys(errors).length === 0;

  const onSubmit = (e) => {
    e.preventDefault();
    setTouched({ title: true, description: true });
    if (!isValid) return;

    dispatch(
      requestCreate({
        id: crypto.randomUUID(),
        title: title.trim(),
        description: description.trim(),
        status: "new",
        createdAt: new Date().toISOString(),
      }),
    );

    setTitle("");
    setDescription("");
    setTouched({ title: false, description: false });
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label className={styles.label}>
        <span className={styles.labelText}>{tr.fieldTitle}</span>
        <input
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, title: true }))}
          placeholder={tr.placeholderTitle}
        />
        {touched.title && errors.title && (
          <span className={styles.error}>{errors.title}</span>
        )}
      </label>

      <label className={styles.label}>
        <span className={styles.labelText}>{tr.fieldDescription}</span>
        <textarea
          className={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, description: true }))}
          placeholder={tr.placeholderDesc}
          rows={5}
        />
        {touched.description && errors.description && (
          <span className={styles.error}>{errors.description}</span>
        )}
      </label>

      <button className={styles.submit} type="submit" disabled={!isValid}>
        {tr.btnCreate}
      </button>
    </form>
  );
};

export default CreateRequestForm;
