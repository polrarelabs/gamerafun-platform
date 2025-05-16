export const GetEmail = (dataAccount, dataGoogle) => {
  if (dataAccount && Object.keys(dataAccount).length > 0) {
    return dataAccount?.user?.email && dataAccount?.user?.email;
  } else if (dataGoogle && Object.keys(dataGoogle).length > 0) {
    return dataGoogle?.user?.userConnects[0]?.account;
  }
};
