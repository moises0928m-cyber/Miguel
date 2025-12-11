import { useState } from "react";

export function useModal() {
  const [open, setOpen] = useState(false);
  let abrir = () => {
    setOpen(true);
  };

  let cerrar = () => {
    setOpen(false);
  };

  return { open, abrir, cerrar };
}
