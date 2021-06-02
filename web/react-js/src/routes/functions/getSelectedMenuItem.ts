import { EMenuItems } from '../../layouts/TodosLayout';

function getSelectedMenuItem(pathname: string): EMenuItems {
  let activeMenuItem = EMenuItems.All;

  if (pathname.includes(EMenuItems.Active)) activeMenuItem = EMenuItems.Active;
  else if (pathname.includes(EMenuItems.Completed))
    activeMenuItem = EMenuItems.Completed;
  else activeMenuItem = EMenuItems.All;

  return activeMenuItem;
}

export { getSelectedMenuItem };
