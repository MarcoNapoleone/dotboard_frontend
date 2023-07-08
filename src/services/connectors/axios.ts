import axios from "axios";

export const servicePath = axios.create(
    {
      baseURL: `http://ec2-16-171-145-236.eu-north-1.compute.amazonaws.com/api/`
    }
);




