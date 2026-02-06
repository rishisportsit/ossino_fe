type BaseContentItem = {
  is_active: boolean;
  after_login: boolean;
  before_login: boolean;
};

export const filterContentItem = <T extends BaseContentItem>(
  item: T,
  isAuth: boolean,
) => {
  if (!item.is_active) return false;

  // if after_login === true;
  // else before_login === true.
  if (isAuth && !item.after_login) return false;
  if (!isAuth && !item.before_login) return false;

  return true;
};
