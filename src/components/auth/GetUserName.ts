export const GetUserName = (dataAccount, dataGoogle, dataX) => {
  if (dataAccount && Object.keys(dataAccount).length > 0) {
    return dataAccount?.user?.displayName
      ? dataAccount?.user?.displayName
      : `User ${dataAccount?.user?.id}`;
  } else if (dataGoogle && Object.keys(dataGoogle).length > 0) {
    return dataGoogle?.user?.displayName
      ? dataGoogle?.user?.displayName
      : `User ${dataGoogle?.user?.id}`;
  } else if (dataX && Object.keys(dataX).length > 0) {
    return dataX?.user?.displayName
      ? dataX?.user?.displayName
      : `User ${dataX?.user?.id}`;
  }
};
