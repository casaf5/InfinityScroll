import { httpService } from './httpService';

async function loadPassengers(page, count) {
	return httpService.get(`passenger?page=${page}&size=${count}`);
}

export const airplaneService = {
	loadPassengers,
};
