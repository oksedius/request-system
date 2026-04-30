import React from "react";
import { useSelector } from "react-redux";
import styles from "./App.module.scss";

import RoleSwitch from "../components/RoleSwitch/RoleSwitch.jsx";
import CreateRequestForm from "../components/User/CreateRequestForm/CreateRequestForm.jsx";
import MyRequestsList from "../components/User/MyRequestsList/MyRequestsList.jsx";
import ManagerPanel from "../components/Manager/ManagerPanel.jsx";
import { useTheme } from "./hooks/useTheme.js";

const AppLayout = () => {
  // Хук за домопогою якого можна отримати поточну тему та функцію для її перемикання
  const role = useSelector((s) => s.requests.role);
  const { theme, toggle } = useTheme();

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.titleBlock}>
          <h1 className={styles.title}>Mini Request System</h1>
          <p className={styles.subtitle}>
            Роль: <b>{role}</b>
          </p>
        </div>
        <div className={styles.headerRight}>
          <button
            type="button"
            className={styles.themeBtn}
            onClick={toggle}
            title={
              theme === "light"
                ? "Увімкнути темну тему"
                : "Увімкнути світлу тему"
            }
          >
            {theme === "light" ? "🌙 Темна" : "☀️ Світла"}
          </button>
          <RoleSwitch />
        </div>
      </header>

      <div key={role} className={styles.roleSwitchAnim}>
        {role === "User" ? (
          <div className={styles.flex}>
            <section className={styles.card}>
              <h2 className={styles.h2}>Створити заявку</h2>
              <CreateRequestForm />
            </section>

            <section className={styles.card}>
              <h2 className={styles.h2}>Мої заявки</h2>
              <MyRequestsList />
            </section>
          </div>
        ) : (
          <section className={styles.card}>
            <h2 className={styles.h2}>Панель менеджера</h2>
            <ManagerPanel />
          </section>
        )}
      </div>
    </div>
  );
};

export default AppLayout;
