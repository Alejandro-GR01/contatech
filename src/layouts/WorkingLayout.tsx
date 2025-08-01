const WorkingLayout = () => {
  return (
    <div className="  h-screen  w-screen mx-auto flex justify-center items-center bg-slate-500">
      <div className="flex flex-col md:flex-row items-center md:justify-center gap-8 p-2 mx-auto">
        <svg
          className="text-white w-20 h-20 md:w-32 md:h-32 "
          data-slot="icon"
          aria-hidden="true"
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
        <h2 className="text-2xl md:text-4xl font-bold text-white text-center md:text-left">Place under maintenance</h2>
      </div>
    </div>
  );
};

export default WorkingLayout;
