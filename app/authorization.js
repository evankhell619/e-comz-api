export const Role = {
  SELLER: "seller",
  REGULAR_USER: "regular_user",
};

export const Permission = {
  BROWSE_PRODUCTS: "browse_products",
  READ_PRODUCT: "read_product",
  EDIT_PRODUCT: "edit_product",
  ADD_PRODUCT: "add_product",
  DELETE_PRODUCT: "delete_product",

  BROWSE_ORDERS: "browse_orders",
  READ_ORDER: "read_order",
  EDIT_ORDER: "edit_order",
  ADD_ORDER: "add_order",
  DELETE_ORDER: "delete_order",
};

export const PermissionAssignment = {
  [Role.SELLER]: [
    Permission.BROWSE_PRODUCTS,
    Permission.READ_PRODUCT,
    Permission.EDIT_PRODUCT,
    Permission.ADD_PRODUCT,
    Permission.DELETE_PRODUCT,

    Permission.BROWSE_ORDERS,
    Permission.READ_ORDER,
    Permission.EDIT_ORDER,
    Permission.ADD_ORDER,
    Permission.DELETE_ORDER,
  ],

  [Role.REGULAR_USER]: [
    Permission.BROWSE_PRODUCTS,
    Permission.READ_PRODUCT,

    Permission.BROWSE_ORDERS,
    Permission.READ_ORDER,
  ],
};
