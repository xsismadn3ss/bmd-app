import { Card, CardLine } from "../settings-card";
import { LogoutOption } from "./logout-option";
import { UsernameOption } from "./username-option";

export function AccountCard() {
  return (
    <Card>
      {/* Nombre de usuario */}
      <UsernameOption />
      <CardLine />
      {/* Opción de cerrar sesión */}
      <LogoutOption />
    </Card>
  );
}
