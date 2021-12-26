import axios from "axios";
import { accountActivationPath } from "../urls";

export const fetchAccountActivation = (activationToken, queryEmail) => {
  return axios.get(accountActivationPath(activationToken, queryEmail),)
    .then(res => {
      console.log('accountActivation#edit', res);
      return res.data;
    })
    .catch(error => {
      console.log('accountActivation#edit', error);
    });
}
