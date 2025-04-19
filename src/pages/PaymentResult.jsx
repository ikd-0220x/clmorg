import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { $api } from "../utils/index";
import { Spinner, Typography, Card } from "@material-tailwind/react";

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    const sendPaymentResult = async () => {
      const paymentId = searchParams.get("payment_id");
      const paymentStatus = searchParams.get("payment_status");
      const userId = localStorage.getItem("user_id"); 

      if (!paymentId || !paymentStatus || !userId) {
        setStatus("error");
        return;
      }

      try {
        const res = await $api.post("/payment/callback", {
          user_id: userId,
          payment_id: paymentId,
          payment_status: paymentStatus,
        });

        if (res.data.success) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.error("To‘lovni tekshirishda xatolik:", error);
        setStatus("error");
      }
    };

    sendPaymentResult();
  }, [searchParams]);

  return (
    <Card className="w-full max-w-md mx-auto mt-10 p-6 text-center">
      {status === "pending" && (
        <>
          <Spinner className="mx-auto" />
          <Typography variant="h6" className="mt-4">
            To‘lov natijasi tekshirilmoqda...
          </Typography>
        </>
      )}
      {status === "success" && (
        <Typography variant="h5" color="green">
          ✅ To‘lov muvaffaqiyatli yakunlandi!
        </Typography>
      )}
      {status === "error" && (
        <Typography variant="h5" color="red">
          ❌ To‘lovda muammo yuz berdi!
        </Typography>
      )}
    </Card>
  );
};

export default PaymentResult;
