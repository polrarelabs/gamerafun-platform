import { PropsAuths } from "@store/auth";
import { shortAddress } from "@utils";

export const GetEmail = (data: PropsAuths) => {
  if (data && Object.keys(data).length > 0) {
    const email = data?.user?.email
      ? data?.user?.email
      : data?.user?.userConnects && data?.user?.userConnects[0]?.account;
    if (email && email.length > 24) {
      return shortAddress(email, 8);
    }
    return email;
  }
};
