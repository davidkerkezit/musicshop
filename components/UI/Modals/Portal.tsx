import React, { ReactNode } from "react";

const Portal = ({
  children,

  setHidden,
}: {
  children: ReactNode;

  setHidden: any;
}) => {
  return (
    <div
      onClick={() => setHidden !== null && setHidden(false)}
      className={`fixed left-0 right-0 top-0 bottom-0 mx-auto my-auto bg-black/50 w-full h-full z-50 `}
    >
      {children}
    </div>
  );
};

export default Portal;
