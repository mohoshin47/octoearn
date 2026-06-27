import axios from 'axios';

const API = 'http://localhost:3000/api';

export async function getTasks(botId: string, telegramId: number) {
  const { data } = await axios.get(`${API}/task/available/${botId}/${telegramId}`);

  return data;
}

export async function getGlobalConfig() {
  const { data } = await axios.get(`${API}/globalconfig`);

  return data.data;
}

export const completeTask = async (telegramId: number, taskId: string) => {
  const { data } = await axios.post(`${API}/task/complete`, {
    telegramId,
    taskId,
  });

  return data;
};
