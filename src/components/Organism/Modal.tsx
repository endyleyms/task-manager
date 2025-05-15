import type { ReactNode } from "react";
import ButtonUi from "../Atom/ButtonUi";
import Typography from "../Atom/Typography";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: Props) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm">
      <div className="flex flex-col justify-evenly bg-white rounded-lg w-full max-w-md shadow-lg">
        <div className="flex items-center justify-between p-4" style={{ padding: '20px' }}>
          <Typography
            text={title}
            color="blue"
            tag="h2"
          />
          <div className="w-[10%]">
            <ButtonUi
              title="×"
              onClick={onClose}
              type="outline"
            />
          </div>
        </div>
        <div className="p-4 w-full">
          {children}
        </div>
      </div>
    </div>

  )
}
