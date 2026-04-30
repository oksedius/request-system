export const t = {
  uk: {
    // AppLayout
    appTitle: "Mini Request System",
    role: "Роль",
    themeDark: "🌙 Темна",
    themeLight: "☀️ Світла",
    themeDarkTitle: "Увімкнути темну тему",
    themeLightTitle: "Увімкнути світлу тему",

    // RoleSwitch
    roleUser: "User",
    roleManager: "Manager",

    // CreateRequestForm
    createTitle: "Створити заявку",
    fieldTitle: "Title",
    fieldDescription: "Description",
    placeholderTitle: "Напр. Потрібен доступ до сервісу",
    placeholderDesc: "Опиши деталі заявки…",
    btnCreate: "Створити",
    errorTitleRequired: "Title є обов'язковим.",
    errorTitleMin: "Title має бути мінімум 3 символи.",
    errorDescRequired: "Description є обов'язковим.",
    errorDescMin: "Description має бути мінімум 10 символів.",

    // MyRequestsList
    myRequests: "Мої заявки",
    sortLabel: "Сортування:",
    sortNewest: "спочатку нові",
    sortOldest: "спочатку старі",
    createdAt: "Створено",
    btnEdit: "Редагувати",
    btnDelete: "Видалити",
    btnSave: "Зберегти",
    btnCancel: "Скасувати",
    editOnlyNew: "Редагування доступне тільки для статусу new",
    emptyList: "Поки що немає заявок. Створи першу через форму зліва.",

    // ConfirmModal
    confirmDelete: (title) => `Видалити заявку «${title}»?`,
    btnConfirmDelete: "Видалити",
    btnCancelDelete: "Скасувати",

    // ManagerPanel
    managerPanel: "Панель менеджера",
    filterLabel: "Фільтр:",
    colId: "ID",
    colTitle: "Title",
    colDescription: "Description",
    colStatus: "Status",
    colCreated: "Created",
    colActions: "Actions",
    emptyManager: "Немає заявок для відображення.",
    statusDone: "Статус вже done",
    advanceTo: (next) => `Перевести в: ${next}`,
  },

  en: {
    // AppLayout
    appTitle: "Mini Request System",
    role: "Role",
    themeDark: "🌙 Dark",
    themeLight: "☀️ Light",
    themeDarkTitle: "Enable dark theme",
    themeLightTitle: "Enable light theme",

    // RoleSwitch
    roleUser: "User",
    roleManager: "Manager",

    // CreateRequestForm
    createTitle: "Create request",
    fieldTitle: "Title",
    fieldDescription: "Description",
    placeholderTitle: "E.g. Need access to service",
    placeholderDesc: "Describe request details…",
    btnCreate: "Create",
    errorTitleRequired: "Title is required.",
    errorTitleMin: "Title must be at least 3 characters.",
    errorDescRequired: "Description is required.",
    errorDescMin: "Description must be at least 10 characters.",

    // MyRequestsList
    myRequests: "My requests",
    sortLabel: "Sort:",
    sortNewest: "newest first",
    sortOldest: "oldest first",
    createdAt: "Created",
    btnEdit: "Edit",
    btnDelete: "Delete",
    btnSave: "Save",
    btnCancel: "Cancel",
    editOnlyNew: "Editing is only available for status new",
    emptyList:
      "No requests yet. Create the first one using the form on the left.",

    // ConfirmModal
    confirmDelete: (title) => `Delete request "${title}"?`,
    btnConfirmDelete: "Delete",
    btnCancelDelete: "Cancel",

    // ManagerPanel
    managerPanel: "Manager panel",
    filterLabel: "Filter:",
    colId: "ID",
    colTitle: "Title",
    colDescription: "Description",
    colStatus: "Status",
    colCreated: "Created",
    colActions: "Actions",
    emptyManager: "No requests to display.",
    statusDone: "Status is already done",
    advanceTo: (next) => `Move to: ${next}`,
  },
};
