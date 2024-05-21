const PaymentCancel = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-red-600">Payment Cancelled</h1>
        <p className="mt-4 text-gray-600">
          Your payment was not completed. If you have any questions, please
          contact support.
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="mt-6 px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-300"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentCancel;
