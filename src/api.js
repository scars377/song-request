import axios from 'axios';

const client = axios.create({
  baseURL: '/api',
});

export default client;

export const getList = async () => client.get('/playlist');

export const setList = async (playlistId) =>
  client.put('/playlist', { id: playlistId });

export const getRequests = async () => client.get('/requests');

export const addRequest = async (vidId) =>
  client.post('/requests', { id: vidId });

export const removeRequest = async (vidId) =>
  client.delete(`/requests/${vidId}`);
