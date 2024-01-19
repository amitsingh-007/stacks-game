import { createContext, useContext } from "react";

const DeviceDetectContext = createContext<{
  deviceType: string | undefined | null;
}>({
  deviceType: undefined,
});

export const DeviceDetectProvider = ({
  deviceType,
  children,
}: {
  deviceType: string | undefined | null;
  children: React.ReactNode;
}) => {
  return (
    <DeviceDetectContext.Provider value={{ deviceType }}>
      {children}
    </DeviceDetectContext.Provider>
  );
};

export const useDeviceDetect = () => {
  const { deviceType } = useContext(DeviceDetectContext);

  return deviceType === "mobile";
};
