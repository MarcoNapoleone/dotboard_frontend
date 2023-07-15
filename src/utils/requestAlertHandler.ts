import {AxiosError, AxiosResponse} from "axios";
import {AlertEvent} from "../Components/Providers/Alert/Alert.provider";

export const getResponseAlert = (response: AxiosResponse): AlertEvent => {
  if ([200, 201, 204].includes(response?.status)) {
    return {
      message: 'Successo!',
      severity: "success"
    }
  } else {
    return {
      message: "Mhh! Qualcosa è andato storto...",
      severity: "warning"
    }
  }
};

export const getReasonAlert = (reason: AxiosError): AlertEvent => {
  if (reason.response?.status === 401) {
    window.location.href = '/login';
    return {
      message: "Sessione scaduta",
      severity: "warning"
    }
  }
  if ([400, 403, 404, 409].includes(reason.response?.status)) {
    return {
      message: `${reason?.response?.data['message']}`,
      severity: "warning"
    }
  } else if ([500, 502, 503, 504].includes(reason.response?.status)) {
    return {
      message: `${reason?.response?.data['message']}`,
      severity: "error"
    }
  }
};


