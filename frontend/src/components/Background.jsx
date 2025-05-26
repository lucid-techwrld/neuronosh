const SoftBlurBackground = () => {
  return (
    <div className="relative w-full h-screen">
      {/* Yellow Center Glow */}
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-yellow-200 rounded-full blur-3xl opacity-70 transform -translate-x-1/2 -translate-y-1/2" />

      {/* Orange Layer */}
      <div className="absolute top-[55%] left-[52%] w-[500px] h-[500px] bg-orange-300 rounded-full blur-3xl opacity-50 transform -translate-x-1/2 -translate-y-1/2" />

      {/* Red-Pink Outer Glow */}
      <div className="absolute top-[60%] left-[55%] w-[650px] h-[650px] bg-rose-300 rounded-full blur-[160px] opacity-40 transform -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
};

export default SoftBlurBackground;
