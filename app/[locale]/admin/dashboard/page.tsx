import { getTranslations } from "next-intl/server";
import React from "react";

export default async function page() {
  const t = await getTranslations("Dashboard");

  return <div>{t("dashboard")}</div>;
}
