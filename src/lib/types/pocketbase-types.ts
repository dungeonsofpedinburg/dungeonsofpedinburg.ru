/**
 * Типы данных, соответствующие схеме PocketBase.
 * Согласовано с pb_schema.json.
 */

// ---------------------------------------------------------------------------
// Базовые типы PocketBase (присутствуют у любой записи)
// ---------------------------------------------------------------------------
export interface BaseRecord {
  id: string;
  created: string;
  updated: string;
  collectionId: string;
  collectionName: string;
}

// ---------------------------------------------------------------------------
// Коллекция "users" (system, auth)
// ---------------------------------------------------------------------------
export type Role = "player" | "master";

export interface UserRecord extends BaseRecord {
  collectionName: "users";

  // Стандартные auth-поля PocketBase
  username: string;
  email: string;
  emailVisibility: boolean;
  verified: boolean;

  // Кастомное поле — роль
  role: Role;
}

// ---------------------------------------------------------------------------
// Коллекция "coupons"
// ---------------------------------------------------------------------------
export interface CouponRecord extends BaseRecord {
  collectionName: "coupons";

  code: string;
  active: boolean;
  usedBy: string; // ID пользователя (relation 1-to-1)
}

// ---------------------------------------------------------------------------
// Утилита: маппинг имени коллекции → тип записи
// ---------------------------------------------------------------------------
export interface CollectionsMap {
  users: UserRecord;
  coupons: CouponRecord;
}
