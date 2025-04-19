import React from 'react';
import { Button } from '@material-tailwind/react'; // Bu qator yetishmayapti!

const PaymentResultModal = ({ open, onClose, onConfirm, confirmOnly }) => {
  return (
    <div className="flex justify-end gap-2 mt-4">
      {!confirmOnly && (
        <Button color="red" onClick={onClose}>
          Bekor qilish
        </Button>
      )}
      <Button color="green" onClick={onConfirm}>
        Tanga olish
      </Button>
    </div>
  );
};

export default PaymentResultModal;
