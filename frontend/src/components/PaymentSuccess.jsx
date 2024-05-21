const PaymentSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-secondary">
          Payment Successful!
        </h1>
        <p className="mt-4 text-gray-600">
          Thank you for your purchase. Your payment was successful.
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="mt-6 px-6 py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-90 transition duration-300"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
