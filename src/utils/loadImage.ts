import PQueue from 'p-queue';
import axios, { AxiosResponse } from 'axios';

const imageQueue = new PQueue({ concurrency: 10 }); // You can adjust the concurrency as per your needs

export async function fetchImage(url: string, name: string): Promise<any> {
  return imageQueue.add(async () => {
    const response: AxiosResponse = await axios.get(url, { responseType: 'blob' });
    return { src: response.data, name: name };
  });
}