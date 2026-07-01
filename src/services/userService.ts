import axios from 'axios';

const API = 'https://minitaskapi.onrender.com';

export async function getTasks(botId: string, telegramId: number) {
  const { data } = await axios.get(`${API}/api/task/available/${botId}/${telegramId}`);

  return data;
}

export async function getGlobalConfig() {
  const { data } = await axios.get(`${API}/api/globalconfig`);

  return data.data;
}

export const completeTask = async (telegramId: number, taskId: string) => {
  const { data } = await axios.post(`${API}/api/task/complete`, {
    telegramId,
    taskId,
  });

  return data;
};

export async function verifyAdClick(telegramId: number) {
  const { data } = await axios.get(`${API}/api/task/verify-ad-click/${telegramId}`);
  return data;
}
