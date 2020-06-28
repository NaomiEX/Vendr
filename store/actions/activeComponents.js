export const ACTIVE_SCREEN = "ACTIVE_SCREEN";
export const ACTIVE_DRAWER = "ACTIVE_DRAWER";
export const TOP_SCREEN = "TOP_SCREEN";

export const updateActiveScreen = (title, top) => {
  return { type: ACTIVE_SCREEN, title: title, top: top ? true : false };
};

export const updateActiveDrawer = (isDrawerOpen) => {
  return { type: ACTIVE_DRAWER, isDrawerOpen: isDrawerOpen };
};
