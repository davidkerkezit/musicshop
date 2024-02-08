import clsx from 'clsx';

const dots = 'mx-[1px] inline-block h-1 w-1 animate-blink rounded-md text-white bg-white ';

const LoadingDots = () => {
  return (
    <span className="mx-2 inline-flex items-center  ">
      <span className={clsx(dots)} />
      <span className={clsx(dots, 'animation-delay-[200ms]')} />
      <span className={clsx(dots, 'animation-delay-[400ms] ')} />
    </span>
  );
};

export default LoadingDots;