import React from "react";
import { useSelector } from "react-redux";
import styles from "./App.module.scss";
import { useTheme } from "./hooks/useTheme.js";
import { useLocale } from "./hooks/useLocale.js";
import { t } from "./translate/translations.js";

import RoleSwitch from "../components/RoleSwitch/RoleSwitch.jsx";
import CreateRequestForm from "../components/User/CreateRequestForm/CreateRequestForm.jsx";
import MyRequestsList from "../components/User/MyRequestsList/MyRequestsList.jsx";
import ManagerPanel from "../components/Manager/ManagerPanel.jsx";

const AppLayout = () => {
  const role = useSelector((s) => s.requests.role);
  const { theme, toggle: toggleTheme } = useTheme();
  const { locale, toggle: toggleLocale } = useLocale();
  const tr = t[locale];

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.titleBlock}>
          <h1 className={styles.title}>{tr.appTitle}</h1>
          <p className={styles.subtitle}>
            {tr.role}: <b>{role}</b>
          </p>
        </div>

        <div className={styles.headerRight}>
          <button
            type="button"
            className={styles.themeBtn}
            onClick={toggleTheme}
            title={theme === "light" ? tr.themeDarkTitle : tr.themeLightTitle}
          >
            {theme === "light" ? tr.themeDark : tr.themeLight}
          </button>

          <button
            type="button"
            className={styles.themeBtn}
            onClick={toggleLocale}
          >
            {locale === "uk" ? "🇬🇧 EN" : "🇺🇦 UA"}
          </button>

          <RoleSwitch locale={locale} />
        </div>
      </header>

      <div key={role} className={styles.roleSwitchAnim}>
        {role === "User" ? (
          <div className={styles.flex}>
            <section className={styles.card}>
              <h2 className={styles.h2}>{tr.createTitle}</h2>
              <CreateRequestForm locale={locale} />
            </section>

            <section className={styles.card}>
              <h2 className={styles.h2}>{tr.myRequests}</h2>
              <MyRequestsList locale={locale} />
            </section>
          </div>
        ) : (
          <section className={styles.card}>
            <h2 className={styles.h2}>{tr.managerPanel}</h2>
            <ManagerPanel locale={locale} />
          </section>
        )}
      </div>
    </div>
  );
};

export default AppLayout;
