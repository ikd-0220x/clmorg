import { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from "react-helmet";
import PaymentResultModal from '../components/PaymentResultModal';


const PaymentResult = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentIds = params.getAll('payment_id');
    const paymentStatus = params.get('payment_status');
    const lastPaymentId = paymentIds[paymentIds.length - 1];
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.id;

    if (userId && lastPaymentId && paymentStatus) {
      setPaymentInfo({
        user_id: userId,
        payment_id: lastPaymentId,
        payment_status: paymentStatus,
      });

      // Modalni ochamiz
      setModalOpen(true);
    }
  }, []);

  const handleConfirm = () => {
    axios.post('https://backendclm.uz/api/payment/callback', paymentInfo)
      .then(response => {
        console.log('Success:', response.data);
        alert("Tangalar muvaffaqiyatli qo‘shildi!");
        setModalOpen(false);
      })
      .catch(error => {
        console.error('Error:', error);
        alert("Xatolik yuz berdi.");
      });
  };

  return (
    <>
      <Helmet>
        <title>Payment Result - CLM</title>
        <meta name="description" content="To‘lov ma'lumotlari qayta ishlanmoqda..." />
      </Helmet>

      {/* <div className="text-center mt-10 text-green-600">
        <h2>To‘lov ma'lumotlari qayta ishlanmoqda...</h2>
      </div> */}

      <PaymentResultModal
        open={modalOpen}
        onClose={() => {}} 
        onConfirm={handleConfirm}
        confirmOnly 
      />
    </>
  );
};

export default PaymentResult;
