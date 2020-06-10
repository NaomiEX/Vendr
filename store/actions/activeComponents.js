export const ACTIVE_SCREEN = "ACTIVE_SCREEN";
export const ACTIVE_DRAWER = "ACTIVE_DRAWER";

export const updateActiveScreen = (title) => {
  return { type: ACTIVE_SCREEN, title: title };
};

export const updateActiveDrawer = (isDrawerOpen) => {
  return { type: ACTIVE_DRAWER, isDrawerOpen: isDrawerOpen };
};
