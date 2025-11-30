import { useState } from "react";

interface ModalHook {
  /** indica si el modal está visible */
  isVisible: boolean;
  /** función para abrir el modal */
  openModal: () => void;
  /** función para cerrar el modal */
  closeModal: () => void;
}

/** Hook para manejar la visibilidad de un modal */
export function useModal(): ModalHook {
  const [isVisible, setIsVisible] = useState(false);
  const openModal = () => setIsVisible(true);
  const closeModal = () => setIsVisible(false);

  return {
    isVisible,
    openModal,
    closeModal,
  };
}
